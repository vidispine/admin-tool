import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import Field from '../ui/Field';
import { StatefulAsyncSelect } from '../ui/Select';

import { loadFieldGroupOptions } from './FieldGroupSelect';

function FieldGroupChildForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="childGroupName"
        label="Field Group"
        component={StatefulAsyncSelect}
        loadOptions={loadFieldGroupOptions}
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

export default reduxForm()(FieldGroupChildForm);
