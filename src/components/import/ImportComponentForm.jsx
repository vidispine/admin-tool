import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

import Field from '../ui/Field';
import { TextField, Select } from '../form';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import { loadStorageOptions } from '../storage/StorageSelect';
import { StatefulAsyncSelect } from '../ui/Select';
import { required } from '../../utils/FieldValidation';
import FormSection from '../ui/FormSection';
import BoolCheckbox from '../ui/BoolCheckbox';
import ChipInput from '../ui/ChipInput';
import FieldTypeArray from '../ui/FieldTypeArray';
import { KeyValuePairType } from '../ui/FormType';
import JobPriority from '../../const/JobPriority';

const queryParams = () => (
  <FormGroup>
    <Field
      name="uri"
      label="URI"
      component={TextField}
      helperText="A URI to the file that will be imported. Make sure to percent encode the URI. Must be specified unless fileId is specified"
      fullWidth
    />
    <Field
      name="fileId"
      label="File ID"
      component={TextField}
      helperText="The id of the file that contains the essence. Must be specified unless uri is specified"
      fullWidth
    />
    <FormControl>
      <FormControlLabel
        control={<Field name="allowReimport" component={BoolCheckbox} />}
        label="Allow Reimport"
      />
      <FormHelperText>
        True - import the file to this shape even if the file is already
        importing or is already part of another item. False - Reject the request
        if the file with the given id has already been imported or is currently
        importing
      </FormHelperText>
    </FormControl>
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
      <FormHelperText>
        Disable transcoding even if the tags parameter is set
      </FormHelperText>
    </FormControl>
    <FormControl>
      <FormControlLabel
        control={<Field name="createThumbnails" component={BoolCheckbox} />}
        label="Create Thumbnails"
      />
      <FormHelperText>
        Generate thumbnails as per defined by shape tag
      </FormHelperText>
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
      name="storageId"
      label="Storage ID"
      helperText="Where the file is to be stored"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <Field
      name="resourceId"
      label="Resource ID"
      component={TextField}
      helperText="The resource to used for transcoding"
      fullWidth
    />
    <FormControl>
      <FormControlLabel
        control={<Field name="overrideFastStart" component={BoolCheckbox} />}
        label="Override Fast Start"
        fullWidth
      />
      <FormHelperText>
        Use transcoder’s estimate of the duration for allocating header space in
        MOV files and similar files
      </FormHelperText>
    </FormControl>
    <FormControl>
      <FormControlLabel
        control={<Field name="requireFastStart" component={BoolCheckbox} />}
        label="Require Fast Start"
        fullWidth
      />
      <FormHelperText>
        True - try to put the index tables (header) in front of the file.
        False - put header at end of file
      </FormHelperText>
    </FormControl>
    <Field
      name="fastStartLength"
      label="Fast Start Length"
      helperText="Estimated duration of the clip in seconds"
      component={TextField}
      fullWidth
    />
    <FormControl>
      <FormControlLabel
        control={<Field name="growing" component={BoolCheckbox} />}
        label="Growing"
      />
      <FormHelperText>
        The input file is still written to, so enables growing file support
      </FormHelperText>
    </FormControl>
    <Field
      name="notification"
      label="Notification"
      component={TextField}
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
    <Field
      name="settings"
      label="Settings"
      helperText="Import Settings"
      component={TextField}
      fullWidth
    />
    <Field
      name="index"
      label="Index"
      component={TextField}
      type="number"
      helperText="The component index (track) of new component"
      fullWidth
    />
    <Field
      name="shapeId"
      label="Shape ID"
      helperText="Which shape receives content"
      component={TextField}
      fullWidth
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
  </FormGroup>
);

function ImportComponentForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="itemId"
        label="Item Id"
        component={TextField}
        validate={[required]}
        required
        fullWidth
      />
      <FormControl required fullWidth>
        <InputLabel htmlFor="component">Component</InputLabel>
        <Field name="component" component={Select} validate={[required]}>
          <MenuItem value="container">Container</MenuItem>
          <MenuItem value="video">Video</MenuItem>
          <MenuItem value="audio">Audio</MenuItem>
          <MenuItem value="binary">Binary</MenuItem>
        </Field>
      </FormControl>
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}
export default reduxForm()(ImportComponentForm);
