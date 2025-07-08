import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import JobPriority from '../../const/JobPriority';
import JobStates from '../../const/JobStates';
import { TextField } from '../form';
import { loadJobTypeOptions } from '../jobtype/JobTypeSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import ChipInput from '../ui/ChipInput';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';
import { StatefulAsyncSelect } from '../ui/Select';

const JOB_PRIORITY_OPTIONS = ['all', ...JobPriority].map((value) => ({ value, label: value }));
const JOB_STATE_OPTIONS = ['all', ...JobStates].map((value) => ({ value, label: value }));
const JOB_SORT_OPTIONS = ['jobId', 'type', 'state', 'user', 'startTime', 'priority'].reduce(
  (a, value) => [
    ...a,
    { value: `${value} asc`, label: `${value} asc` },
    { value: `${value} desc`, label: `${value} desc` },
  ],
  [],
);

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
    <Field
      name="priority"
      label="Priority"
      component={StatefulAsyncSelect}
      isClearable
      fullWidth
      isMulti
      options={JOB_PRIORITY_OPTIONS}
    />
    <Field
      name="state"
      label="State"
      component={StatefulAsyncSelect}
      isClearable
      fullWidth
      isMulti
      options={JOB_STATE_OPTIONS}
    />
    <Field
      name="type"
      label="Type"
      component={StatefulAsyncSelect}
      loadOptions={loadJobTypeOptions}
      cacheOptions
      isClearable
      fullWidth
      creatable
      isMulti
    />
    <Field name="first" component={TextField} type="number" fullWidth />
    <Field name="number" component={TextField} type="number" fullWidth />
    <Field
      name="sort"
      label="Sort"
      component={StatefulAsyncSelect}
      isClearable
      fullWidth
      isMulti
      options={JOB_SORT_OPTIONS}
    />
    <FormControlLabel
      control={<Field name="user" component={BoolCheckbox} />}
      label="Only My User"
    />
    <Field name="field" label="Field" component={ChipInput} simple fullWidth />
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
