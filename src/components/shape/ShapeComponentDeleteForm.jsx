import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { reduxForm } from 'redux-form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import { TextField } from '../form';
import { required } from '../../utils/FieldValidation';

const queryParams = () => (
  <>
    <FormControlLabel
      control={(
        <Field
          name="keepFiles"
          component={BoolCheckbox}
        />
      )}
      label="keepFiles"
    />
  </>
);

function ShapeComponentDeleteForm({
  error,
  handleSubmit,
  itemId,
  shapeId,
  componentId,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!itemId && (
        <Field
          name="itemId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      {!shapeId && (
        <Field
          name="shapeId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      {!componentId && (
        <Field
          name="componentId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}

      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeComponentDeleteForm);
