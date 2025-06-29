import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../../form';
import BoolCheckbox from '../../ui/BoolCheckbox';
import Field from '../../ui/Field';
import FieldTypeArray from '../../ui/FieldTypeArray';
import FormSection from '../../ui/FormSection';

function IndexingFieldDefaultType() {
  return (
    <>
      <Field name="name" component={TextField} fullWidth />
      <FormControlLabel
        control={<Field name="fullText" component={BoolCheckbox} />}
        label="Full Text"
      />
    </>
  );
}

function IndexingConfigurationType() {
  return (
    <>
      <Field name="solrPath" component={TextField} fullWidth />
      <Field name="solrCollection" component={TextField} fullWidth />
      <Field name="zookeeperHost" component={TextField} fullWidth />
      <Field name="elasticsearchPath" component={TextField} fullWidth />
      <Field name="commitInterval" component={TextField} type="number" fullWidth />
      <Field name="softCommitInterval" component={TextField} type="number" fullWidth />
      <FormControlLabel
        control={<Field name="autoSoftCommit" component={BoolCheckbox} />}
        label="Auto Soft Commit"
      />
      <Field name="pingAttempts" component={TextField} type="number" fullWidth />
      <Field name="pingTimeout" component={TextField} type="number" fullWidth />
      <Field name="queryTimeout" component={TextField} type="number" fullWidth />
      <FieldTypeArray
        name="fieldDefault"
        label="fieldDefault"
        component={IndexingFieldDefaultType}
      />
    </>
  );
}

function IndexingForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="indexingConfigurationDocument" component={IndexingConfigurationType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(IndexingForm);
