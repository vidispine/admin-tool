import { SubmissionError } from 'redux-form';

import { conform as ConformApi } from '@vidispine/vdt-api';

import * as actions from '../actions';

export const onCreateSubmit = async (form) => {
  try {
    const { conformRequestDocument, queryParams } = form;
    const { data: jobDocument } = await ConformApi.createConform({
      conformRequestDocument,
      queryParams,
    });
    return { jobDocument };
  } catch (error) {
    let errorMessage = error.message;
    if (error.response) {
      errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
    }
    throw new SubmissionError({ _error: errorMessage });
  }
};

export function onCreateSubmitFail(errors, dispatch) {
  const { openSnackBar } = actions.ui;
  const messageContent = 'Error Creating Conform Job';
  dispatch(openSnackBar({ messageContent, messageColor: 'secondary' }));
}

export function onCreateSubmitSuccess(response, dispatch) {
  const { jobDocument } = response;
  const { jobId } = jobDocument;
  const { openSnackBar } = actions.ui;
  const messageContent = `Job ${jobId} Created`;
  dispatch(openSnackBar({ messageContent }));
}
