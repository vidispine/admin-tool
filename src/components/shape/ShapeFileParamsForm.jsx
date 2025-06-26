import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';

const queryParams = () => (
  <>
    <Field name="methodType" component={TextField} fullWidth />
    <Field name="storageType" component={TextField} fullWidth />
    <Field name="scheme" component={TextField} fullWidth />
    <FieldTypeArray name="methodMetadata" label="Method Metadata" component={KeyValuePairType} />
    <FormControlLabel
      control={<Field name="includeItem" component={BoolCheckbox} />}
      label="Include Item"
    />
    <FormControlLabel
      control={<Field name="closedFiles" component={BoolCheckbox} />}
      label="Closed Files"
    />
  </>
);

function ShapeFileParamsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeFileParamsForm);
