import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField, Select } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import DynamicSelect from '../ui/DynamicSelect';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { SimpleMetadataType, KeyValuePairType } from '../ui/FormType';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';

export function MetadataFieldFloatType() {
  return (
    <>
      <Field
        name="minInclusive"
        label="minInclusive"
        component={TextField}
        type="number"
        fullWidth
      />
      <Field
        name="maxInclusive"
        label="maxInclusive"
        component={TextField}
        type="number"
        fullWidth
      />
    </>
  );
}

export function MetadataFieldIntegerType() {
  return (
    <>
      <Field
        name="minInclusive"
        label="minInclusive"
        component={TextField}
        type="number"
        fullWidth
      />
      <Field
        name="maxInclusive"
        label="maxInclusive"
        component={TextField}
        type="number"
        fullWidth
      />
    </>
  );
}

export function MetadataFieldLongType() {
  return (
    <>
      <Field
        name="minInclusive"
        label="minInclusive"
        component={TextField}
        type="number"
        fullWidth
      />
      <Field
        name="maxInclusive"
        label="maxInclusive"
        component={TextField}
        type="number"
        fullWidth
      />
    </>
  );
}

export function MetadataFieldStringType() {
  return (
    <>
      <Field name="minLength" label="minLength" component={TextField} type="number" fullWidth />
      <Field name="maxLength" label="maxLength" component={TextField} type="number" fullWidth />
      <Field name="pattern" label="pattern" component={TextField} fullWidth />
    </>
  );
}

export function MetadataSchemaElementType() {
  return (
    <>
      <FormControlLabel
        control={<Field name="reference" component={BoolCheckbox} />}
        label="Reference"
      />
      <Field name="min" label="min" component={TextField} type="number" fullWidth />
      <Field name="max" label="max" component={TextField} type="number" fullWidth />
      <Field name="name" label="name" component={TextField} fullWidth />
    </>
  );
}

export function MetadataFieldTypeType(props) {
  return (
    <Select {...props}>
      <MenuItem value="string">String</MenuItem>
      <MenuItem value="integer">Integer</MenuItem>
      <MenuItem value="float">Float</MenuItem>
      <MenuItem value="boolean">Boolean</MenuItem>
      <MenuItem value="date">Date</MenuItem>
      <MenuItem value="timeCode">Time Code</MenuItem>
      <MenuItem value="date-noindex">Date (No Index)</MenuItem>
      <MenuItem value="date-sortable">Date (Sortable)</MenuItem>
      <MenuItem value="float-noindex">Float (No Index)</MenuItem>
      <MenuItem value="float-sortable">Float (Sortable)</MenuItem>
      <MenuItem value="integer-noindex">Integer (No Index)</MenuItem>
      <MenuItem value="integer-sortable">Integer (Sortable)</MenuItem>
      <MenuItem value="long-noindex">Long (No Index)</MenuItem>
      <MenuItem value="string-sortable">String (Sortable)</MenuItem>
      <MenuItem value="string-exact">String (Exact)</MenuItem>
      <MenuItem value="string-exact-sortable">String (Exact Sortable)</MenuItem>
      <MenuItem value="string-noindex">String (No Index)</MenuItem>
      <MenuItem value="boolean-noindex">Boolean (No Index)</MenuItem>
      <MenuItem value="timeCode-noindex">Time Code (No Index)</MenuItem>
    </Select>
  );
}

export function MetadataFieldIndexType(props) {
  return (
    <Select {...props}>
      <MenuItem value="index">index</MenuItem>
      <MenuItem value="noindex">noindex</MenuItem>
      <MenuItem value="extend">extend</MenuItem>
    </Select>
  );
}

function MetadataFieldConstraintType() {
  return (
    <>
      <Field name="dataset" label="dataset" component={TextField} fullWidth />
      <Field name="levelProperty" label="levelProperty" component={TextField} fullWidth />
      <Field name="levelValue" label="levelValue" component={TextField} fullWidth />
      <Field name="value" label="value" component={TextField} fullWidth />
      <Field name="parent" label="parent" component={TextField} fullWidth />
      <Field name="validationGroup" label="validationGroup" component={TextField} fullWidth />
    </>
  );
}

export function MetadataFieldType() {
  return (
    <>
      <Field name="name" label="name" component={InitialDisabledTextField} fullWidth />
      <Field name="defaultValue" label="defaultValue" component={TextField} fullWidth />
      <FormControlLabel control={<Field name="system" component={BoolCheckbox} />} label="System" />
      <FormControlLabel
        control={<Field name="sortable" component={BoolCheckbox} />}
        label="Sortable"
      />
      <FormControlLabel
        control={<Field name="inheritance" component={BoolCheckbox} />}
        label="Inheritance"
      />
      <FormControlLabel
        control={<Field name="fullText" component={BoolCheckbox} />}
        label="Full Text"
      />
      <FormControl fullWidth>
        <InputLabel htmlFor="type">Type</InputLabel>
        <Field
          name="type"
          component={MetadataFieldTypeType}
          // validate={[required]}
          // required
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel htmlFor="index">Index</InputLabel>
        <Field name="index" component={MetadataFieldIndexType} />
      </FormControl>
      <FormSection name="constraint" label="constraint" component={MetadataFieldConstraintType} />
      <FormSection name="schema" label="schema" component={MetadataSchemaElementType} />
      <FormSection name="values" label="values" component={SimpleMetadataType} />
      <FieldTypeArray name="data" label="data" component={KeyValuePairType} />
    </>
  );
}

function MetadataFieldForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="metadataFieldDocument" component={MetadataFieldType} />
      <Field
        name="metadataFieldDocument"
        component={DynamicSelect}
        label="Restriction"
        fullWidth
        choices={{
          floatRestriction: (
            <FormSection
              name="metadataFieldDocument.floatRestriction"
              label="floatRestriction"
              component={MetadataFieldFloatType}
            />
          ),
          integerRestriction: (
            <FormSection
              name="metadataFieldDocument.integerRestriction"
              label="integerRestriction"
              component={MetadataFieldIntegerType}
            />
          ),
          longRestriction: (
            <FormSection
              name="metadataFieldDocument.longRestriction"
              label="longRestriction"
              component={MetadataFieldLongType}
            />
          ),
          stringRestriction: (
            <FormSection
              name="metadataFieldDocument.stringRestriction"
              label="stringRestriction"
              component={MetadataFieldStringType}
            />
          ),
        }}
      >
        <MenuItem value="floatRestriction">Float</MenuItem>
        <MenuItem value="integerRestriction">Integer</MenuItem>
        <MenuItem value="longRestriction">Long</MenuItem>
        <MenuItem value="stringRestriction">String</MenuItem>
      </Field>
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(MetadataFieldForm);
