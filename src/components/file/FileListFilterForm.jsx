import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import FileStates from '../../const/FileStates';
import { TextField, Select, RadioGroup } from '../form';
import { loadStorageOptions } from '../storage/StorageSelect';
import { loadStorageGroupOptions } from '../storagegroup/StorageGroupSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import ChipInput from '../ui/ChipInput';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';
import { StatefulAsyncSelect } from '../ui/Select';

const queryParams = () => (
  <>
    <Field name="id" label="File IDs" component={ChipInput} simple fullWidth />
    <Field name="path" component={TextField} fullWidth />
    <FormControlLabel
      control={<Field name="ignorecase" component={BoolCheckbox} />}
      label="Ignore Case"
    />
    <FormControlLabel
      control={<Field name="recursive" component={BoolCheckbox} />}
      label="Recursive"
    />
    <FormControlLabel
      control={<Field name="wildcard" component={BoolCheckbox} />}
      label="Wildcard"
    />
    <FormControlLabel control={<Field name="count" component={BoolCheckbox} />} label="Count" />
    <FormControlLabel control={<Field name="prefix" component={BoolCheckbox} />} label="Prefix" />
    <Field name="hash" label="Hashes" component={ChipInput} simple fullWidth />
    <Field name="algorithm" component={TextField} fullWidth />
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
    <Field name="methodType" component={TextField} fullWidth />
    <Field name="storageType" component={TextField} fullWidth />
    <Field name="scheme" component={TextField} fullWidth />
    <FieldTypeArray name="methodMetadata" label="Method Metadata" component={KeyValuePairType} />
    <Field name="first" component={TextField} type="number" fullWidth disabled />
    <Field name="number" component={TextField} type="number" fullWidth disabled />
    <Field name="prefixFirst" component={TextField} type="number" fullWidth disabled />
    <Field name="prefixNumber" component={TextField} type="number" fullWidth disabled />
    <Field name="sort" component={ChipInput} simple fullWidth disabled />
    <Field
      name="storage"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageOptions}
      cacheOptions
      isClearable
      required
      fullWidth
    />
    <Field
      name="storageGroup"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageGroupOptions}
      cacheOptions
      isClearable
      required
      fullWidth
    />
    <FormControl component="fieldset">
      <FormLabel component="legend">File Association</FormLabel>
      <Field name="filter" component={RadioGroup}>
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel value="item" control={<Radio />} label="With Item" />
        <FormControlLabel value="noitem" control={<Radio />} label="Not Associated" />
      </Field>
    </FormControl>
    <FormControlLabel
      control={<Field name="excludeQueued" component={BoolCheckbox} />}
      label="Exclude Queued"
    />
    <FormControlLabel
      control={<Field name="includeItem" component={BoolCheckbox} />}
      label="Include Item"
    />
  </>
);

function FileListFilterForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(FileListFilterForm);
