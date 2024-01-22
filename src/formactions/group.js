import { group as GroupApi } from '@vidispine/vdt-api';
import withSubmissionError from './withSubmissionError';

export const onUpdateGroup = withSubmissionError((form, dispatch, props) => {
  const { queryParams, groupDocument } = form;
  const groupName = props.groupName || form.groupDocument.groupName;
  return GroupApi.updateGroup({
    groupName,
    groupDocument,
    queryParams,
  });
});

export const onListGroup = withSubmissionError((form) => {
  const { queryParams = {} } = form;
  return GroupApi.listGroup({
    queryParams,
  });
});

export const onSearchGroup = withSubmissionError((form) => {
  const { queryParams = {}, groupSearchDocument = {} } = form;
  return GroupApi.searchGroup({
    queryParams,
    groupSearchDocument,
  });
});
