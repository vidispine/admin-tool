import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../../form';
import FieldArray from '../../ui/FieldArray';
import FormSection from '../../ui/FormSection';

function PathAliasConfigurationType() {
  return <FieldArray name="alias" label="Alias" component={TextField} fullWidth />;
}

function PathAliasForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="pathAliasConfigurationDocument" component={PathAliasConfigurationType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(PathAliasForm);
