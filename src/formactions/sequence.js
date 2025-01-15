import { sequence as SequenceApi } from '@vidispine/vdt-api';
import withSubmissionError from './withSubmissionError';

export const onUpdateItemSequence = withSubmissionError((form, dispatch, props) => {
  const {
    body, queryParams, headers, itemId: formItemId, format: formFormat,
  } = form;
  const { itemId = formItemId, format = formFormat } = props;
  return SequenceApi.updateItemSequence({
    itemId,
    format,
    queryParams,
    headers,
    body,
  });
});
