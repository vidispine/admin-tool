import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../../form';
import Field from '../../ui/Field';
import FormSection from '../../ui/FormSection';
import InitialDisabledTextField from '../../ui/InitialDisabledTextField';

function ConfigurationPropertyType() {
  return (
    <>
      <Field name="key" label="Key" component={InitialDisabledTextField} fullWidth />
      <Field name="value" label="Value" component={TextField} fullWidth multiline />
    </>
  );
}

function PropertiesForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="configurationPropertyDocument" component={ConfigurationPropertyType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(PropertiesForm);
