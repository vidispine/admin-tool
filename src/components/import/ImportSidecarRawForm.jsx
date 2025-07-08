import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import JobPriority from '../../const/JobPriority';
import { required } from '../../utils/FieldValidation';
import { TextField, Select } from '../form';
import { loadStorageOptions } from '../storage/StorageSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';
import { StatefulAsyncSelect } from '../ui/Select';
import UploadButton from '../ui/UploadButton';

const queryParams = () => (
  <FormGroup>
    <Field
      name="storageId"
      label="Storage ID"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageOptions}
      cacheOptions
      isClearable
      fullWidth
      creatable
    />
    <Field
      name="fileExtension"
      label="File Extension"
      component={TextField}
      helperText="Used to identify the sidecar media type. Example: srt"
      required
      validate={[required]}
      fullWidth
    />
    <Field
      name="startTimeCode"
      label="Start TimeCode"
      component={TextField}
      helperText="Expected start time code of the content"
      fullWidth
    />
    <FormControl>
      <FormControlLabel
        control={<Field name="componentImport" component={BoolCheckbox} />}
        label="Component Import"
      />
      <FormHelperText>Import sidecar file as a subtitle component</FormHelperText>
    </FormControl>
    <Field
      name="notification"
      label="Notification ID"
      component={TextField}
      helperText="The placeholder job notification to use for this job"
      fullWidth
    />
    <FieldTypeArray
      name="notificationData"
      component={KeyValuePairType}
      label="Notification Metadata"
      arrayHeader
      withHeader={false}
      dense
    />
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
    <FieldTypeArray
      name="jobmetadata"
      component={KeyValuePairType}
      label="Job Metadata"
      withHeader={false}
      arrayHeader
      dense
    />
    <FormControl>
      <FormControlLabel
        control={<Field name="holdJob" component={BoolCheckbox} />}
        label="Hold Job"
        fullWidth
      />
      <FormHelperText>Created job in a HOLD state</FormHelperText>
    </FormControl>
  </FormGroup>
);

function ImportSidecarRawForm({ error, handleSubmit, itemId }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="upload"
        label="Choose File"
        component={UploadButton}
        validate={[required]}
        fullWidth
      />

      {!itemId && <Field name="itemId" component={TextField} validate={[required]} fullWidth />}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ImportSidecarRawForm);
