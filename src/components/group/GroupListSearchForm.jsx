import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField, Select } from '../form';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';

export function SimpleSearchFieldType() {
  return (
    <>
      <Field name="name" component={TextField} fullWidth />
      <Field name="value" component={TextField} fullWidth />
    </>
  );
}
export function Sort() {
  return (
    <>
      <Field name="field" component={TextField} fullWidth />
      <FormControl fullWidth>
        <InputLabel htmlFor="order">order</InputLabel>
        <Field name="order" component={Select}>
          <MenuItem value="ascending">Ascending</MenuItem>
          <MenuItem value="descending">Descending</MenuItem>
        </Field>
      </FormControl>
    </>
  );
}

export function SimpleSearchOperatorType() {
  return (
    <>
      <FieldTypeArray
        name="field"
        component={SimpleSearchFieldType}
        label="field"
        withHeader={false}
        arrayHeader
      />
      <FormControl fullWidth>
        <InputLabel htmlFor="operation">Operation</InputLabel>
        <Field name="operation" component={Select}>
          <MenuItem value="AND">AND</MenuItem>
          <MenuItem value="OR">OR</MenuItem>
          <MenuItem value="NOT">NOT</MenuItem>
        </Field>
      </FormControl>
    </>
  );
}

export function SimpleSearchType() {
  return (
    <>
      <FieldTypeArray name="sort" component={Sort} label="sort" withHeader={false} arrayHeader />
      <FieldTypeArray
        name="field"
        component={SimpleSearchFieldType}
        label="field"
        withHeader={false}
        arrayHeader
      />
      <FormSection
        name="operator"
        label="operator"
        component={SimpleSearchOperatorType}
        fullWidth
      />
    </>
  );
}

function GroupListSearchForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="groupSearchDocument"
        label="GroupSearchDocument"
        component={SimpleSearchType}
        fullWidth
      />
    </form>
  );
}

export default reduxForm()(GroupListSearchForm);
