import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';

function ExternalIdentifierNamespaceType() {
  return (
    <>
      <Field name="name" component={InitialDisabledTextField} fullWidth />
      <Field name="pattern" component={TextField} fullWidth />
      <Field name="priority" component={TextField} type="number" fullWidth />
    </>
  );
}

function ExternalIdNamespaceForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="externalIdentifierNamespaceDocument"
        component={ExternalIdentifierNamespaceType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ExternalIdNamespaceForm);
