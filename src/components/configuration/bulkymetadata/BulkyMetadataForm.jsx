import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import BoolCheckbox from '../../ui/BoolCheckbox';
import Field from '../../ui/Field';
import FormSection from '../../ui/FormSection';
import UrlField from '../../ui/UrlField';

function BulkyMetadataConfigurationType() {
  return (
    <>
      <Field name="uri" label="uri" component={UrlField} fullWidth />
      <FormControlLabel
        control={<Field name="storageDisabled" component={BoolCheckbox} />}
        label="Storage Disabled"
      />
    </>
  );
}

function BulkyMetadataForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="bulkyMetadataConfigurationDocument"
        component={BulkyMetadataConfigurationType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(BulkyMetadataForm);
