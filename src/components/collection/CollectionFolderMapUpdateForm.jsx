import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import { required } from '../../utils/FieldValidation';

const queryParams = () => (
  <>
    <Field
      name="name"
      label="Report Updated Folder Name"
      component={TextField}
      validate={[required]}
      fullWidth
    />
  </>
);

function CollectionFolderMapUpdateForm({
  error,
  handleSubmit,
  collectionId,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!collectionId && (
        <Field
          name="collectionId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(CollectionFolderMapUpdateForm);
