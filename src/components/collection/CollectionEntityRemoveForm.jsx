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
    <InputLabel htmlFor="type">Entity Type</InputLabel>
    <Field name="type" component={Select} validate={[required]}>
      <MenuItem value="item">Item</MenuItem>
      <MenuItem value="collection">Collection</MenuItem>
      <MenuItem value="library">Library</MenuItem>
    </Field>
  </FormControl>
);

function CollectionEntityRemoveForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field name="collectionId" label="Collection ID" component={TextField} fullWidth />
      <Field name="entityId" label="Entity ID" component={TextField} fullWidth />
      <FormSection name="queryParams" component={queryParams} />
    </form>
  );
}

export default reduxForm()(CollectionEntityRemoveForm);
