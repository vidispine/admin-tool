import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';

const queryParams = () => (
  <>
    <Field
      name="first"
      component={TextField}
      fullWidth
    />
    <Field
      name="number"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="autoRefresh"
          component={BoolCheckbox}
        />
      )}
      label="Auto Refresh"
    />
    <Field
      name="frequencyFrom"
      component={TextField}
      fullWidth
    />
    <Field
      name="frequencyTo"
      component={TextField}
      fullWidth
    />
    <Field
      name="updateMode"
      component={TextField}
      fullWidth
    />
  </>
);

function LibraryListParamsForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        label="queryParams"
        component={queryParams}
      />
    </form>
  );
}

export default reduxForm()(LibraryListParamsForm);
