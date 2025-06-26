import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import JobPriority from '../../../const/JobPriority';
import { TextField, Select } from '../../form';
import Field from '../../ui/Field';
import FieldTypeArray from '../../ui/FieldTypeArray';
import FormSection from '../../ui/FormSection';

function JobPoolType() {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel htmlFor="priorityThreshold">Priority Threshold</InputLabel>
        <Field name="priorityThreshold" component={Select}>
          {JobPriority.map((priority) => (
            <MenuItem key={priority} value={priority}>
              {priority}
            </MenuItem>
          ))}
        </Field>
      </FormControl>
      <Field name="size" component={TextField} type="number" fullWidth />
    </>
  );
}

function JobPoolListType() {
  return (
    <>
      <Field name="concurrentJobs" component={TextField} type="number" fullWidth />
      <FieldTypeArray name="pool" label="Pool" component={JobPoolType} />
    </>
  );
}

function JobPoolForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="jobPoolListDocument" component={JobPoolListType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(JobPoolForm);
