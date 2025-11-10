import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
  <>
    <Field
      name="sourceTag"
      label="sourceTag"
      helperText="Comma-separated list of shape tags. The first valid shape is selected as the source of the job. If non of the tags are valid, the original shape will be used"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
      creatable
    />
    <Field
      name="tag"
      label="tag"
      helperText="Comma-separated list of shape tags specifying the desired output formats. Currently, only a single tag can be specified for a sequence item"
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
      label="original"
      component={TextField}
      fullWidth
      helperText="If specified, should be one of the tags specified in the tag parameter. Specifies that the original shape tag will be reset to the shape created to this tag."
    />
    <Field
      name="destinationItem"
      label="destinationItem"
      component={TextField}
      fullWidth
      helperText="An item id to which the new shape will be associated"
      validate={[required]}
      required
    />
    <Field
      name="storageId"
      label="storageId"
      helperText="Where essence file is to be stored"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageOptions}
      cacheOptions
      isClearable
      fullWidth
      creatable
    />
    <FormControl required fullWidth>
      <InputLabel htmlFor="mode">mode</InputLabel>
      <Field name="mode" component={Select} validate={[required]}>
        <MenuItem value="Rendering">Rendering</MenuItem>
      </Field>
      <FormHelperText>Rendermode of the transcoder</FormHelperText>
    </FormControl>
    <Field
      name="start"
      label="start"
      component={TextField}
      fullWidth
      helperText="Start frame in the source of the subclip"
    />
    <Field name="duration" component={TextField} fullWidth helperText="Duration of the subclip" />
    <Field
      name="startTimeCode"
      label="startTimeCode"
      component={TextField}
      fullWidth
      helperText="Start timecode of the new clip"
    />
    <Field
      name="resourceId"
      label="resourceId"
      component={TextField}
      fullWidth
      helperText="The transcoder resource to use to execute the job"
    />
    <Field
      name="resourceTag"
      label="resourceTag"
      component={TextField}
      fullWidth
      helperText="The resource tag criteria used to select transcoders for the job"
    />
    <Field
      name="notification"
      label="notification"
      component={TextField}
      fullWidth
      helperText="The placeholder job notification to use for this job"
    />
    <FieldTypeArray
      name="notificationData"
      label="notificationData"
      component={KeyValuePairType}
      arrayHeader
      withHeader={false}
      dense
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="priority">priority</InputLabel>
      <Field name="priority" component={Select}>
        {JobPriority.map((priority) => (
          <MenuItem key={priority} value={priority}>
            {priority}
          </MenuItem>
        ))}
      </Field>
      <FormHelperText>The priority to assign to the job. Default is MEDIUM</FormHelperText>
    </FormControl>
    <FieldTypeArray
      name="jobmetadata"
      label="jobmetadata"
      component={KeyValuePairType}
      withHeader={false}
      arrayHeader
      dense
    />
    <FormControl>
      <FormControlLabel
        control={<Field name="holdJob" component={BoolCheckbox} />}
        label="holdJob"
        fullWidth
      />
      <FormHelperText>Created job in a HOLD state</FormHelperText>
    </FormControl>
  </>
);

function ItemSubclipCreateForm({ itemId, error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {itemId === undefined ? (
        <Field name="itemId" label="Item ID" component={TextField} fullWidth />
      ) : null}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ItemSubclipCreateForm);
