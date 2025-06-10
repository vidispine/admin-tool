import { SubmissionError } from 'redux-form';

import { notification as api } from '@vidispine/vdt-api';

const parseErrorResponse = (error) => {
  const data = error?.response?.data || '';
  return JSON.stringify(data, (k, v) => (v === null ? undefined : v));
};

export function onUpdatePlaceholder(form, dispatch, props) {
  try {
    const notificationId = props.notificationId || form.notificationId;
    const { notificationDocument } = form;
    const path = `/API/notification/${notificationId}`;
    return api
      .updateNotification({
        notificationId,
        entityType: 'placeholder',
        notificationDocument,
        path,
      })
      .catch((error) => {
        let errorMessage = error.message;
        if (error.response) errorMessage = parseErrorResponse(error);
        throw new SubmissionError({ _error: errorMessage });
      });
  } catch (error) {
    throw new SubmissionError({ _error: error.message });
  }
}

export function onUpdate(form, dispatch, props) {
  try {
    const notificationId = props.notificationId || form.notificationId;
    const entityType = props.entityType || form.entityType;
    const entityId = props.entityId || form.entityId;
    const { notificationDocument } = form;
    if (entityId !== undefined) {
      return api
        .updateNotificationEntity({
          notificationId,
          entityType,
          entityId,
          notificationDocument,
        })
        .catch((error) => {
          let errorMessage = error.message;
          if (error.response) errorMessage = parseErrorResponse(error);
          throw new SubmissionError({ _error: errorMessage });
        });
    }
    return api
      .updateNotification({
        notificationId,
        entityType,
        notificationDocument,
      })
      .catch((error) => {
        let errorMessage = error.message;
        if (error.response) errorMessage = parseErrorResponse(error);
        throw new SubmissionError({ _error: errorMessage });
      });
  } catch (error) {
    throw new SubmissionError({ _error: error.message });
  }
}

export function onCreatePlaceholder(form) {
  try {
    const { notificationDocument } = form;
    const path = '/API/notification';
    return api
      .createNotification({
        entityType: 'placeholder',
        notificationDocument,
        path,
      })
      .then((response) => ({ ...response }))
      .catch((error) => {
        let errorMessage = error.message;
        if (error.response) errorMessage = parseErrorResponse(error);
        throw new SubmissionError({ _error: errorMessage });
      });
  } catch (error) {
    throw new SubmissionError({ _error: error.message });
  }
}

export function onCreate(form, dispatch, props) {
  try {
    const { notificationDocument } = form;
    const entityType = props.entityType || Object.keys(notificationDocument.trigger)[0];
    const entityId = props.entityId || form.entityId;
    if (entityId !== undefined) {
      return api
        .createNotificationEntity({
          entityId,
          entityType,
          notificationDocument,
        })
        .then((response) => ({ ...response, entityType, entityId }))
        .catch((error) => {
          let errorMessage = error.message;
          if (error.response) errorMessage = parseErrorResponse(error);
          throw new SubmissionError({ _error: errorMessage });
        });
    }
    return api
      .createNotification({
        entityType,
        notificationDocument,
      })
      .then((response) => ({ ...response, entityType }))
      .catch((error) => {
        let errorMessage = error.message;
        if (error.response) errorMessage = parseErrorResponse(error);
        throw new SubmissionError({ _error: errorMessage });
      });
  } catch (error) {
    throw new SubmissionError({ _error: error.message });
  }
}
