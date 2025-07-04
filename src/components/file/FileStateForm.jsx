import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field } from 'redux-form';

import FileStates from '../../const/FileStates';
import { Select } from '../form';

function FileStateForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormControl fullWidth>
        <InputLabel htmlFor="state">State</InputLabel>
        <Field name="state" component={Select}>
          {FileStates.map((fileState) => (
            <MenuItem key={fileState} value={fileState}>
              {fileState}
            </MenuItem>
          ))}
        </Field>
      </FormControl>
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(FileStateForm);
