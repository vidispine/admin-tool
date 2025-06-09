import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import Field from '../ui/Field';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';
import FormSection from '../ui/FormSection';
import FieldTypeArray from '../ui/FieldTypeArray';
import CodeField from '../ui/CodeField';
import { TextField } from '../form';

const KeyValueType = () => (
  <>
    <Field
      name="key"
      label="key"
      component={TextField}
      fullWidth
    />
    <Field
      name="value"
      label="value"
      component={CodeField}
      fullWidth
    />
  </>
);

const AnalyzePresetType = () => (
  <>
    <Field
      name="name"
      label="name"
      component={InitialDisabledTextField}
      fullWidth
    />
    <FieldTypeArray
      name="data"
      label="data"
      component={KeyValueType}
    />
  </>
);

const AnalyzePresetForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="analyzePresetDocument"
      component={AnalyzePresetType}
    />
    <button type="submit" hidden />
  </form>
);

export default reduxForm()(AnalyzePresetForm);
