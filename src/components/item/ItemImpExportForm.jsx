import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import JobPriority from '../../const/JobPriority';
import { required } from '../../utils/FieldValidation';
import { loadExportLocationOptions } from '../exportlocation/ExportLocationSelect';
import { TextField, Select } from '../form';
import { loadProjectionOptions } from '../projection/ProjectionSelect';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';
import { StatefulAsyncSelect } from '../ui/Select';

const queryParams = () => (
  <>
    <Field name="uri" component={TextField} fullWidth />
    <Field
      name="locationName"
      label="Export Location"
      component={StatefulAsyncSelect}
      loadOptions={loadExportLocationOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <FormControlLabel
      control={<Field name="metadata" component={BoolCheckbox} />}
      label="Metadata Sidecar"
    />
    <Field
      name="projection"
      label="Projection"
      component={StatefulAsyncSelect}
      loadOptions={loadProjectionOptions}
      cacheOptions
      isClearable
      fullWidth
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
    <FormControlLabel
      control={<Field name="useOriginalFilename" component={BoolCheckbox} />}
      label="Use Original Filename"
    />
    <FormControlLabel
      control={<Field name="useOriginalComponentFilename" component={BoolCheckbox} />}
      label="Use Original Component Filename"
    />
    <Field
      name="tag"
      label="Shape Tag"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <Field name="start" label="Start Timecode" component={TextField} fullWidth />
    <Field name="end" label="End Timecode" component={TextField} fullWidth />
    <Field name="template" label="Export Template" component={TextField} fullWidth />
    <FormControlLabel
      control={<Field name="allowMissing" component={BoolCheckbox} />}
      label="Allow Missing"
    />
    <Field name="track" component={TextField} fullWidth />
    <Field name="cplTrack" label="CPL Track" component={TextField} fullWidth />
    <Field name="version" component={TextField} fullWidth />
  </>
);

function ExportImpForm({ error, handleSubmit, itemId }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!itemId && <Field name="itemId" component={TextField} validate={[required]} fullWidth />}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ExportImpForm);
