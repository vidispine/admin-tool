import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { required } from '../../utils/FieldValidation';
import { TextField } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <>
    <Field
      name="data"
      component={TextField}
      fullWidth
      label="data"
      helperText="Comma-separated list of any additional data to include. accepts wildcard characters."
    />
    <FormControlLabel
      control={
        <Field
          name="includeValues"
          component={BoolCheckbox}
          fullWidth
          label="includeValues"
          helperText="Return the value enumeration for each field"
        />
      }
    />
    <FormControlLabel
      control={
        <Field
          name="traverse"
          component={BoolCheckbox}
          fullWidth
          label="traverse"
          helperText="Traverse any sub-groups in order to retrieve the entire hierarchy."
        />
      }
    />
  </>
);

function FieldGroupParamsForm({ error, handleSubmit, groupName }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!groupName && (
        <Field name="groupName" component={TextField} validate={[required]} fullWidth />
      )}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(FieldGroupParamsForm);
