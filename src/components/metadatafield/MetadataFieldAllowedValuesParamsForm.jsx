import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';

import { loadMetadataFieldOptions } from './MetadataFieldSelect';

function MetadataFieldValueConstraintType() {
  return (
    <>
      <Field
        name="field"
        label="Metadata Field"
        component={StatefulAsyncSelect}
        loadOptions={loadMetadataFieldOptions}
        cacheOptions
        isClearable
        fullWidth
        creatable
      />
      <Field name="value" component={TextField} fullWidth />
      <Field name="id" component={TextField} fullWidth />
    </>
  );
}

function MetadataFieldValueConstraintListType() {
  return (
    <FieldTypeArray name="constraint" component={MetadataFieldValueConstraintType} fullWidth />
  );
}

function MetadataFieldAllowedValuesParamsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="metadataFieldValueConstraintListDocument"
        component={MetadataFieldValueConstraintListType}
      />
    </form>
  );
}

export default reduxForm()(MetadataFieldAllowedValuesParamsForm);
