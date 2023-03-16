import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import { required } from '../../utils/FieldValidation';

const queryParams = () => (
  <>
    <Field
      name="algorithm"
      component={TextField}
      fullWidth
    />
  </>
);

function FileHashForm({
  error,
  handleSubmit,
  fileId,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!fileId && (
        <Field
          name="fileId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      <Field
        name="hash"
        component={TextField}
        validate={[required]}
        fullWidth
      />
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(FileHashForm);
