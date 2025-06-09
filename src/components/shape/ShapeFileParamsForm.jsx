import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import BoolCheckbox from '../ui/BoolCheckbox';
import { KeyValuePairType } from '../ui/FormType';

const queryParams = () => (
  <>
    <Field
      name="methodType"
      component={TextField}
      fullWidth
    />
    <Field
      name="storageType"
      component={TextField}
      fullWidth
    />
    <Field
      name="scheme"
      component={TextField}
      fullWidth
    />
    <FieldTypeArray
      name="methodMetadata"
      label="Method Metadata"
      component={KeyValuePairType}
    />
    <FormControlLabel
      control={(
        <Field
          name="includeItem"
          component={BoolCheckbox}
        />
      )}
      label="Include Item"
    />
    <FormControlLabel
      control={(
        <Field
          name="closedFiles"
          component={BoolCheckbox}
        />
      )}
      label="Closed Files"
    />
  </>
);

function ShapeFileParamsForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeFileParamsForm);
