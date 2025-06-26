import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import JobPriority from '../../const/JobPriority';
import { Select } from '../form';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <FormControl fullWidth>
    <InputLabel htmlFor="priority">Priority</InputLabel>
    <Field name="priority" component={Select}>
      {JobPriority.map((priority) => (
        <MenuItem key={priority} value={priority}>
          {priority}
        </MenuItem>
      ))}
    </Field>
  </FormControl>
);

function JobPriorityForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(JobPriorityForm);
