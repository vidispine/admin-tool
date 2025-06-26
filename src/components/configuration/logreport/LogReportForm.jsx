import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../../form';
import Field from '../../ui/Field';
import FormSection from '../../ui/FormSection';

function LogReportConfigurationType() {
  return (
    <>
      <Field name="path" component={TextField} fullWidth />
      <Field name="expiryTime" component={TextField} fullWidth />
      <Field name="uploadUri" component={TextField} fullWidth />
      <Field name="certificate" component={TextField} fullWidth />
      <Field name="clientKey" component={TextField} fullWidth />
      <Field name="clientCertificate" component={TextField} fullWidth />
    </>
  );
}

function LogReportForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="logReportConfigurationDocument" component={LogReportConfigurationType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(LogReportForm);
