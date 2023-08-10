import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import BoolCheckbox from '../ui/BoolCheckbox';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';

const queryParams = () => (
  <FormControlLabel
    control={(
      <Field
        name="includeDocument"
        component={BoolCheckbox}
      />
      )}
    label="Include Document"
  />
);

function AnalyzePresetListParamsForm({
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

export default reduxForm()(AnalyzePresetListParamsForm);
