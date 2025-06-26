import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../../form';
import Field from '../../ui/Field';
import FormSection from '../../ui/FormSection';

function ConnectionPoolType() {
  return (
    <>
      <Field name="minSize" component={TextField} type="number" fullWidth />
      <Field name="maxSize" component={TextField} type="number" fullWidth />
      <Field name="evictionInterval" component={TextField} type="number" fullWidth />
      <Field name="minIdleTime" component={TextField} type="number" fullWidth />
    </>
  );
}

function FtpPoolConfigurationType() {
  return <FormSection name="pool" component={ConnectionPoolType} />;
}

function FtpPoolForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="ftpPoolConfigurationDocument" component={FtpPoolConfigurationType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(FtpPoolForm);
