import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField, Select } from '../form';
import { loadGroupOptions } from '../group/GroupSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import ChipInput from '../ui/ChipInput';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';
import { StatefulAsyncSelect } from '../ui/Select';
import { SimpleMetadataType } from '../ui/SimpleMetadataForm';

function GroupType() {
  return (
    <Field
      name="groupName"
      label="Group"
      component={StatefulAsyncSelect}
      loadOptions={loadGroupOptions}
      cacheOptions
      isClearable
    />
  );
}

function GroupListType() {
  return <FieldTypeArray name="group" label="group" component={GroupType} />;
}

function UserType() {
  return (
    <>
      <Field name="userName" component={InitialDisabledTextField} fullWidth />
      <Field name="realName" component={TextField} fullWidth />
      <Field name="alias" component={ChipInput} simple fullWidth />
      <Field name="password" component={TextField} type="password" fullWidth />
      <Field name="salt" component={TextField} fullWidth />
      <FormSection name="groupList" component={GroupListType} />
      <FormSection name="metadata" component={SimpleMetadataType} />
      <FormControlLabel
        control={<Field name="disabled" component={BoolCheckbox} />}
        label="Disabled"
      />
      <FormControlLabel
        control={<Field name="accessPreserved" component={BoolCheckbox} />}
        label="Access Preserved"
      />
      <FormControlLabel control={<Field name="remove" component={BoolCheckbox} />} label="Remove" />
    </>
  );
}

const queryParams = () => (
  <FormControl fullWidth>
    <InputLabel htmlFor="passwordType">Password Type</InputLabel>
    <Field name="passwordType" component={Select}>
      <MenuItem value="md5">MD5</MenuItem>
      <MenuItem value="raw">Raw</MenuItem>
    </Field>
  </FormControl>
);

function UserForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <FormSection name="userDocument" component={UserType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(UserForm);
