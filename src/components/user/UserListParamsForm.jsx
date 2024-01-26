import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import { TextField, Select } from '../form';

export const queryParams = () => (
  <>
    <FormControl fullWidth>
      <InputLabel htmlFor="disabled">Disabled</InputLabel>
      <Field name="disabled" component={Select}>
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </Field>
    </FormControl>
    <FormControlLabel
      control={<Field name="ignoreCase" component={BoolCheckbox} default="" />}
      label="Ignore Case"
    />
    <Field
      name="first"
      component={TextField}
      type="number"
      fullWidth
      disabled
    />
    <Field
      name="number"
      component={TextField}
      type="number"
      fullWidth
      disabled
    />
  </>
);

function UserListParamForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        label="queryParams"
        component={queryParams}
        fullWidth
      />
    </form>
  );
}

export default reduxForm()(UserListParamForm);
