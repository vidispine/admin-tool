import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import { TextField, Select } from '../form';
import FieldTypeArray from '../ui/FieldTypeArray';

export const SimpleSearchFieldType = () => (
  <>
    <Field name="name" component={TextField} fullWidth />
    <Field name="value" component={TextField} fullWidth />
  </>
);
export const Sort = () => (
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

export const SimpleSearchOperatorType = () => (
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

export const SimpleSearchType = () => (
  <>
    <FieldTypeArray
      name="sort"
      component={Sort}
      label="sort"
      withHeader={false}
      arrayHeader
    />
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

function UserListSearchForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="userSearchDocument"
        label="UserSearchDocument"
        component={SimpleSearchType}
        fullWidth
      />
    </form>
  );
}

export default reduxForm()(UserListSearchForm);
