import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { required } from '../../utils/FieldValidation';
import { TextField } from '../form';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <Field
    name="name"
    label="Report Updated Folder Name"
    component={TextField}
    validate={[required]}
    fullWidth
  />
);

function CollectionFolderMapUpdateForm({ error, handleSubmit, collectionId }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!collectionId && (
        <Field name="collectionId" component={TextField} validate={[required]} fullWidth />
      )}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(CollectionFolderMapUpdateForm);
