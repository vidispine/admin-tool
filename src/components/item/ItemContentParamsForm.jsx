import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField, Select } from '../form';
import { loadMetadataFieldOptions } from '../metadatafield/MetadataFieldSelect';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import { loadStorageOptions } from '../storage/StorageSelect';
import { loadStorageGroupOptions } from '../storagegroup/StorageGroupSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';
import { StatefulAsyncSelect } from '../ui/Select';

export const queryParams = () => (
  <>
    <Field
      name="content"
      component={StatefulAsyncSelect}
      isMulti
      options={[
        { value: 'metadata', label: 'metadata' },
        { value: 'uri', label: 'uri' },
        { value: 'shape', label: 'shape' },
        { value: 'poster', label: 'poster' },
        { value: 'thumbnail', label: 'thumbnail' },
        { value: 'access', label: 'access' },
        { value: 'merged-access', label: 'merged-access' },
        { value: 'external', label: 'external' },
      ]}
      fullWidth
    />
    <Field name="p" label="Path" component={TextField} fullWidth />
    <Field
      name="field"
      component={StatefulAsyncSelect}
      loadOptions={loadMetadataFieldOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
      creatable
    />
    <Field name="group" component={TextField} fullWidth />
    <Field name="language" component={TextField} fullWidth />
    <Field name="sampleRate" component={TextField} fullWidth />
    <Field name="interval" component={TextField} fullWidth />
    <Field name="track" component={TextField} fullWidth />
    <Field name="include" component={TextField} fullWidth />
    <Field name="includeValues" component={TextField} fullWidth />
    <Field name="revision" component={TextField} fullWidth />
    <Field name="mergedType" component={TextField} fullWidth />
    <Field name="mergedPermission" component={TextField} fullWidth />
    <Field name="mergedExtradata" component={TextField} fullWidth />
    <Field name="uriType" component={TextField} fullWidth />
    <Field name="scheme" component={TextField} fullWidth />
    <Field name="storageType" component={TextField} fullWidth />
    <FormControl fullWidth>
      <InputLabel htmlFor="methodType">Method Type</InputLabel>
      <Field name="methodType" component={Select}>
        <MenuItem value="AUTO">AUTO</MenuItem>
        <MenuItem value="AZURE_SAS">AZURE_SAS</MenuItem>
      </Field>
    </FormControl>
    <FieldTypeArray name="methodMetadata" label="Method Metadata" component={KeyValuePairType} />
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
    <Field name="version" component={TextField} fullWidth />
    <Field name="baseURI" component={TextField} fullWidth />
    <FormControlLabel
      control={<Field name="closedFiles" component={BoolCheckbox} />}
      label="Closed Files"
    />
    <FormControlLabel
      control={<Field name="noauth-url" component={BoolCheckbox} />}
      label="No-Auth URL"
    />
    <FormControlLabel
      control={<Field name="conflict" component={BoolCheckbox} />}
      label="Conflict"
    />
    <FormControlLabel control={<Field name="terse" component={BoolCheckbox} />} label="Terse" />
    <FormControlLabel
      control={<Field name="defaultValue" component={BoolCheckbox} />}
      label="Default Value"
    />
    <FormControlLabel
      control={<Field name="includeTransientMetadata" component={BoolCheckbox} />}
      label="Include Transient Metadata"
    />
    <Field
      name="storage"
      label="Storage"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
    <Field
      name="storageGroup"
      label="Storage Group"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageGroupOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
    <Field name="includeConstraintValue" component={TextField} fullWidth />
    <FormControlLabel
      control={<Field name="starttc" component={BoolCheckbox} />}
      label="Start TC"
    />
  </>
);

function ItemContentParamsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" label="queryParams" component={queryParams} />
    </form>
  );
}

export default reduxForm()(ItemContentParamsForm);
