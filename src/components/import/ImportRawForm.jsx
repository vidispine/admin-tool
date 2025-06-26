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
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import { loadStorageOptions } from '../storage/StorageSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import ChipInput from '../ui/ChipInput';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';
import { StatefulAsyncSelect } from '../ui/Select';
import UploadButton from '../ui/UploadButton';

const queryParams = () => (
  <FormGroup>
    <Field
      name="tag"
      label="Tag"
      helperText="List of shape tags to use for transcoding"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
    <Field
      name="original"
      label="Original"
      helperText="Original shape tag will be reset to the shape created to this tag"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti={false}
    />
    <FormControl>
      <FormControlLabel
        control={<Field name="no-transcode" component={BoolCheckbox} />}
        label="No Transcoding"
      />
      <FormHelperText>Disable transcoding even if the tags parameter is set</FormHelperText>
    </FormControl>
    <FormControl>
      <FormControlLabel
        control={<Field name="createThumbnails" component={BoolCheckbox} />}
        label="Create Thumbnails"
      />
      <FormHelperText>Generate thumbnails as per defined by shape tag</FormHelperText>
    </FormControl>
    <Field
      name="thumbnailService"
      label="Thumbnail Service"
      helperText="Resource ID used to store thumbnails"
      component={TextField}
      fullWidth
    />
    <Field
      name="createPosters"
      label="Create Posters"
      helperText="A list of time codes to use for creating posters"
      component={ChipInput}
      simple
      fullWidth
    />
    <Field
      name="transferPriority"
      label="Transfer Priority"
      component={TextField}
      type="number"
      helperText="Between 1 and 1000 to indicate what priority the transfer should be given in relation to other transfers"
      fullWidth
    />
    <Field
      name="transferId"
      label="Transfer ID"
      helperText="ID to assign the transfer to be able to refer to it"
      component={TextField}
      validate={[required]}
      required
      fullWidth
    />
    <Field
      name="storageId"
      label="Storage ID"
      helperText="Where the file is to be stored"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <FormControl>
      <FormControlLabel
        control={<Field name="overrideFastStart" component={BoolCheckbox} />}
        label="Override Fast Start"
        fullWidth
      />
      <FormHelperText>
        Use transcoder’s estimate of the duration for allocating header space in MOV files and
        similar files
      </FormHelperText>
    </FormControl>
    <FormControl>
      <FormControlLabel
        control={<Field name="requireFastStart" component={BoolCheckbox} />}
        label="Require Fast Start"
        fullWidth
      />
      <FormHelperText>
        True - try to put the index tables (header) in front of the file. False - put header at end
        of file
      </FormHelperText>
    </FormControl>
    <Field
      name="fastStartLength"
      label="Fast Start Length"
      helperText="Estimated duration of the clip in seconds"
      component={TextField}
      fullWidth
    />
    <Field
      name="originalFilename"
      label="Original Filename"
      helperText="ID to assign the transfer to be able to refer to it"
      component={TextField}
      fullWidth
    />
    <Field name="notification" label="Notification" component={TextField} fullWidth />
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
    <Field
      name="settings"
      label="Settings"
      helperText="Import Settings"
      component={TextField}
      fullWidth
    />
    <Field
      name="resourceId"
      label="Resource ID"
      component={TextField}
      helperText="The resource to used for transcoding"
      fullWidth
    />
    <Field
      name="ids"
      label="IDs"
      helperText=" Comma-separated list of external ids to assign to the item"
      component={TextField}
      fullWidth
    />
    <Field
      name="importTag"
      label="Import Tag"
      helperText="A list of shape tags that the created shape will be associated with"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
    <Field
      name="extractCc"
      label="Extract CC"
      helperText="Extract closed captions as metadata"
      component={TextField}
      fullWidth
    />
    <FormControl>
      <FormControlLabel
        control={<Field name="ccFromVideo" component={BoolCheckbox} />}
        label="CC From Video"
      />
      <FormHelperText>
        Extract closed captions from video tracks as well as data tracks
      </FormHelperText>
    </FormControl>
    <Field
      name="resourceTag"
      label="Resource Tag"
      helperText="Criteria used to select transcoders for the job"
      component={TextField}
      fullWidth
    />
  </FormGroup>
);

function ImportRawForm({ error, handleSubmit }) {
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
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}
export default reduxForm()(ImportRawForm);
