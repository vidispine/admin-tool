import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../../form';
import BoolCheckbox from '../../ui/BoolCheckbox';
import Field from '../../ui/Field';
import FormSection from '../../ui/FormSection';
import UrlField from '../../ui/UrlField';

const changeLog = () => (
  <>
    <Field name="age" component={TextField} type="number" fullWidth />
    <Field name="forceAge" component={TextField} type="number" fullWidth />
  </>
);

const auditTrail = () => (
  <>
    <Field name="age" component={TextField} type="number" fullWidth />
    <Field name="uri" label="uri" component={UrlField} fullWidth />
    <FormControlLabel
      label="Compress"
      control={<Field name="compress" component={BoolCheckbox} />}
    />
    <Field name="batch" component={TextField} type="number" fullWidth />
    <FormControlLabel label="Body" control={<Field name="body" component={BoolCheckbox} />} />
  </>
);

const job = () => (
  <>
    <Field name="age" component={TextField} type="number" fullWidth />
    <Field name="uri" label="uri" component={UrlField} fullWidth />
    <FormControlLabel
      label="Compress"
      control={<Field name="compress" component={BoolCheckbox} />}
    />
  </>
);
const transferLog = () => (
  <>
    <Field name="age" component={TextField} type="number" fullWidth />
    <Field name="forceAge" component={TextField} type="number" fullWidth />
    <Field name="uri" label="uri" component={UrlField} fullWidth />
    <FormControlLabel
      label="Compress"
      control={<Field name="compress" component={BoolCheckbox} />}
    />
    <Field name="batch" component={TextField} type="number" fullWidth />
  </>
);

function DatabasePurgingConfigurationType() {
  return (
    <>
      <FormSection name="changeLog" label="Change Log" component={changeLog} />
      <FormSection name="auditTrail" label="Audit Trail" component={auditTrail} />
      <FormSection name="job" label="Job" component={job} />
      <FormSection name="transferLog" label="Transfer Log" component={transferLog} />
    </>
  );
}

function DatabasePurgingForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="databasePurgingConfigurationDocument"
        component={DatabasePurgingConfigurationType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(DatabasePurgingForm);
