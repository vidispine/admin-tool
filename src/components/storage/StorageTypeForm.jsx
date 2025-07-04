import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field } from 'redux-form';

import StorageTypes from '../../const/StorageTypes';
import { Select } from '../form';

function StorageTypeForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormControl fullWidth>
        <InputLabel htmlFor="type">Type</InputLabel>
        <Field name="type" component={Select}>
          {StorageTypes.map((storageType) => (
            <MenuItem key={storageType} value={storageType}>
              {storageType}
            </MenuItem>
          ))}
        </Field>
      </FormControl>
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(StorageTypeForm);
