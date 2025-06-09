import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { Select } from '../form';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';

export const queryParams = () => (
  <>
    <FormControl fullWidth>
      <InputLabel shrink htmlFor="groupBy">Group By</InputLabel>
      <Field name="groupBy" component={Select}>
        <MenuItem value="change">change</MenuItem>
        <MenuItem value="none">none</MenuItem>
      </Field>
    </FormControl>
  </>
);

function MetadataGraphParamsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        label="queryParams"
        component={queryParams}
      />
    </form>
  );
}

export default reduxForm()(MetadataGraphParamsForm);
