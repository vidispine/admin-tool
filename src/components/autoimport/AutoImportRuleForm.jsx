import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field, FormSection } from 'redux-form';

import { TextField } from '../form';
import { MetadataType } from '../metadata/MetadataForm';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import { loadStorageOptions } from '../storage/StorageSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import ChipInput from '../ui/ChipInput';
import FieldTypeArray from '../ui/FieldTypeArray';
import { StatefulAsyncSelect } from '../ui/Select';
import { SimpleMetadataTypeForm } from '../ui/SimpleMetadataField';
import UserSelect from '../user/UserSelect';

function FilenameFilterTypeForm() {
  return (
    <>
      <Field name="pattern" label="Filter Pattern" component={TextField} fullWidth />
      <Field name="tag" label="Filter Tag" component={ChipInput} simple fullWidth />
    </>
  );
}

function AutoImportRuleTypeForm() {
  return (
    <>
      <Field
        name="storage"
        label="Storage ID"
        component={StatefulAsyncSelect}
        loadOptions={loadStorageOptions}
        cacheOptions
        isClearable
        required
        fullWidth
        disableInitial
      />
      <FormControlLabel
        control={<Field name="enabled" component={BoolCheckbox} />}
        label="Enabled"
      />
      <FormControlLabel
        control={<Field name="fileNameAsTitle" component={BoolCheckbox} />}
        label="File Name As Title"
      />
      <FormControlLabel
        control={<Field name="ignoreSidecarImport" component={BoolCheckbox} />}
        label="Ignore Sidecar Import"
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
      <Field name="resourceId" label="Resource ID" component={TextField} fullWidth />
      <Field name="settingsId" label="Settings ID" component={TextField} fullWidth />
      <Field name="projection" label="Projection" component={TextField} fullWidth />
      <UserSelect name="user" label="User" isClearable fullWidth />
      <FieldTypeArray
        name="excludeFilter"
        label="Exclude Filter"
        component={FilenameFilterTypeForm}
      />
      <FieldTypeArray
        name="shapeTagFilter"
        label="Shape Tag Filter"
        component={FilenameFilterTypeForm}
      />
      <FormSection name="jobmetadata" component={SimpleMetadataTypeForm} label="Job Metadata" />
      <FormSection name="metadata" component={MetadataType} />
    </>
  );
}

function AutoImportRuleForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="autoImportRuleDocument" component={AutoImportRuleTypeForm} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(AutoImportRuleForm);
