import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, Select } from '../form';
import FormSection from '../ui/FormSection';

import Field from '../ui/Field';
import { required } from '../../utils/FieldValidation';
import BoolCheckbox from '../ui/BoolCheckbox';
import JobPriority from '../../const/JobPriority';
import { KeyValuePairType } from '../ui/FormType';
import FieldTypeArray from '../ui/FieldTypeArray';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadStorageOptions } from '../storage/StorageSelect';
import UploadButton from '../ui/UploadButton';

const queryParams = () => (
  <>
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
    <FormControlLabel
      control={<Field name="componentImport" component={BoolCheckbox} />}
      label="Component Import"
      helperText="Import sidecar file as a subtitle component."
    />
    <Field
      name="storageId"
      label="Storage ID"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageOptions}
      cacheOptions
      isClearable
      fullWidth
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
  </>
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

      {!itemId && (
        <Field
          name="itemId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      <FormSection
        name="queryParams"
        label="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ImportSidecarRawForm);
