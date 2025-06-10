import Typography from '@material-ui/core/Typography';
import { reduxForm, Field } from 'redux-form';

import { TextField } from '../form';

export function StorageGroupDocumentForm() {
  return <Field name="name" component={TextField} label="Group Name" fullWidth />;
}

function StorageGroupStorageForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field name="storageId" component={TextField} label="Storage ID" fullWidth />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(StorageGroupStorageForm);
