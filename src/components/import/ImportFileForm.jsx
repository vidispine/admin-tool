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
import BoolCheckbox from '../ui/BoolCheckbox';
import ChipInput from '../ui/ChipInput';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';
import { StatefulAsyncSelect } from '../ui/Select';

const queryParams = () => (
  <FormGroup>
    <Field
      name="filename"
      label="Filename"
      helperText="original filename of the file"
      component={TextField}
      fullWidth
    />
    <FormControl>
      <FormControlLabel
        control={<Field name="allowReimport" component={BoolCheckbox} />}
        label="Allow Reimport"
      />
      <FormHelperText>
        True - import the file to this shape even if the file is already importing or is already
        part of another item. False - Reject the request if the file with the given id has already
        been imported or is currently importing
      </FormHelperText>
    </FormControl>
    <Field
      name="id"
      label="ID"
      helperText=" Comma-separated list of external ids to assign to the item"
      component={TextField}
      fullWidth
    />
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
      creatable
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
      creatable
    />
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
    <FormControl>
      <FormControlLabel
        control={<Field name="no-transcode" component={BoolCheckbox} />}
        label="No Transcoding"
      />
      <FormHelperText>Disable transcoding even if the tags parameter is set</FormHelperText>
    </FormControl>
    <Field
      name="resourceId"
      label="Resource ID"
      component={TextField}
      helperText="The resource to used for transcoding"
      fullWidth
    />
    <Field
      name="frame-rate"
      label="Frame Rate"
      helperText="The frame rate of the image sequence"
      component={TextField}
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
        If true try to put the index tables (header) in front of the file, if false put header at
        end of file
      </FormHelperText>
    </FormControl>
    <Field
      name="fastStartLength"
      label="Fast Start Length"
      helperText="Estimated duration of the clip in seconds"
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
      name="importTag"
      label="Import Tag"
      helperText="List of shape tags that the created shape will be associated with"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
      creatable
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

function ImportFileForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="fileId"
        label="File ID"
        component={TextField}
        validate={[required]}
        required
        fullWidth
      />
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ImportFileForm);
