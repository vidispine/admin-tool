import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <>
    <Field
      name="seconds"
      label="Duration (Seconds)"
      component={TextField}
      type="number"
      fullWidth
    />
    <FormControlLabel
      control={<Field name="autoRefresh" component={BoolCheckbox} />}
      label="Auto Refresh"
    />
  </>
);

function UserTokenForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(UserTokenForm);
