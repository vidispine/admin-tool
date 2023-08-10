import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormSection from '../../ui/FormSection';
import Field from '../../ui/Field';
import BoolCheckbox from '../../ui/BoolCheckbox';
import UrlField from '../../ui/UrlField';

const BulkyMetadataConfigurationType = () => (
  <>
    <Field
      name="uri"
      label="uri"
      component={UrlField}
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="storageDisabled"
          component={BoolCheckbox}
        />
      )}
      label="Storage Disabled"
    />
  </>
);

function BulkyMetadataForm({
  error,
  handleSubmit,
}) {
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
