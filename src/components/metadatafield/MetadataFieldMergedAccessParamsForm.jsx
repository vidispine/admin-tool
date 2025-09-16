import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import Field from '../ui/Field';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadUserOptions } from '../user/UserSelect';

function queryParams() {
  return (
    <Field
      name="username"
      label="username"
      component={StatefulAsyncSelect}
      loadOptions={loadUserOptions}
      cacheOptions
      isClearable
      fullWidth
    />
  );
}

function MetadataFieldValuesParamsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
    </form>
  );
}

export default reduxForm()(MetadataFieldValuesParamsForm);
