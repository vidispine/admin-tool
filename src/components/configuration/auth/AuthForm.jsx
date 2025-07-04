import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../../form';
import Field from '../../ui/Field';
import FormSection from '../../ui/FormSection';

function OAuth2ConfigurationType() {
  return (
    <>
      <Field name="federationMetadataURI" component={TextField} fullWidth />
      <Field name="federationMetadataInterval" component={TextField} type="number" fullWidth />
      <Field name="expectedAudience" component={TextField} fullWidth />
      <Field name="validationEndpoint" component={TextField} fullWidth />
      <Field name="tokenUser" component={TextField} fullWidth />
      <Field name="x509Certificate" component={TextField} fullWidth multiline />
    </>
  );
}

function AuthForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="oAuth2ConfigurationDocument" component={OAuth2ConfigurationType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(AuthForm);
