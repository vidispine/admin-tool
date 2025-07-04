import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

function UserType() {
  return <Field name="userName" component={TextField} fullWidth />;
}

function UserUserNameForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="userDocument" component={UserType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(UserUserNameForm);
