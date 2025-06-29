import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

export const queryParams = () => (
  <>
    <FormControlLabel
      control={<Field name="role" component={BoolCheckbox} default="" />}
      label="Only Roles"
    />
    <Field name="first" component={TextField} type="number" fullWidth disabled />
    <Field name="number" component={TextField} type="number" fullWidth disabled />
  </>
);

function GroupListParamForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" label="queryParams" component={queryParams} fullWidth />
    </form>
  );
}

export default reduxForm()(GroupListParamForm);
