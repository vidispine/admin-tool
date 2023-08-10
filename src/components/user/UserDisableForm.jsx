import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, Select } from '../form';

import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import JobPriority from '../../const/JobPriority';
import { KeyValuePairType } from '../ui/FormType';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadUserOptions } from './UserSelect';

const queryParams = () => (
  <>
    <FormControlLabel
      control={(
        <Field
          name="hard"
          component={BoolCheckbox}
        />
      )}
      label="Hard Delete"
    />
    <FormControlLabel
      control={(
        <Field
          name="preserveAccess"
          component={BoolCheckbox}
        />
      )}
      label="Preserve Access"
    />
    <Field
      name="transferAccess"
      label="Transfer Access To"
      component={StatefulAsyncSelect}
      loadOptions={loadUserOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <Field
      name="notification"
      component={TextField}
      fullWidth
    />
    <FieldTypeArray
      name="notificationData"
      component={KeyValuePairType}
      label="Notification Metadata"
      arrayHeader
      withHeader={false}
      dense
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="priority">Priority</InputLabel>
      <Field name="priority" component={Select}>
        {JobPriority.map((priority) => (
          <MenuItem key={priority} value={priority}>
            {priority}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
    <FieldTypeArray
      name="jobmetadata"
      component={KeyValuePairType}
      label="Job Metadata"
      withHeader={false}
      arrayHeader
      dense
    />
  </>
);

function UserForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(UserForm);
