import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field } from 'redux-form';

import { required } from '../../utils/FieldValidation';
import { TextField, Select } from '../form';
import FormSection from '../ui/FormSection';

const COMPONENT_TYPES = ['container', 'audio', 'video', 'binary'];

const queryParams = () => (
  <>
    <FormControl fullWidth>
      <InputLabel htmlFor="type">Type</InputLabel>
      <Field name="type" component={Select}>
        {COMPONENT_TYPES.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
    <Field name="index" label="Track Index" component={TextField} type="number" fullWidth />
  </>
);

function ShapeCreateComponentPlaceholderForm({ error, handleSubmit, itemId, shapeId }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {itemId === undefined ? (
        <Field
          name="itemId"
          label="Item ID"
          component={TextField}
          validate={[required]}
          required
          fullWidth
        />
      ) : null}
      {shapeId === undefined ? (
        <Field
          name="shapeId"
          label="Shape ID"
          component={TextField}
          validate={[required]}
          required
          fullWidth
        />
      ) : null}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}
export default reduxForm()(ShapeCreateComponentPlaceholderForm);
