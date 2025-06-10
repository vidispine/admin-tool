import { SubmissionError } from 'redux-form';

import { shape as api } from '@vidispine/vdt-api';

export function onCreateShapeEssenceImport(form, dispatch, props) {
  const { queryParams } = form;
  const itemId = props.itemId || form.itemId;
  return api
    .createShapeEssenceImport({
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

export function onCreateShape(form, dispatch, props) {
  const { queryParams, shapeDocument = {} } = form;
  const itemId = props.itemId || form.itemId;
  return api
    .createShape({
      itemId,
      queryParams,
      shapeDocument,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
export function onCreateShapeImport(form, dispatch, props) {
  const { queryParams } = form;
  const itemId = props.itemId || form.itemId;
  return api
    .createShapeImport({
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

export function onCreateShapePlaceholder(form, dispatch, props) {
  const { queryParams, simpleMetadataDocument = {} } = form;
  const itemId = props.itemId || form.itemId;
  return api
    .createShapePlaceholder({
      itemId,
      metadataDocument: simpleMetadataDocument,
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
export function onCreateShapeImportImp(form, dispatch, props) {
  const { queryParams } = form;
  const itemId = props.itemId || form.itemId;
  return api
    .createShapeImportImp({
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

export function onList(form, dispatch, props) {
  const { queryParams = {} } = form;
  const itemId = props.itemId || form.itemId;
  return api
    .listShape({
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

export function onGet(form, dispatch, props) {
  const { queryParams = {} } = form;
  const itemId = props.itemId || form.itemId;
  const shapeId = props.shapeId || form.shapeId;
  return api
    .getShape({
      itemId,
      shapeId,
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

export function onGetShapeFileList(form, dispatch, props) {
  const { queryParams = {} } = form;
  const itemId = props.itemId || form.itemId;
  const shapeId = props.shapeId || form.shapeId;
  return api
    .getShape({
      itemId,
      shapeId,
      queryParams,
      path: `/API/item/${itemId}/shape/${shapeId}/file`,
    })
    .then((response) => ({ itemId, shapeId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onRemoveShape(form, dispatch, props) {
  const { queryParams } = form;
  const itemId = props.itemId || form.itemId;
  const shapeId = props.shapeId || form.shapeId;
  return api
    .removeShape({
      itemId,
      shapeId,
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

export function onRemoveShapeAll(form, dispatch, props) {
  const { queryParams } = form;
  const itemId = props.itemId || form.itemId;
  return api
    .removeShapeAll({
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

export function onCreateTranscode(form, dispatch, props) {
  const { queryParams = {} } = form;
  const itemId = props.itemId || form.itemId;
  const shapeId = props.shapeId || form.shapeId;
  return api
    .createTranscode({
      itemId,
      shapeId,
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

export function onCreateDeduction(form, dispatch, props) {
  const { queryParams = {} } = form;
  const itemId = props.itemId || form.itemId;
  const shapeId = props.shapeId || form.shapeId;
  return api
    .createDeduction({
      itemId,
      shapeId,
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

export function onUpdateShapeTag(form, dispatch, props) {
  const itemId = props.itemId || form.itemId;
  const shapeId = props.shapeId || form.shapeId;
  const tagName = props.tagName || form.tagName;
  return api
    .updateShapeTag({
      itemId,
      shapeId,
      tagName,
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

export function onUpdateShapeMime(form, dispatch, props) {
  const itemId = props.itemId || form.itemId;
  const shapeId = props.shapeId || form.shapeId;
  const mimeType = props.mimeType || form.mimeType;
  return api
    .updateShapeMime({
      itemId,
      shapeId,
      mimeType: encodeURIComponent(mimeType),
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

export function onUpdateShapePlaceholder(form, dispatch, props) {
  const itemId = props.itemId || form.itemId;
  const shapeId = props.shapeId || form.shapeId;
  const { queryParams, simpleMetadataDocument } = form;
  return api
    .updateShapePlaceholder({
      itemId,
      shapeId,
      queryParams,
      simpleMetadataDocument,
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

export function onRemoveShapeTag(form, dispatch, props) {
  const itemId = props.itemId || form.itemId;
  const shapeId = props.shapeId || form.shapeId;
  const tagName = props.tagName || form.tagName;
  return api
    .removeShapeTag({
      itemId,
      shapeId,
      tagName,
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
export function onRemoveShapeMime(form, dispatch, props) {
  const itemId = props.itemId || form.itemId;
  const shapeId = props.shapeId || form.shapeId;
  const mimeType = props.mimeType || form.mimeType;
  return api
    .removeShapeMime({
      itemId,
      shapeId,
      mimeType: encodeURIComponent(mimeType),
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

export function onCreateShapeAnalyze(form, dispatch, props) {
  const { analyzeJobDocument = {}, queryParams } = form;
  const itemId = props.itemId || form.itemId;
  const shapeId = props.shapeId || form.shapeId;
  return api
    .createShapeAnalyze({
      itemId,
      shapeId,
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

export function onCreateExport(form, dispatch, props) {
  const { queryParams } = form;
  const itemId = props.itemId || form.itemId;
  const shapeId = props.shapeId || form.shapeId;
  return api
    .createTranscode({
      itemId,
      shapeId,
      queryParams,
      path: `/API/item/${itemId}/shape/${shapeId}/export`,
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

export function onCreateExportImp(form, dispatch, props) {
  const { queryParams } = form;
  const itemId = props.itemId || form.itemId;
  const shapeId = props.shapeId || form.shapeId;
  return api
    .createTranscode({
      itemId,
      shapeId,
      queryParams,
      path: `/API/item/${itemId}/shape/${shapeId}/export/imp`,
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
