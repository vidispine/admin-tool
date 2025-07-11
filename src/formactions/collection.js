import { SubmissionError } from 'redux-form';

import { collection as api, metadata as MetadataApi } from '@vidispine/vdt-api';

export function onUpdateMetadata(form, dispatch, props) {
  const { metadataDocument = {}, queryParams } = form;
  const collectionId = props.collectionId || form.collectionId;
  return api
    .updateCollectionMetadata({
      collectionId,
      metadataDocument,
      queryParams,
    })
    .then((response) => ({ collectionId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onGetMetadata(form, dispatch, props) {
  const { queryParams = {} } = form;
  const collectionId = props.collectionId || form.collectionId;
  return api
    .getCollectionMetadata({
      collectionId,
      queryParams,
    })
    .then((response) => ({ collectionId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onListEntityMetadataChange(form, dispatch, props) {
  const { queryParams = {} } = form;
  const collectionId = props.collectionId || form.collectionId;
  return MetadataApi.listEntityMetadataChange({
    entity: 'collection',
    entityId: collectionId,
    queryParams,
  })
    .then((response) => ({ collectionId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onGet(form, dispatch, props) {
  const { queryParams = {} } = form;
  const collectionId = props.collectionId || form.collectionId;
  return api
    .getCollection({
      collectionId,
      queryParams,
    })
    .then((response) => ({ collectionId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onSearch(form) {
  const { queryParams = {}, itemSearchDocument = {} } = form;
  return api
    .searchCollection({
      itemSearchDocument,
      queryParams,
    })
    .then((response) => ({
      queryParams,
      itemSearchDocument,
      ...response,
    }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreate(form) {
  const { queryParams = {}, collectionDocument = {} } = form;
  return api
    .createCollection({
      collectionDocument,
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

export function onRename(form, dispatch, props) {
  const { queryParams } = form;
  const collectionId = props.collectionId || form.collectionId;
  return api
    .renameCollection({
      collectionId,
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

export function onAddEntity(form, dispatch, props) {
  const { queryParams } = form;
  const collectionId = props.collectionId || form.collectionId;
  const entityId = props.entityId || form.entityId;
  return api
    .addCollectionEntity({
      collectionId,
      entityId,
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

export function onRemoveEntity(form, dispatch, props) {
  const { queryParams } = form;
  const collectionId = props.collectionId || form.collectionId;
  const entityId = props.entityId || form.entityId;
  return api
    .removeCollectionEntity({
      collectionId,
      entityId,
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

export function onCreateExport(form, dispatch, props) {
  const { queryParams } = form;
  const collectionId = props.collectionId || form.collectionId;
  return api
    .getCollection({
      collectionId,
      queryParams,
      path: `/API/collection/${collectionId}/export`,
      method: 'POST',
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateFolderCollection(form, dispatch, props) {
  const { queryParams } = form;
  const collectionId = props.collectionId || form.collectionId;
  return api
    .updateFolderCollection({
      collectionId,
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

export function onGetCollectionSequence(form, dispatch, props) {
  const { queryParams = {} } = form;
  const collectionId = props.collectionId || form.collectionId;
  return api
    .collectionSequence({
      collectionId,
      queryParams: { mode: 'COLLECTION_ORDER', ...queryParams },
    })
    .then((response) => ({ collectionId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
