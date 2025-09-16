import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { required } from '../../utils/FieldValidation';
import { TextField, Select } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';

const queryParams = () => (
  <>
    <FormControl fullWidth>
      <InputLabel htmlFor="type">Entity Type</InputLabel>
      <Field name="type" component={Select} validate={[required]}>
        <MenuItem value="item">Item</MenuItem>
        <MenuItem value="collection">Collection</MenuItem>
        <MenuItem value="library">Library</MenuItem>
      </Field>
    </FormControl>
    <Field name="reference" label="Reference" component={TextField} fullWidth />
    <FormControl fullWidth>
      <InputLabel htmlFor="mode">Mode</InputLabel>
      <Field name="mode" component={Select}>
        <MenuItem value="REPLACE">Replace</MenuItem>
        <MenuItem value="ADD">Add</MenuItem>
      </Field>
    </FormControl>
    <Field name="before" label="Before" component={TextField} fullWidth />
    <FormControlLabel
      control={<Field name="addItems" component={BoolCheckbox} />}
      label="Add Items"
    />
    <FieldTypeArray
      name="metadata"
      label="Relation Metadata"
      arrayHeader
      withHeader={false}
      dense
      component={KeyValuePairType}
    />
  </>
);

function CollectionEntityAddForm({ error, handleSubmit, collectionId, entityId, initialValues }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!collectionId && (
        <Field name="collectionId" label="Collection ID" component={TextField} fullWidth />
      )}
      {!entityId && <Field name="entityId" label="Entity ID" component={TextField} fullWidth />}
      <FormSection name="queryParams" component={queryParams} initialValues={initialValues} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(CollectionEntityAddForm);
