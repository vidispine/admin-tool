import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

const queryParams = () => (
  <>
    <Field
      name="tag"
      label="Shape Tag"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
      creatable
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
    <FormControlLabel
      control={<Field name="createThumbnails" component={BoolCheckbox} />}
      label="Create Thumbnails"
    />
    <Field name="createPosters" label="Poster Timecodes" component={ChipInput} simple fullWidth />
    <Field name="destinationItem" component={TextField} fullWidth />
    <Field name="original" label="Reset Original" component={TextField} fullWidth />
    <FieldTypeArray
      name="jobmetadata"
      component={KeyValuePairType}
      label="Job Metadata"
      withHeader={false}
      arrayHeader
      dense
    />
    <Field name="notification" component={TextField} fullWidth />
    <FieldTypeArray
      name="notificationData"
      component={KeyValuePairType}
      label="Notification Metadata"
      arrayHeader
      withHeader={false}
      dense
    />
    <Field name="thumbnailService" component={TextField} fullWidth />
    <Field name="resourceId" label="Resource ID" component={TextField} fullWidth />
    <Field name="resourceTag" label="Resource Tag" component={TextField} fullWidth />
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

    <FormControlLabel
      control={<Field name="overrideFastStart" component={BoolCheckbox} />}
      label="Override FastStart"
    />
    <FormControlLabel
      control={<Field name="requireFastStart" component={BoolCheckbox} />}
      label="Require FastStart"
    />
    <Field name="fastStartLength" component={TextField} fullWidth />
    <FormControlLabel
      control={<Field name="holdJob" component={BoolCheckbox} />}
      label="Hold Job"
    />
  </>
);

function ItemTranscodeForm({ error, handleSubmit, itemId }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!itemId && <Field name="itemId" component={TextField} validate={[required]} fullWidth />}
      <FormSection name="queryParams" label="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ItemTranscodeForm);
