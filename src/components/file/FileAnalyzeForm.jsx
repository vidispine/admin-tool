import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import JobPriority from '../../const/JobPriority';
import { required } from '../../utils/FieldValidation';
import { TextField, Select } from '../form';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';

const queryParams = () => (
  <>
    <FormControl fullWidth>
      <InputLabel htmlFor="priority">Priority</InputLabel>
      <Field name="priority" component={Select}>
        {JobPriority.map((priority) => (
          <MenuItem key={priority} value={priority}>
            {priority}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
    <Field name="resourceId" component={TextField} fullWidth />
    <FieldTypeArray name="jobmetadata" label="Job Metadata" component={KeyValuePairType} />
    <Field name="notification" component={TextField} fullWidth />
    <FieldTypeArray
      name="notificationData"
      label="Notification Data"
      component={KeyValuePairType}
    />
  </>
);

function FileAnalyzeForm({ error, handleSubmit, fileId }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!fileId && <Field name="fileId" component={TextField} validate={[required]} fullWidth />}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(FileAnalyzeForm);
