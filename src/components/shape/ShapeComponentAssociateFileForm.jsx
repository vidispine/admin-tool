import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { required } from '../../utils/FieldValidation';
import { TextField } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <FormControlLabel
    control={<Field name="allowReimport" component={BoolCheckbox} />}
    label="Allow Reimport"
  />
);

function ShapeComponentAssociateFileForm({
  error,
  handleSubmit,
  itemId,
  shapeId,
  componentId,
  fileId,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!itemId && <Field name="itemId" component={TextField} validate={[required]} fullWidth />}
      {!shapeId && <Field name="shapeId" component={TextField} validate={[required]} fullWidth />}
      {!componentId && (
        <Field name="componentId" component={TextField} validate={[required]} fullWidth />
      )}
      {!fileId && <Field name="fileId" component={TextField} validate={[required]} fullWidth />}
      <FormSection name="queryParams" label="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeComponentAssociateFileForm);
