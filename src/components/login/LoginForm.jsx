import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm, FormSection } from 'redux-form';

import { required, isUrl } from '../../utils/FieldValidation';
import { TextField } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';

const hasTokenOrValue = (value, { secretKey, headers = {} }) =>
  headers.token || headers.bearer || secretKey ? undefined : required(value);

const headers = () => (
  <>
    <Field
      name="username"
      label="Username"
      component={TextField}
      fullWidth
      validate={[hasTokenOrValue]}
      variant="outlined"
      margin="dense"
      size="small"
    />
    <Field
      name="password"
      label="Password"
      type="password"
      component={TextField}
      fullWidth
      validate={[hasTokenOrValue]}
      variant="outlined"
      margin="dense"
    />
  </>
);

const queryParams = () => (
  <FormControlLabel
    control={<Field name="autoRefresh" component={BoolCheckbox} />}
    label="Remember Me"
  />
);

function LoginForm({ error, handleSubmit, onTestUrl, useDevProxy }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="baseUrl"
        label="VidiCore Server"
        component={TextField}
        required
        onBlur={(event, baseUrl) => onTestUrl(baseUrl)}
        fullWidth
        autoFocus
        validate={[required, isUrl]}
        variant="outlined"
        margin="dense"
        useStartCase={false}
        disabled={useDevProxy}
      />
      <FormSection name="headers" component={headers} />
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(LoginForm);
