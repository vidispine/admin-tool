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
    <Field name="reference" label="Reference" component={TextField} fullWidth />
  </FormControl>
);

function CollectionEntityRemoveForm({ error, collectionId, entityId, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!collectionId && (
        <Field
          name="collectionId"
          label="Collection ID"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      {!entityId && (
        <Field
          name="entityId"
          label="Entity ID"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      <FormSection name="queryParams" component={queryParams} />
    </form>
  );
}

export default reduxForm()(CollectionEntityRemoveForm);
