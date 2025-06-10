import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../../form';
import Field from '../../ui/Field';
import FieldTypeArray from '../../ui/FieldTypeArray';
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

function ConfigurationPropertyListType() {
  return <FieldTypeArray name="property" component={ConfigurationPropertyType} />;
}

function PropertiesListForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="configurationPropertyListDocument"
        component={ConfigurationPropertyListType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(PropertiesListForm);
