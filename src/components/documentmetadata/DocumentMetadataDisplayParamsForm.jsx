import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <>
    <Field name="interval" component={TextField} fullWidth />
    <Field name="field" component={TextField} fullWidth />
    <Field name="group" component={TextField} fullWidth />
    <Field name="track" component={TextField} fullWidth />
    <Field name="language" component={TextField} fullWidth />
    <Field name="samplerate" component={TextField} fullWidth />
    <Field name="include" component={TextField} fullWidth />
    <FormControlLabel
      control={<Field name="conflict" component={BoolCheckbox} />}
      label="Conflict"
    />
    <FormControlLabel
      control={<Field name="defaultValue" component={BoolCheckbox} />}
      label="Default Value"
    />
  </>
);

function DocumentMetadataDisplayParamsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
    </form>
  );
}

export default reduxForm()(DocumentMetadataDisplayParamsForm);
