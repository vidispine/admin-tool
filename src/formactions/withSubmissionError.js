import { SubmissionError } from 'redux-form';

const throwSubmissionError = (error) => {
  let errorMessage = error.message;
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== 'production') console.error(error);
  if (error.response) {
    errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
  }
  throw new SubmissionError({ _error: errorMessage });
};

const withSubmissionError = (submit) => (form, dispatch, props, ...args) => {
  try {
    return submit(form, dispatch, props, ...args)
      .catch(throwSubmissionError);
  } catch (error) {
    throw throwSubmissionError(error);
  }
};

export default withSubmissionError;
