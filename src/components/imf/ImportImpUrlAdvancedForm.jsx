import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';

const queryParams = () => (
  <>
    <FormControlLabel
      control={<Field name="overrideFastStart" component={BoolCheckbox} />}
      label="Override FastStart"
    />
    <FormControlLabel
      control={<Field name="requireFastStart" component={BoolCheckbox} />}
      label="Require FastStart"
    />
    <FormControlLabel control={<Field name="growing" component={BoolCheckbox} />} label="Growing" />
    <FieldTypeArray name="jobmetadata" label="Job Metadata" dense component={KeyValuePairType} />
    <Field name="original" component={TextField} label="Reset Original" fullWidth />
    <Field name="thumbnailService" component={TextField} fullWidth />
    <Field name="createPosters" component={TextField} fullWidth />
    <Field name="fastStartLength" component={TextField} fullWidth />
    <Field name="storageId" component={TextField} fullWidth />
    <Field name="xmpfile" component={TextField} fullWidth />
    <Field name="sidecar" component={TextField} fullWidth />
    <Field name="settings" component={TextField} fullWidth />
    <Field name="importTag" component={TextField} fullWidth />
    <Field name="resourceId" component={TextField} fullWidth />
    <Field name="notification" component={TextField} fullWidth />
    <FieldTypeArray
      name="notificationData"
      label="Notification Metadata"
      component={KeyValuePairType}
    />
  </>
);

function ImportImpAdvancedForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ImportImpAdvancedForm);
