import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { required } from '../../utils/FieldValidation';
import { TextField, Select } from '../form';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <FormControl fullWidth>
    <InputLabel htmlFor="safe">Safe</InputLabel>
    <Field name="safe" component={Select}>
      <MenuItem value="true">true</MenuItem>
      <MenuItem value="false">false</MenuItem>
    </Field>
  </FormControl>
);

function StorageRemoveForm({ error, handleSubmit, storageId }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!storageId && (
        <Field name="storageId" component={TextField} validate={[required]} fullWidth />
      )}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(StorageRemoveForm);
