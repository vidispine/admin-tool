import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';
import Field from '../ui/Field';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';
import FormSection from '../ui/FormSection';
import CodeField from '../ui/CodeField';

const queryParams = () => (
  <Field
    name="pauseFrame"
    label="Pause Frame"
    component={TextField}
    fullWidth
    type="number"
    helperText="When a rendering job is started, this parameter determines which frame the job will pause at. The job will resume when the sequence is updated"
  />
);

const headers = () => (
  <Field name="contentType" label="Content Type" component={TextField} fullWidth />
);

const ItemSequenceForm = ({
  error,
  handleSubmit,
  codeFieldMode = 'application/xml',
}) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <Field
      name="itemId"
      label="Item ID"
      component={InitialDisabledTextField}
      fullWidth
    />
    <Field
      name="format"
      label="Format"
      component={InitialDisabledTextField}
      fullWidth
    />
    <FormSection name="headers" component={headers} />
    <FormSection name="queryParams" component={queryParams} />
    <Field
      name="body"
      label="body"
      component={CodeField}
      options={{
        theme: 'material',
        mode: codeFieldMode,
        lineWrapping: true,
        lineNumbers: true,
      }}
    />
    <button type="submit" hidden />
  </form>
);

export default reduxForm()(ItemSequenceForm);
