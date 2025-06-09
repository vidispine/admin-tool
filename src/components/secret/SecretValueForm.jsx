import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';
import Field from '../ui/Field';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';

const SecretValueForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <Field
      name="alias"
      label="Alias"
      component={InitialDisabledTextField}
      fullWidth
    />
    <Field
      name="key"
      label="Key"
      component={InitialDisabledTextField}
      fullWidth
    />
    <Field name="value" label="Value" component={TextField} fullWidth />
    <button type="submit" hidden />
  </form>
);

export default reduxForm()(SecretValueForm);
