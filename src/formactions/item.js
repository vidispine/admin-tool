import { SubmissionError } from 'redux-form';

import { item as ItemApi, metadata as MetadataApi, debug as DebugApi } from '@vidispine/vdt-api';
import withSubmissionError from './withSubmissionError';

export function onCreateExport(form, dispatch, props) {
  const { queryParams } = form;
  const itemId = props.itemId || form.itemId;
  return ItemApi.createExport({
    itemId,
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

export function onCreateExportImp(form, dispatch, props) {
  const { queryParams } = form;
  const itemId = props.itemId || form.itemId;
  return ItemApi.createExportImp({
    itemId,
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

export function onRemoveItem(form, dispatch, props) {
  const { queryParams } = form;
  const itemId = props.itemId || form.itemId;
  return ItemApi.removeItem({
    itemId,
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

export function onUpdateMetadata(form, dispatch, props) {
  const { metadataDocument = {}, queryParams } = form;
  const itemId = props.itemId || form.itemId;
  return ItemApi.updateItemMetadata({
    itemId,
    metadataDocument,
    queryParams,
  })
    .then((response) => ({ itemId, ...response }))
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
  const itemId = props.itemId || form.itemId;
  const headers = props.headers || form.headers;
  return ItemApi.getItemMetadata({
    itemId,
    queryParams,
    headers,
  })
    .then((response) => ({ itemId, ...response }))
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
  const itemId = props.itemId || form.itemId;
  return MetadataApi.listEntityMetadataChange({
    entity: 'item',
    entityId: itemId,
    queryParams,
  })
    .then((response) => ({ itemId, ...response }))
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
  const itemId = props.itemId || form.itemId;
  return ItemApi.getItem({
    itemId,
    queryParams,
  })
    .then((response) => ({ itemId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onSearch(form) {
  const {
    queryParams = {},
    itemSearchDocument = {},
  } = form;
  return ItemApi.searchItem({
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

export function onGetUri(form, dispatch, props) {
  const { queryParams = {} } = form;
  const itemId = props.itemId || form.itemId;
  return ItemApi.getItemUri({
    itemId,
    queryParams,
  })
    .then((response) => ({ itemId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onGetThumbnailSpritesheet(form, dispatch, props) {
  const { queryParams = {}, headers: formHeaders = {} } = form;
  const headers = { accept: 'application/json', ...formHeaders };
  const { accept } = headers;
  const isJson = accept.toLowerCase() === 'application/json';
  if (isJson) headers.accept = 'application/xml';
  const itemId = props.itemId || form.itemId;
  const path = `/API/item/${itemId}/thumbnail/spritesheet`;
  return ItemApi.getItem({
    itemId,
    path,
    params: queryParams,
    headers,
  })
    .then((response) => {
      if (isJson) return DebugApi.echo({ xmlDocument: response.data });
      return Promise.resolve(response);
    })
    .then((response) => ({ itemId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreateTranscode(form, dispatch, props) {
  const { queryParams = {} } = form;
  const itemId = props.itemId || form.itemId;
  return ItemApi.createTranscode({
    itemId,
    queryParams,
  })
    .then((response) => ({ itemId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreateThumbnail(form, dispatch, props) {
  const { queryParams = {} } = form;
  const itemId = props.itemId || form.itemId;
  return ItemApi.createThumbnail({
    itemId,
    queryParams,
  })
    .then((response) => ({ itemId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onListItemRelation(form, dispatch, props) {
  const itemId = props.itemId || form.itemId;
  const { queryParams: formQueryParams = {} } = form;
  const { relationMetadata = [], ...queryParams } = formQueryParams;
  relationMetadata.forEach((metadata) => { queryParams[metadata.key] = metadata.value; });
  return ItemApi.listItemRelation({
    itemId,
    queryParams,
  })
    .then((response) => ({ itemId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreateItemRelation(form, dispatch, props) {
  const itemId = props.itemId || form.itemId;
  const relationItemId = props.relationItemId || form.relationItemId;
  const { queryParams: formQueryParams = {} } = form;
  const { relationMetadata = [], ...queryParams } = formQueryParams;
  relationMetadata.forEach((metadata) => { queryParams[metadata.key] = metadata.value; });
  return ItemApi.createItemRelation({
    itemId,
    relationItemId,
    queryParams,
  })
    .then((response) => ({ itemId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateItemRelation(form, dispatch, props) {
  const relationId = props.relationId || form.relationId;
  const { queryParams: formQueryParams = {} } = form;
  const { relationMetadata = [], ...queryParams } = formQueryParams;
  relationMetadata.forEach((metadata) => { queryParams[metadata.key] = metadata.value; });
  return ItemApi.updateRelation({
    relationId,
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

export function onCreateItemAnalyze(form, dispatch, props) {
  const { analyzeJobDocument = {}, queryParams } = form;
  const itemId = props.itemId || form.itemId;
  return ItemApi.createItemAnalyze({
    itemId,
    queryParams,
    analyzeJobDocument,
  })
    .then((response) => ({ itemId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export const onSearchItemMetadataGroup = withSubmissionError((form) => {
  const { metadataGroupSearchDocument, queryParams } = form;
  return ItemApi.searchItemMetadataGroup({
    queryParams,
    metadataGroupSearchDocument,
  }).then((response) => ({
    queryParams,
    metadataGroupSearchDocument,
    ...response,
  }));
});
