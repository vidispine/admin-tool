import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { Select } from '../form';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <FormControl fullWidth>
    <InputLabel htmlFor="state">State</InputLabel>
    <Field name="state" component={Select}>
      <MenuItem value="WAITING">Waiting</MenuItem>
      <MenuItem value="SUCCESS">Success</MenuItem>
      <MenuItem value="CONNECTION_FAILURE">Connection Failure</MenuItem>
      <MenuItem value="BAD_REQUEST">Bad Request</MenuItem>
    </Field>
  </FormControl>
);

function ScheduledRequestFilterForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ScheduledRequestFilterForm);
