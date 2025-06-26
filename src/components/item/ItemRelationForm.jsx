import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField, Select } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';

export function DirectionQueryParam() {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="direction">Direction</InputLabel>
      <Field name="direction" component={Select} fullWidth>
        <MenuItem value="U">Unidirectional</MenuItem>
        <MenuItem value="S">Source</MenuItem>
        <MenuItem value="T">Target</MenuItem>
      </Field>
    </FormControl>
  );
}

export function AllowDuplicateQueryParam() {
  return (
    <FormControlLabel
      control={<Field name="allowDuplicate" component={BoolCheckbox} />}
      label="Allow Duplicates"
    />
  );
}

export function RelationMetadataQueryParam() {
  return (
    <FieldTypeArray
      name="relationMetadata"
      component={KeyValuePairType}
      label="Relation Metadata"
      arrayHeader
      withHeader={false}
      dense
    />
  );
}

export function RelationItemId() {
  return <Field name="relationItemId" label="Relation Item ID" component={TextField} fullWidth />;
}

export const queryParams = () => (
  <>
    <DirectionQueryParam />
    <AllowDuplicateQueryParam />
    <RelationMetadataQueryParam />
  </>
);

function ItemRelationForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {error && <Typography color="error">{error}</Typography>}
      <RelationItemId />
      <FormSection name="queryParams" label="queryParams" component={queryParams} />
    </form>
  );
}

export default reduxForm()(ItemRelationForm);
