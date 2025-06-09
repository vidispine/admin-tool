import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { reduxForm } from 'redux-form';

import FormSection from '../../ui/FormSection';
import Field from '../../ui/Field';
import FieldTypeArray from '../../ui/FieldTypeArray';
import { StatefulAsyncSelect } from '../../ui/Select';
import { loadJobTypeOptions } from '../../jobtype/JobTypeSelect';
import JobPriority from '../../../const/JobPriority';
import { Select } from '../../form';

const job = () => (
  <>
    <Field
      name="type"
      label="Type"
      component={StatefulAsyncSelect}
      loadOptions={loadJobTypeOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="value">Priority</InputLabel>
      <Field name="value" component={Select}>
        {JobPriority.map((priority) => (
          <MenuItem key={priority} value={priority}>
            {priority}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
  </>

);

const JobPriorityConfigurationType = () => (
  <FieldTypeArray
    name="job"
    label="Job Type"
    component={job}
    fullWidth
  />
);

function JobPriorityForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="jobPriorityConfigurationDocument"
        component={JobPriorityConfigurationType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(JobPriorityForm);
