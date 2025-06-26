import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <>
    <Field name="first" component={TextField} fullWidth />
    <Field name="number" component={TextField} fullWidth />
    <FormControlLabel
      control={<Field name="autoRefresh" component={BoolCheckbox} />}
      label="Auto Refresh"
    />
    <Field name="frequencyFrom" component={TextField} fullWidth />
    <Field name="frequencyTo" component={TextField} fullWidth />
    <Field name="updateMode" component={TextField} fullWidth />
  </>
);

function LibraryListParamsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" label="queryParams" component={queryParams} />
    </form>
  );
}

export default reduxForm()(LibraryListParamsForm);
