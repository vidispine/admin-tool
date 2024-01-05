import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { Select } from '../form';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';

export const queryParams = () => (
  <>
    <FormControl fullWidth>
      <InputLabel htmlFor="type">Type</InputLabel>
      <Field name="type" component={Select}>
        <MenuItem value="ancestor">Ancestor</MenuItem>
        <MenuItem value="grant">Grant</MenuItem>
      </Field>
    </FormControl>
    <FormControl fullWidth>
      <InputLabel htmlFor="users">Users</InputLabel>
      <Field name="users" component={Select}>
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </Field>
    </FormControl>
    <FormControl fullWidth>
      <InputLabel htmlFor="users">Groups</InputLabel>
      <Field name="groups" component={Select}>
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </Field>
    </FormControl>
  </>
);

function AccessGraphParamsForm({ error, handleSubmit }) {
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

export default reduxForm()(AccessGraphParamsForm);
