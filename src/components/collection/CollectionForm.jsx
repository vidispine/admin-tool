import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField, Select } from '../form';
import { MetadataType } from '../metadata/MetadataForm';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';

function CollectionContentType() {
  return (
    <>
      <Field name="id" label="Entity ID" component={TextField} fullWidth />
      <FormControl fullWidth>
        <InputLabel htmlFor="type">Entity Type</InputLabel>
        <Field name="type" component={Select}>
          <MenuItem value="item">Item</MenuItem>
          <MenuItem value="library">Library</MenuItem>
          <MenuItem value="collection">Collection</MenuItem>
        </Field>
      </FormControl>
    </>
  );
}

function CollectionType() {
  return (
    <>
      <FormSection name="metadata" label="metadata" component={MetadataType} />
      <FieldTypeArray name="content" label="content" component={CollectionContentType} />
    </>
  );
}

const queryParams = () => (
  <>
    <Field name="name" component={TextField} fullWidth />
    <Field name="externalId" component={TextField} fullWidth />
    <Field name="settings" component={TextField} fullWidth />
  </>
);

function DocumentForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="collectionDocument" component={CollectionType} />
      <button type="submit" hidden />
    </form>
  );
}

export const CollectionDocumentForm = reduxForm()(DocumentForm);

function QueryParamsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export const CollectionQueryParamsForm = reduxForm()(QueryParamsForm);

function CollectionForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" label="queryParams" component={queryParams} />
      <FormSection
        name="collectionDocument"
        label="collectionDocument"
        component={CollectionType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(CollectionForm);
