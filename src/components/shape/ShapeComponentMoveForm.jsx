import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { required } from '../../utils/FieldValidation';
import { TextField } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <>
    <Field name="index" label="Track Index" component={TextField} type="number" fullWidth />
    <FormControlLabel
      control={<Field name="updateMetadata" component={BoolCheckbox} />}
      label="updateMetadata"
    />
  </>
);

function ShapeComponentMoveForm({ error, handleSubmit, itemId, shapeId, componentId }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!itemId && <Field name="itemId" component={TextField} validate={[required]} fullWidth />}
      {!shapeId && <Field name="shapeId" component={TextField} validate={[required]} fullWidth />}
      {!componentId && (
        <Field name="componentId" component={TextField} validate={[required]} fullWidth />
      )}
      <Field name="targetItemId" component={TextField} validate={[required]} fullWidth />
      <Field name="targetShapeId" component={TextField} validate={[required]} fullWidth />
      <Field name="targetComponentId" component={TextField} validate={[required]} fullWidth />
      <FormSection name="queryParams" label="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeComponentMoveForm);
