import { SubmissionError } from 'redux-form';

import { user as api } from '@vidispine/vdt-api';

export function onCreate(form) {
  const { userDocument, queryParams } = form;
  return api.createUser({
    userDocument,
    queryParams,
  })
    .then(() => ({ data: userDocument }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdatePassword(form, dispatch, props) {
  const userName = props.userName || form.userName;
  const { password, queryParams } = form;
  return api.updateUserPassword({
    userName,
    password,
    queryParams,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onGetToken(form, dispatch, props) {
  const { headers = {}, queryParams } = form;
  const runAs = props.runAs || form.runAs || headers.runAs;
  return api.getToken({
    queryParams,
    headers: { runAs, ...headers },
  })
    .then((response) => ({ ...response, runAs }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        const { data, statusText } = error.response;
        if (data) {
          errorMessage = JSON.stringify(data, (k, v) => (v === null ? undefined : v));
        } else {
          errorMessage = statusText;
        }
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

function onWhoAmI(form, dispatch, props) {
  const { headers = {} } = form;
  const { status } = props;
  const { runAs, token } = headers;
  return api.whoAmI({ headers: { Authorization: `token ${token}` } })
    .then(({ data }) => ({ userName: data, runAs, data: token }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        const { data, statusText } = error.response;
        if (data) {
          errorMessage = JSON.stringify(data, (k, v) => (v === null ? undefined : v));
        } else {
          errorMessage = statusText;
        }
      }
      if (status === 'ok' && errorMessage === 'Network Error') throw new SubmissionError({ _error: 'Incorrect Token' });
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onGetUserToken(form, dispatch, props) {
  const {
    headers = {}, queryParams, baseUrl, accessKey, secretKey,
  } = form;
  const { status } = props;
  const { runAs, token, ...headerProps } = headers;
  if (accessKey && secretKey) {
    headerProps.username = accessKey;
    headerProps.password = secretKey;
  }
  if (token) {
    return onWhoAmI(form, dispatch, props);
  }
  const userName = props.userName || form.userName || headers.username;
  return api.getUserToken({
    username: userName,
    queryParams,
    headers: headerProps,
  })
    .then((response) => ({
      ...response, userName, runAs, baseUrl,
    }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        const { data, statusText } = error.response;
        if (data) {
          errorMessage = JSON.stringify(data, (k, v) => (v === null ? undefined : v));
        } else {
          errorMessage = errorMessage || statusText;
        }
      }
      if (status === 'ok' && errorMessage === 'Network Error') throw new SubmissionError({ _error: 'Incorrect Credentials' });
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateGroups(form, dispatch, props) {
  const { groupListDocument, queryParams } = form;
  const userName = props.userName || form.userName;
  return api.updateUserGroup({
    userName,
    groupListDocument,
    queryParams,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateRealName(form, dispatch, props) {
  const { realName } = form;
  const userName = props.userName || form.userName;
  return api.updateUserRealName({
    userName,
    realName,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreateKey(form, dispatch, props) {
  const { queryParams } = form;
  const userName = props.userName || form.userName;
  return api.createKey({
    userName,
    queryParams,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateKey(form, dispatch, props) {
  const { accessKeyDocument } = form;
  const userName = props.userName || form.userName;
  const keyId = props.keyId || form.keyId;
  return api.updateKey({
    userName,
    keyId,
    accessKeyDocument,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
