import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field, FormSection } from 'redux-form';

import { TextField, Select } from '../form';
import GroupSelect from '../group/GroupSelect';
import { loadMetadataFieldOptions } from '../metadatafield/MetadataFieldSelect';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import DynamicSelect from '../ui/DynamicSelect';
import { StatefulAsyncSelect } from '../ui/Select';
import UserSelect from '../user/UserSelect';

export function AccessControlMetadataType() {
  return (
    <Field
      name="field"
      label="Metadata Field"
      component={StatefulAsyncSelect}
      loadOptions={loadMetadataFieldOptions}
      cacheOptions
      isClearable
    />
  );
}

export function AccessControlShapeType() {
  return (
    <Field
      name="tag"
      label="Shape Tag"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      creatable
      cacheOptions
      isClearable
    />
  );
}

export function AccessControlUriType() {
  return <Field name="type" component={TextField} label="URI Type" fullWidth />;
}

function AccessControlType() {
  return (
    <>
      <Field name="priority" component={TextField} label="Priority" type="number" fullWidth />
      <FormControl fullWidth>
        <InputLabel htmlFor="permission">Permission</InputLabel>
        <Field name="permission" component={Select}>
          <MenuItem value="READ">Read</MenuItem>
          <MenuItem value="WRITE">Write</MenuItem>
          <MenuItem value="ALL">All</MenuItem>
          <MenuItem value="OWNER">Owner</MenuItem>
          <MenuItem value="NONE">None</MenuItem>
        </Field>
      </FormControl>
      <UserSelect name="grantor" label="Grantor" isClearable fullWidth />
      <FormControlLabel
        control={<Field name="recursive" component={BoolCheckbox} />}
        label="Recursive"
      />
    </>
  );
}

function AccessControlQueryParams() {
  return (
    <FormControlLabel
      control={<Field name="allowDuplicate" component={BoolCheckbox} />}
      label="Allow Duplicate"
    />
  );
}

function AccessControlForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="accessControlDocument"
        component={DynamicSelect}
        label="Entity"
        fullWidth
        choices={{
          user: <UserSelect name="accessControlDocument.user" label="User" isClearable fullWidth />,
          group: (
            <GroupSelect name="accessControlDocument.group" label="Group" isClearable fullWidth />
          ),
        }}
      >
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="group">Group</MenuItem>
      </Field>
      <Field
        name="accessControlDocument.operation"
        component={DynamicSelect}
        label="Operation"
        fullWidth
        choices={{
          metadata: (
            <FormSection
              name="accessControlDocument.operation.metadata"
              component={AccessControlMetadataType}
            />
          ),
          shape: (
            <FormSection
              name="accessControlDocument.operation.shape"
              component={AccessControlShapeType}
            />
          ),
          uri: (
            <FormSection
              name="accessControlDocument.operation.uri"
              component={AccessControlUriType}
            />
          ),
        }}
      >
        <MenuItem value="metadata">Metadata</MenuItem>
        <MenuItem value="shape">Shape</MenuItem>
        <MenuItem value="uri">URI</MenuItem>
      </Field>
      <FormSection name="accessControlDocument" component={AccessControlType} />
      <FormSection name="queryParams" component={AccessControlQueryParams} />
      <button type="submit" hidden />
    </form>
  );
}

const AccessControlFormForm = reduxForm()(AccessControlForm);

export default AccessControlFormForm;
