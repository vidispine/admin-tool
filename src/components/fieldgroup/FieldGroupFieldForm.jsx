import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { loadMetadataFieldOptions } from '../metadatafield/MetadataFieldSelect';
import Field from '../ui/Field';
import { StatefulAsyncSelect } from '../ui/Select';

function FieldGroupFieldForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="fieldName"
        label="Metadata Field"
        component={StatefulAsyncSelect}
        loadOptions={loadMetadataFieldOptions}
        cacheOptions
        isClearable
        required
        fullWidth
        disableInitial
        creatable
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(FieldGroupFieldForm);
