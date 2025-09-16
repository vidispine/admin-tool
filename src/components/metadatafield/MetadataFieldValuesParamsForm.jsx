import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

function queryParams() {
  return (
    <>
      <Field name="key-exact" component={TextField} fullWidth />
      <Field name="key-start" component={TextField} fullWidth />
      <Field name="key-regex" component={TextField} fullWidth />
      <Field name="value-exact" component={TextField} fullWidth />
      <Field name="value-start" component={TextField} fullWidth />
      <Field name="value-regex" component={TextField} fullWidth />
      <Field name="hits" component={TextField} fullWidth />
    </>
  );
}

function MetadataFieldValuesParamsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
    </form>
  );
}

export default reduxForm()(MetadataFieldValuesParamsForm);
