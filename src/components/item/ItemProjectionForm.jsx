import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { loadProjectionOptions } from '../projection/ProjectionSelect';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';

const queryParams = () => (
  <Field
    name="projection"
    label="Projection"
    component={StatefulAsyncSelect}
    loadOptions={loadProjectionOptions}
    cacheOptions
    isClearable
    fullWidth
    creatable
  />
);

function ItemProjectionForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
    </form>
  );
}

export default reduxForm()(ItemProjectionForm);
