/* eslint-disable max-len */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import { TextField, Select } from '../form';

import Field from '../ui/Field';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import { loadStorageOptions } from '../storage/StorageSelect';
import { StatefulAsyncSelect } from '../ui/Select';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import JobPriority from '../../const/JobPriority';
import { KeyValuePairType } from '../ui/FormType';
import BoolCheckbox from '../ui/BoolCheckbox';
import ChipInput from '../ui/ChipInput';

const queryParams = () => (
  <FormGroup>
    <Field
      name="uri"
      label="URI"
      component={TextField}
      helperText="Make Sure To Percent Encode"
      fullWidth
    />
    <Field
      name="tag"
      label="Shape Tag"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
    <Field
      name="original"
      label="Original Shape Tag"
      component={TextField}
      helperText="Reset original to this tag"
      fullWidth
    />
    <FormControlLabel
      control={<Field name="no-transcode" component={BoolCheckbox} fullWidth />}
      label="No Transcode"
    />
    <FormControlLabel
      control={<Field name="no-mediacheck" component={BoolCheckbox} />}
      label="No Media Check"
      fullWidth
    />
    <Field
      name="frame-rate"
      label="Frame Rate"
      helperText="The frame rate of the image sequence"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={<Field name="createThumbnails" component={BoolCheckbox} />}
      label="Create Thumbnails"
      fullWidth
    />
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
        If true try to put the index tables (header) in front of the file, if
        false put header at end of file
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
        control={<Field name="growing" component={BoolCheckbox} />}
        label="Growing"
      />
      <FormHelperText>
        The input file is still written to, so enables growing file support
      </FormHelperText>
    </FormControl>
    <Field
      name="xmpfile"
      label="XMP File"
      helperText="URI to a sidecar XMP metadata file"
      component={TextField}
      fullWidth
    />
    <Field
      name="sidecar"
      label="Sidecar"
      helperText="URIs or file IDs sidecar files "
      component={ChipInput}
      simple
      fullWidth
    />
    <Field
      name="settings"
      label="Settings"
      helperText="Import Settings"
      component={TextField}
      fullWidth
    />
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
      name="importTag"
      label="Import Tag"
      helperText="List of shape tags that the created shape will be associated with"
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

function ImportUriForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}
export default reduxForm()(ImportUriForm);
