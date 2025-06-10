import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField, Select } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadUserOptions } from '../user/UserSelect';

export const queryParams = () => (
  <>
    <Field
      name="username"
      label="User"
      component={StatefulAsyncSelect}
      loadOptions={loadUserOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="permission">Permission</InputLabel>
      <Field name="permission" component={Select}>
        <MenuItem value="NONE">None</MenuItem>
        <MenuItem value="READ">Read</MenuItem>
        <MenuItem value="WRITE">Write</MenuItem>
        <MenuItem value="ALL">All</MenuItem>
        <MenuItem value="OWNER">Owner</MenuItem>
      </Field>
    </FormControl>
    <FormControl fullWidth>
      <InputLabel htmlFor="type">Type</InputLabel>
      <Field name="type" component={Select}>
        <MenuItem value="GENERIC">Generic</MenuItem>
        <MenuItem value="URI">URI</MenuItem>
        <MenuItem value="SHAPE">Shape</MenuItem>
        <MenuItem value="METADATA">Metadata</MenuItem>
      </Field>
    </FormControl>
    <Field name="extradata" label="Extra Data" component={TextField} fullWidth />
    <FormControlLabel
      control={<Field name="additionalUserInfo" component={BoolCheckbox} />}
      label="Additional User Info"
    />
    <FormControlLabel
      control={<Field name="additionalGroupInfo" component={BoolCheckbox} />}
      label="Additional Group Info"
    />
  </>
);

function AccessControlMergedParamsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" label="queryParams" component={queryParams} fullWidth />
    </form>
  );
}

const AccessControlMergedParamsFormForm = reduxForm()(AccessControlMergedParamsForm);

export default AccessControlMergedParamsFormForm;
