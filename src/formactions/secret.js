import { secret as SecretApi } from '@vidispine/vdt-api';
import withSubmissionError from './withSubmissionError';

export const onCreateSecret = withSubmissionError((form, dispatch, props) => {
  const {
    alias: formAlias, secretDocument,
  } = form;
  const { alias = formAlias } = props;
  return SecretApi.createSecret({
    alias,
    secretDocument,
  });
});

export const onUpdateSecret = withSubmissionError((form, dispatch, props) => {
  const {
    alias: formAlias, key: formKey, value,
  } = form;
  const { alias = formAlias, key = formKey } = props;
  return SecretApi.updateSecretValue({
    alias,
    key,
    value,
  });
});
