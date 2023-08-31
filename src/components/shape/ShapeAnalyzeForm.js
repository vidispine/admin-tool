import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { TextField, Select } from '../form';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import { StatefulAsyncSelect } from '../ui/Select';
import FieldTypeArray from '../ui/FieldTypeArray';
import JobPriority from '../../const/JobPriority';
import { KeyValuePairType } from '../ui/FormType';
import { required } from '../../utils/FieldValidation';
import { loadStorageOptions } from '../storage/StorageSelect';
import AnalyzeJobType from '../ui/AnalyzeJobType';

const queryParams = () => (
  <>
    <Field
      name="resourceId"
      label="Resource ID"
      component={TextField}
      fullWidth
    />
    <Field
      name="storageId"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <Field
      name="callbackId"
      component={TextField}
      fullWidth
    />
    <Field
      name="preset"
      component={TextField}
      fullWidth
    />
    <Field
      name="notification"
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
  </>
);

function ShapeAnalyzeForm({
  error,
  handleSubmit,
  itemId,
  shapeId,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!itemId && (
        <Field
          name="itemId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      {!shapeId && (
        <Field
          name="shapeId"
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
      <FormSection
        name="analyzeJobDocument"
        label="analyzeJobDocument"
        component={AnalyzeJobType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeAnalyzeForm);
