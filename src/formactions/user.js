import { SubmissionError } from 'redux-form';
import { user as UserApi } from '@vidispine/vdt-api';
import withSubmissionError from './withSubmissionError';

export const onCreate = withSubmissionError((form) => {
  const { userDocument, queryParams } = form;
  return UserApi.createUser({
    userDocument,
    queryParams,
  })
    .then(() => ({ data: userDocument }));
});

export const onDisable = withSubmissionError((form, dispatch, props) => {
  const { queryParams } = form;
  const userName = props.userName || form.userName;
  return UserApi.disableUser({
    userName,
    queryParams,
  });
});

export const onUpdate = withSubmissionError((form, dispatch, props) => {
  const userName = props.userName || form.userName;
  const { userDocument, queryParams } = form;
  return UserApi.updateUser({
    userName,
    userDocument,
    queryParams,
  });
});

export const onUpdatePassword = withSubmissionError((form, dispatch, props) => {
  const userName = props.userName || form.userName;
  const { password, queryParams } = form;
  return UserApi.updateUserPassword({
    userName,
    password,
    queryParams,
  });
});

export function onGetToken(form, dispatch, props) {
  const { headers = {}, queryParams } = form;
  const runAs = props.runAs || form.runAs || headers.runAs;
  return UserApi.getToken({
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
  return UserApi.whoAmI({ headers: { Authorization: `token ${token}` } })
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
  return UserApi.getUserToken({
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

export const onUpdateGroups = withSubmissionError((form, dispatch, props) => {
  const { groupListDocument, queryParams } = form;
  const userName = props.userName || form.userName;
  return UserApi.updateUserGroup({
    userName,
    groupListDocument,
    queryParams,
  });
});

export const onUpdateRealName = withSubmissionError((form, dispatch, props) => {
  const { realName } = form;
  const userName = props.userName || form.userName;
  return UserApi.updateUserRealName({
    userName,
    realName,
  });
});

export const createAlias = withSubmissionError((form, dispatch, props) => {
  const { alias } = form;
  const userName = props.userName || form.userName;
  return UserApi.createAlias({
    userName,
    alias,
  });
});

export const onCreateKey = withSubmissionError((form, dispatch, props) => {
  const { queryParams } = form;
  const userName = props.userName || form.userName;
  return UserApi.createKey({
    userName,
    queryParams,
  });
});

export const onUpdateKey = withSubmissionError((form, dispatch, props) => {
  const { accessKeyDocument } = form;
  const userName = props.userName || form.userName;
  const keyId = props.keyId || form.keyId;
  return UserApi.updateKey({
    userName,
    keyId,
    accessKeyDocument,
  });
});

export const onSearchUser = withSubmissionError((form) => {
  const { queryParams = {}, userSearchDocument = {} } = form;
  return UserApi.searchUser({
    queryParams,
    userSearchDocument,
  });
});
