import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField } from '../form';

import BoolCheckbox from '../ui/BoolCheckbox';
import FormSection from '../ui/FormSection';
import FieldTypeArray from '../ui/FieldTypeArray';
import { KeyValuePairType } from '../ui/FormType';

const queryParams = () => (
  <>
    <FormControlLabel
      control={(
        <Field
          name="allowReimport"
          component={BoolCheckbox}
        />
      )}
      label="Allow Reimport"
    />
    <Field
      name="storageId"
      label="Storage ID"
      component={TextField}
      fullWidth
    />
    <Field
      name="notification"
      label="Notification ID"
      component={TextField}
      fullWidth
    />
    <FieldTypeArray
      name="notificationData"
      label="Notification Metadata"
      component={KeyValuePairType}
    />
  </>
);

function ImportShapeAdvancedForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}
export default reduxForm()(ImportShapeAdvancedForm);
