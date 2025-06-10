import { SubmissionError } from 'redux-form';

import { search as api } from '@vidispine/vdt-api';

export function onSearchShape(form) {
  const { queryParams = {}, shapeSearchDocument = {} } = form;
  return api
    .searchShape({
      shapeSearchDocument,
      queryParams,
    })
    .then((response) => ({
      queryParams,
      shapeSearchDocument,
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

export function onSearchFile(form) {
  const { queryParams = {}, fileSearchDocument = {} } = form;
  return api
    .searchFile({
      fileSearchDocument,
      queryParams,
    })
    .then((response) => ({
      queryParams,
      fileSearchDocument,
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

export function onSearch(form) {
  const { queryParams = {}, itemSearchDocument = {} } = form;
  return api
    .searchItemCollection({
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

export function onAutocomplete(form) {
  const { autocompleteRequestDocument = {} } = form;
  return api
    .searchAutoComplete({
      autocompleteRequestDocument,
    })
    .then((response) => ({
      autocompleteRequestDocument,
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
