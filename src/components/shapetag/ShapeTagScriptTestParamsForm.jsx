import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { required } from '../../utils/FieldValidation';
import { TextField } from '../form';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <Field
    name="job"
    component={TextField}
    fullWidth
    label="Job"
    helperText="The id of a job to retrieve job metadata from."
  />
);

function ShapeTagScriptTestParamsForm({ error, handleSubmit, tagName, itemId, shapeId }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {tagName === undefined ? (
        <Field
          name="tagName"
          label="Tag Name"
          component={TextField}
          fullWidth
          required
          validate={[required]}
        />
      ) : null}
      {itemId === undefined ? (
        <Field
          name="itemId"
          label="Item ID"
          component={TextField}
          fullWidth
          required
          validate={[required]}
        />
      ) : null}
      {shapeId === undefined ? (
        <Field
          name="shapeId"
          label="Shape ID"
          component={TextField}
          fullWidth
          required
          validate={[required]}
        />
      ) : null}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeTagScriptTestParamsForm);
