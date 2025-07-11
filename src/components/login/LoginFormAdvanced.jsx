import Typography from '@material-ui/core/Typography';
import { reduxForm, FormSection } from 'redux-form';

import { TextField } from '../form';
import Field from '../ui/Field';

const headers = () => (
  <>
    <Field
      name="token"
      label="Token"
      component={TextField}
      fullWidth
      variant="outlined"
      margin="dense"
    />
    <Field
      name="bearer"
      label="JWT Bearer"
      component={TextField}
      fullWidth
      variant="outlined"
      margin="dense"
    />
    <Field
      name="runAs"
      label="Login As User"
      component={TextField}
      fullWidth
      variant="outlined"
      margin="dense"
    />
  </>
);

const queryParams = () => (
  <Field
    name="seconds"
    label="Timeout "
    component={TextField}
    helperText="Seconds"
    fullWidth
    variant="outlined"
    margin="dense"
  />
);

function LoginFormAdvanced({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="headers" component={headers} />
      <FormSection name="queryParams" component={queryParams} />
      <Field
        name="accessKey"
        label="Access Key"
        component={TextField}
        fullWidth
        variant="outlined"
        margin="dense"
      />
      <Field
        name="secretKey"
        label="Secret Key"
        component={TextField}
        fullWidth
        variant="outlined"
        margin="dense"
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(LoginFormAdvanced);
