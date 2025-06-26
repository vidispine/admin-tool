import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import JobPriority from '../../const/JobPriority';
import { required } from '../../utils/FieldValidation';
import { TextField, Select } from '../form';
import { loadStorageOptions } from '../storage/StorageSelect';
import AnalyzeJobType from '../ui/AnalyzeJobType';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';
import { StatefulAsyncSelect } from '../ui/Select';

const queryParams = () => (
  <>
    <Field name="resourceId" label="Transcoder ID" component={TextField} fullWidth />
    <Field
      name="storageId"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <Field name="callbackId" component={TextField} fullWidth />
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
  </>
);

function ShapeComponentAnalyzeForm({ error, handleSubmit, itemId, shapeId, componentId }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!itemId && <Field name="itemId" component={TextField} validate={[required]} fullWidth />}
      {!shapeId && <Field name="shapeId" component={TextField} validate={[required]} fullWidth />}
      {!componentId && (
        <Field name="componentId" component={TextField} validate={[required]} fullWidth />
      )}
      <FormSection name="queryParams" label="queryParams" component={queryParams} />
      <FormSection
        name="analyzeJobDocument"
        label="analyzeJobDocument"
        component={AnalyzeJobType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeComponentAnalyzeForm);
