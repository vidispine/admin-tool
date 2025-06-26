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
import { SimpleMetadataTypeForm } from '../ui/SimpleMetadataField';

const fileDocument = () => (
  <>
    <Field name="path" component={TextField} fullWidth />
    <Field name="uri" component={TextField} fullWidth />
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
    <Field name="size" component={TextField} fullWidth />
    <Field name="hash" component={TextField} fullWidth />
    <Field name="timestamp" component={TextField} fullWidth />
    <Field name="refreshFlag" component={TextField} fullWidth />
    <FormSection name="metadata" component={SimpleMetadataTypeForm} />
  </>
);

const queryParams = () => (
  <FormControlLabel
    control={<Field name="createOnly" component={BoolCheckbox} />}
    label="Create Only"
  />
);

function FileEntityForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="storageId"
        component={StatefulAsyncSelect}
        loadOptions={loadStorageOptions}
        cacheOptions
        isClearable
        required
        fullWidth
      />
      <FormSection name="fileDocument" component={fileDocument} />
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(FileEntityForm);
