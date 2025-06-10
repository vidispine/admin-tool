import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import JobStates from '../../const/JobStates';
import { TextField, Select } from '../form';
import { loadJobTypeOptions } from '../jobtype/JobTypeSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import ChipInput from '../ui/ChipInput';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';
import { StatefulAsyncSelect } from '../ui/Select';

const queryParams = () => (
  <>
    <FieldTypeArray name="jobmetadata" label="Job Metadata" component={KeyValuePairType} />
    <FormControlLabel
      control={<Field name="metadata" component={BoolCheckbox} />}
      label="Include Metadata"
    />
    <FormControlLabel control={<Field name="idonly" component={BoolCheckbox} />} label="Only IDs" />
    <FormControlLabel
      control={<Field name="step" component={BoolCheckbox} />}
      label="Include Steps"
    />
    <Field name="starttime-from" component={TextField} fullWidth />
    <Field name="starttime-to" component={TextField} fullWidth />
    <Field name="finishtime-from" component={TextField} fullWidth />
    <Field name="finishtime-to" component={TextField} fullWidth />
    <FormControl fullWidth>
      <InputLabel htmlFor="state">State</InputLabel>
      <Field name="state" component={Select}>
        <MenuItem value="all">All</MenuItem>
        {JobStates.map((jobState) => (
          <MenuItem key={jobState} value={jobState}>
            {jobState}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
    <Field
      name="type"
      label="Type"
      component={StatefulAsyncSelect}
      loadOptions={loadJobTypeOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <Field name="first" component={TextField} type="number" fullWidth disabled />
    <Field name="number" component={TextField} type="number" fullWidth disabled />
    <Field name="sort" component={ChipInput} simple fullWidth disabled />
    <FormControlLabel
      control={<Field name="user" component={BoolCheckbox} />}
      label="Only My User"
    />
  </>
);

function JobFilterForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(JobFilterForm);
