import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import FileStates from '../../const/FileStates';
import { TextField, Select } from '../form';
import { loadStorageOptions } from '../storage/StorageSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';

const queryParams = () => (
  <>
    <Field name="path" component={TextField} fullWidth required />
    <Field
      name="storage"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageOptions}
      cacheOptions
      isClearable
      required
      fullWidth
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="state">State</InputLabel>
      <Field name="state" component={Select}>
        {FileStates.map((fileState) => (
          <MenuItem key={fileState} value={fileState}>
            {fileState}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
    <FormControlLabel
      control={<Field name="duplicate" component={BoolCheckbox} />}
      label="Duplicate"
    />
  </>
);

function FilePathForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(FilePathForm);
