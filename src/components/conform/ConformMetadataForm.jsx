import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { MetadataType } from '../metadata/MetadataForm';
import FormSection from '../ui/FormSection';

function ConformMetadataForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="conformRequestDocument.metadata" component={MetadataType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ConformMetadataForm);
