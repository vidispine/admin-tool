import { access as AccessApi } from '@vidispine/vdt-api';

import withSubmissionError from './withSubmissionError';

export const onUpdateImportAccessGroup = withSubmissionError((form, dispatch, props) => {
  const { groupName, queryParams } = form;
  const { userName } = props;
  const headers = { RunAs: userName };
  return AccessApi.updateImportAccessGroup({
    groupName,
    queryParams,
    headers,
  });
});

export const onCreate = withSubmissionError((form, dispatch, props) => {
  const { accessControlDocument, queryParams } = form;
  const entityType = props.entityType || form.entityType;
  const entityId = props.entityId || form.entityId;
  return AccessApi.createEntityAccess({
    entityType,
    entityId,
    queryParams,
    accessControlDocument,
  });
});

export const onEntityAccessMerged = withSubmissionError((form, dispatch, props) => {
  const { queryParams = {} } = form;
  const entityType = props.entityType || form.entityType;
  const entityId = props.entityId || form.entityId;
  return AccessApi.getEntityAccessMerged({
    entityType,
    entityId,
    queryParams,
  });
});

export const onListEntityAccess = withSubmissionError((form, dispatch, props) => {
  const { queryParams = {} } = form;
  const entityType = props.entityType || form.entityType;
  const entityId = props.entityId || form.entityId;
  return AccessApi.listEntityAccess({
    entityType,
    entityId,
    queryParams,
  });
});

export const onGetEntityAccessGraphDot = withSubmissionError((form, dispatch, props) => {
  const { queryParams = {} } = form;
  const entityType = props.entityType || form.entityType;
  const entityId = props.entityId || form.entityId;
  return AccessApi.getEntityAccessGraphDot({
    entityType,
    entityId,
    queryParams,
  });
});
