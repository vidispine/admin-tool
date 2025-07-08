import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField, Select } from '../form';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import { loadStorageOptions } from '../storage/StorageSelect';
import { loadStorageGroupOptions } from '../storagegroup/StorageGroupSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';

function StorageCriteriaType() {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="value">Criteria</InputLabel>
      <Field name="value" component={Select}>
        <MenuItem value="bandwidth">bandwidth</MenuItem>
        <MenuItem value="capacity">capacity</MenuItem>
      </Field>
    </FormControl>
  );
}

function StorageRuleStorageType() {
  return (
    <>
      <Field
        name="storage"
        component={StatefulAsyncSelect}
        loadOptions={loadStorageOptions}
        cacheOptions
        isClearable
        fullWidth
        isMulti
        createable
      />
      <Field
        name="group"
        label="Storage Group"
        component={StatefulAsyncSelect}
        loadOptions={loadStorageGroupOptions}
        cacheOptions
        isClearable
        fullWidth
        isMulti
        createable
      />
    </>
  );
}

function StorageRuleNotType() {
  return (
    <>
      <StorageRuleStorageType />
      <Field name="any" component={TextField} fullWidth />
    </>
  );
}

function StorageRulePriorityType() {
  return (
    <>
      <Field name="level" type="number" component={TextField} fullWidth />
      <StorageCriteriaType />
    </>
  );
}

function StorageRuleAppliesType() {
  return (
    <>
      <Field name="id" component={TextField} fullWidth />
      <Field name="type" component={TextField} fullWidth />
    </>
  );
}

function StorageRuleType() {
  return (
    <>
      <Field name="storageCount" type="number" component={TextField} fullWidth />
      <FieldTypeArray name="priority" label="Priority" component={StorageRulePriorityType} />
      <FormControlLabel
        control={<Field name="inherited" component={BoolCheckbox} />}
        label="Inherited"
      />
      <Field
        name="storage"
        component={StatefulAsyncSelect}
        loadOptions={loadStorageOptions}
        cacheOptions
        isClearable
        fullWidth
        isMulti
        createable
      />
      <Field
        name="group"
        label="Storage Group"
        component={StatefulAsyncSelect}
        loadOptions={loadStorageGroupOptions}
        cacheOptions
        isClearable
        fullWidth
        isMulti
        createable
      />
      <FormSection name="not" label="not" component={StorageRuleNotType} />
      <FormSection name="pool" label="pool" component={StorageRuleStorageType} />
      <FormSection name="appliesTo" label="appliesTo" component={StorageRuleAppliesType} />
      <FormControl fullWidth>
        <InputLabel htmlFor="precedence">Precedence</InputLabel>
        <Field name="precedence" component={Select}>
          <MenuItem value="HIGHEST">HIGHEST</MenuItem>
          <MenuItem value="HIGH">HIGH</MenuItem>
          <MenuItem value="MEDIUM">MEDIUM</MenuItem>
          <MenuItem value="LOW">LOW</MenuItem>
          <MenuItem value="LOWEST">LOWEST</MenuItem>
        </Field>
      </FormControl>
    </>
  );
}

function EntityForm({ error, handleSubmit, tagName }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {tagName === undefined ? (
        <Field
          name="tagName"
          label="Shape Tag"
          component={StatefulAsyncSelect}
          loadOptions={loadShapeTagOptions}
          cacheOptions
          isClearable
          fullWidth
          createable
        />
      ) : null}

      <FormSection name="storageRuleDocument" component={StorageRuleType} />
      <button type="submit" hidden />
    </form>
  );
}

export const StorageRuleEntityForm = reduxForm()(EntityForm);

function TagForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="storageRuleDocument" component={StorageRuleType} />
      <button type="submit" hidden />
    </form>
  );
}

export const StorageRuleTagForm = reduxForm()(TagForm);

function StorageRuleForm({ error, handleSubmit, tagName }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {tagName !== undefined ? (
        <>
          <FormControl fullWidth>
            <InputLabel htmlFor="entityType">Type</InputLabel>
            <Field name="entityType" component={Select}>
              <MenuItem value="item">Item</MenuItem>
              <MenuItem value="collection">Collection</MenuItem>
              <MenuItem value="library">Library</MenuItem>
            </Field>
          </FormControl>
          <Field name="entityId" component={TextField} fullWidth />
        </>
      ) : null}

      <FormSection name="storageRuleDocument" component={StorageRuleType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(StorageRuleForm);
