import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { TextField, Select } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import { required } from '../../utils/FieldValidation';

const queryParams = () => (
  <>
    <FormControl fullWidth>
      <InputLabel htmlFor="scheme">Scheme</InputLabel>
      <Field name="scheme" component={Select}>
        <MenuItem value="https">HTTPS</MenuItem>
        <MenuItem value="http">HTTP</MenuItem>
        <MenuItem value="s3">S3</MenuItem>
      </Field>
    </FormControl>

    <FormControlLabel
      control={(
        <Field
          name="write"
          component={BoolCheckbox}
        />
      )}
      label="Write"
    />
    <Field
      name="duration"
      component={TextField}
      fullWidth
    />
    <Field
      name="sse-kms"
      component={TextField}
      fullWidth
    />
    <Field
      name="kmsKeyId"
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
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(FileHashForm);
