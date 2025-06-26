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
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';
import { StatefulAsyncSelect } from '../ui/Select';

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
        True - import the file to this shape even if the file is already importing or is already
        part of another item. False - Reject the request if the file with the given id has already
        been imported or is currently importing
      </FormHelperText>
    </FormControl>
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
    <Field
      name="frame-rate"
      label="Frame Rate"
      helperText="The frame rate of the image sequence"
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
  </FormGroup>
);

function ImportShapeEssenceForm({ error, handleSubmit }) {
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
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ImportShapeEssenceForm);
