import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import { queryParams as itemQueryParams } from '../item/ItemContentParamsForm';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <>
    <Field name="first" component={TextField} type="number" fullWidth />
    <Field name="number" component={TextField} type="number" fullWidth />
    <FormControlLabel control={<Field name="count" component={BoolCheckbox} />} label="Count" />
  </>
);

function LibraryContentParamsForm({ error, handleSubmit, libraryId }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!libraryId && <Field name="libraryId" component={TextField} fullWidth />}
      <FormSection name="queryParams" label="queryParams" component={queryParams} />
      <FormSection name="queryParams" component={itemQueryParams} />
    </form>
  );
}

export default reduxForm()(LibraryContentParamsForm);
