import { SubmissionError } from 'redux-form';

import { library as api } from '@vidispine/vdt-api';

export function onCreate(form) {
  const { queryParams, itemListDocument } = form;
  return api
    .createLibrary({
      itemListDocument,
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

export function onList(form) {
  const { queryParams } = form;
  return api
    .listLibrary({
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

export function onGet(form, dispatch, props) {
  const { queryParams } = form;
  const libraryId = props.libraryId || form.libraryId;
  return api
    .getLibrary({
      libraryId,
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

export function onUpdate(form, dispatch, props) {
  const { itemListDocument } = form;
  const libraryId = props.libraryId || form.libraryId;
  return api
    .updateLibrary({
      libraryId,
      itemListDocument,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateSettings(form, dispatch, props) {
  const { librarySettingsDocument } = form;
  const libraryId = props.libraryId || form.libraryId;
  return api
    .updateLibrarySettings({
      libraryId,
      librarySettingsDocument,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateItemMetadata(form, dispatch, props) {
  const { metadataDocument, queryParams } = form;
  const libraryId = props.libraryId || form.libraryId;
  return api
    .updateLibraryItemMetadata({
      libraryId,
      metadataDocument,
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

export function onRemove(form, dispatch, props) {
  const { queryParams } = form;
  const libraryId = props.libraryId || form.libraryId;
  return api
    .removeLibrary({
      libraryId,
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
  const libraryId = props.libraryId || form.libraryId;
  return api
    .getLibrary({
      libraryId,
      queryParams,
      path: `/API/library/${libraryId}/export`,
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
