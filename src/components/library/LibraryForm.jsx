import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';

function ItemType() {
  return <Field name="id" label="Item ID" component={TextField} fullWidth />;
}

export function ItemListDocument() {
  return (
    <FieldTypeArray name="item" label="item" component={ItemType} withHeader={false} arrayHeader />
  );
}

const queryParams = () => <Field name="externalId" component={TextField} fullWidth />;

function LibraryForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" label="queryParams" component={queryParams} />
      <FormSection name="itemListDocument" label="itemListDocument " component={ItemListDocument} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(LibraryForm);
