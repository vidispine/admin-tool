import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { Select } from '../form';
import { loadMetadataFieldOptions } from '../metadatafield/MetadataFieldSelect';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';

export const queryParams = () => (
  <>
    <FormControl fullWidth>
      <InputLabel htmlFor="mode">mode</InputLabel>
      <Field name="mode" component={Select}>
        <MenuItem value="COLLECTION_ORDER">COLLECTION_ORDER</MenuItem>
        <MenuItem value="ITEM_START_TC">ITEM_START_TC</MenuItem>
        <MenuItem value="METADATA">METADATA</MenuItem>
      </Field>
    </FormControl>
    <Field
      name="field"
      component={StatefulAsyncSelect}
      loadOptions={loadMetadataFieldOptions}
      cacheOptions
      isClearable
      fullWidth
      creatable
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="sort">sort</InputLabel>
      <Field name="sort" component={Select}>
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Field>
    </FormControl>
  </>
);

function CollectionSequenceParamsForm({ error, handleSubmit, ...props }) {
  return (
    <form onSubmit={handleSubmit} {...props}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(CollectionSequenceParamsForm);
