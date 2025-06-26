import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import CodeField from '../ui/CodeField';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';

function KeyValueType() {
  return (
    <>
      <Field name="key" label="key" component={TextField} fullWidth />
      <Field name="value" label="value" component={CodeField} fullWidth />
    </>
  );
}

function AnalyzePresetType() {
  return (
    <>
      <Field name="name" label="name" component={InitialDisabledTextField} fullWidth />
      <FieldTypeArray name="data" label="data" component={KeyValueType} />
    </>
  );
}

function AnalyzePresetForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="analyzePresetDocument" component={AnalyzePresetType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(AnalyzePresetForm);
