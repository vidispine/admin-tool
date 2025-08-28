import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { required } from '../../utils/FieldValidation';
import { TextField, Select } from '../form';
import { loadGroupOptions } from '../group/GroupSelect';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadUserOptions } from '../user/UserSelect';

function MetadataFieldAccessControlDocument() {
  return (
    <>
      <Field
        name="user"
        label="User"
        component={StatefulAsyncSelect}
        loadOptions={loadUserOptions}
        cacheOptions
        isClearable
        fullWidth
      />
      <Field
        name="group"
        label="Group"
        component={StatefulAsyncSelect}
        loadOptions={loadGroupOptions}
        cacheOptions
        isClearable
        creatable
      />
      <FormControl fullWidth>
        <InputLabel htmlFor="permission">Permission</InputLabel>
        <Field name="permission" component={Select}>
          <MenuItem value="NONE">None</MenuItem>
          <MenuItem value="READ">Read</MenuItem>
          <MenuItem value="WRITE">Write</MenuItem>
          <MenuItem value="DELETE">Delete</MenuItem>
        </Field>
      </FormControl>
    </>
  );
}

function FieldGroupAccessControlForm({ groupName, error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!groupName && (
        <Field name="groupName" component={TextField} validate={[required]} fullWidth />
      )}

      <FormSection
        name="metadataFieldAccessControlDocument"
        component={MetadataFieldAccessControlDocument}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(FieldGroupAccessControlForm);
