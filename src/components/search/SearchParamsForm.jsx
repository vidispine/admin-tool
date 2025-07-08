import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import { queryParams as contentQueryParams } from '../item/ItemContentParamsForm';
import { loadStorageOptions } from '../storage/StorageSelect';
import { loadStorageGroupOptions } from '../storagegroup/StorageGroupSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';

const queryParams = () => (
  <>
    <Field name="first" component={TextField} type="number" fullWidth />
    <Field name="number" component={TextField} type="number" fullWidth />
    <Field
      name="storage"
      label="Storage"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
      creatable
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
      creatable
    />
    <FormControlLabel control={<Field name="count" component={BoolCheckbox} />} label="Count" />
    <FormControlLabel control={<Field name="save" component={BoolCheckbox} />} label="Save" />
  </>
);

function SearchParamsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <FormSection name="queryParams" component={contentQueryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(SearchParamsForm);
