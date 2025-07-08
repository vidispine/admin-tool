import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';
import { StatefulAsyncSelect } from '../ui/Select';
import { SimpleMetadataType } from '../ui/SimpleMetadataForm';
import { loadUserOptions } from '../user/UserSelect';

import { loadGroupOptions } from './GroupSelect';

function GroupLookup() {
  return (
    <Field
      name="groupName"
      label="Group"
      component={StatefulAsyncSelect}
      loadOptions={loadGroupOptions}
      cacheOptions
      isClearable
      creatable
    />
  );
}

function UserLookup() {
  return (
    <Field
      name="userName"
      label="User"
      component={StatefulAsyncSelect}
      loadOptions={loadUserOptions}
      cacheOptions
      isClearable
      creatable
    />
  );
}

function GroupListType() {
  return <FieldTypeArray name="group" label="Group" component={GroupLookup} />;
}

function UserListType() {
  return <FieldTypeArray name="user" label="User" component={UserLookup} />;
}

function GroupType() {
  return (
    <>
      <Field name="groupName" component={InitialDisabledTextField} fullWidth />
      <Field name="description" component={TextField} fullWidth />
      <FormControlLabel
        control={<Field name="role" component={BoolCheckbox} disabled />}
        label="Role"
      />
      <FormSection name="metadata" component={SimpleMetadataType} />
      <FormSection name="parentGroupList" label="Parent Groups" component={GroupListType} />
      <FormSection name="childGroupList" label="Child Groups" component={GroupListType} />
      <FormSection name="userList" label="Users" component={UserListType} />
    </>
  );
}

const queryParams = () => (
  <FormControlLabel
    control={<Field name="clear" component={BoolCheckbox} />}
    label="Clear Existing Users/Groups"
  />
);

function UserSection() {
  return <FormSection name="userList" component={UserListType} />;
}

function UserForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="groupDocument" component={UserSection} />
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export const GroupUserForm = reduxForm()(UserForm);

function ChildSection() {
  return <FormSection name="childGroupList" component={GroupListType} />;
}

function ChildForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="groupDocument" component={ChildSection} />
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export const GroupChildForm = reduxForm()(ChildForm);

function ParentSection() {
  return <FormSection name="parentGroupList" component={GroupListType} />;
}

function ParentForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="groupDocument" component={ParentSection} />
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export const GroupParentForm = reduxForm()(ParentForm);

function GroupForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="groupDocument" component={GroupType} />
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(GroupForm);
