import Typography from '@material-ui/core/Typography';
import { reduxForm, Field, FormSection } from 'redux-form';

import { TextField } from '../form';

export function StorageGroupDocumentForm() {
  return <Field name="name" component={TextField} label="Group Name" fullWidth />;
}

function StorageGroupForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="storageGroupDocument" component={StorageGroupDocumentForm} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(StorageGroupForm);
