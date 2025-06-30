import { storage as StorageApi } from '@vidispine/vdt-api';

import withSubmissionError from './withSubmissionError';

export const onCreate = withSubmissionError((form) => {
  const { storageDocument } = form;
  return StorageApi.createStorage({
    storageDocument,
  });
});

export const onUpdate = withSubmissionError((form, dispatch, props) => {
  const { storageDocument } = form;
  const storageId = props.storageId || storageDocument.storageId;
  return StorageApi.modifyStorage({
    storageId,
    storageDocument,
  });
});

export const onRemove = withSubmissionError((form, dispatch, props) => {
  const { queryParams } = form;
  const storageId = props.storageId || form.storageId;
  return StorageApi.removeStorage({
    storageId,
    queryParams,
  });
});

export const onMethodUpdate = withSubmissionError((form, dispatch, props) => {
  const { method } = form;
  const { storageId } = props;
  const storageMethodId = props.storageMethodId || method.storageMethodId;
  const queryParams = {
    url: encodeURIComponent(method.uri),
    read: method.read,
    write: method.write,
    browse: method.browse,
    bandwidth: method.bandwidth,
    type: method.type,
  };
  return StorageApi.modifyStorageMethod({
    storageId,
    storageMethodId,
    queryParams,
  });
});

export const onMethodCreate = withSubmissionError((form, dispatch, props) => {
  const { method } = form;
  const { storageId } = props;
  const queryParams = {
    url: encodeURIComponent(method.uri),
    read: method.read,
    write: method.write,
    browse: method.browse,
    bandwidth: method.bandwidth,
    type: method.type,
  };
  return StorageApi.createStorageMethod({
    storageId,
    queryParams,
  });
});

export const onUpdateStorageType = withSubmissionError((form, dispatch, props) => {
  const { type: storageType } = form;
  const storageId = props.storageId || form.storageId;
  return StorageApi.updateStorageType({
    storageId,
    storageType,
  });
});

export const onList = withSubmissionError((form) => {
  const { queryParams } = form;
  return StorageApi.listStorage({ queryParams });
});
