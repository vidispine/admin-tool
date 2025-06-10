import { SubmissionError } from 'redux-form';

import { debug as api } from '@vidispine/vdt-api';

export function onEcho(form) {
  const { xmlDocument } = form;
  return api.echo({ xmlDocument }).catch((error) => {
    let errorMessage = error.message;
    if (error.response) {
      errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
    }
    throw new SubmissionError({ _error: errorMessage });
  });
}

export default onEcho;
