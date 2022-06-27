import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormSection from '../ui/FormSection';
import { TextField } from '../form';
import Field from '../ui/Field';

const UserType = () => (
  <Field
    name="userName"
    component={TextField}
    fullWidth
  />
);

function UserUserNameForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="userDocument"
        component={UserType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(UserUserNameForm);
