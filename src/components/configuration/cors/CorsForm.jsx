import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../../form';
import ChipInput from '../../ui/ChipInput';
import Field from '../../ui/Field';
import FieldTypeArray from '../../ui/FieldTypeArray';
import FormSection from '../../ui/FormSection';
import { KeyValuePairType } from '../../ui/FormType';

function CORSConfigurationEntryRequest() {
  return (
    <>
      <Field name="method" component={ChipInput} simple fullWidth />
      <Field name="origin" component={ChipInput} simple fullWidth />
      <Field name="originRegex" component={ChipInput} simple fullWidth />
      <Field name="pathRegex" component={ChipInput} simple fullWidth />
      <FieldTypeArray
        name="headerRegex"
        label="headerRegex"
        component={KeyValuePairType}
        fullWidth
      />
    </>
  );
}

function CORSConfigurationEntryResponse() {
  return (
    <>
      <Field name="allowOrigin" component={TextField} fullWidth />
      <Field name="allowMethods" component={ChipInput} simple fullWidth />
      <Field name="allowHeaders" component={ChipInput} simple fullWidth />
      <Field name="allowMaxAge" component={TextField} fullWidth />
      <FieldTypeArray
        name="allowOtherHeader"
        label="allowOtherHeader"
        component={KeyValuePairType}
        fullWidth
      />
    </>
  );
}

function CORSConfigurationEntry() {
  return (
    <>
      <FieldTypeArray name="request" label="request" component={CORSConfigurationEntryRequest} />
      <FormSection name="response" label="response" component={CORSConfigurationEntryResponse} />
    </>
  );
}

function CORSConfigurationType() {
  return <FieldTypeArray name="entry" label="entry" component={CORSConfigurationEntry} />;
}

function CorsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="corsConfigurationDocument" component={CORSConfigurationType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(CorsForm);
