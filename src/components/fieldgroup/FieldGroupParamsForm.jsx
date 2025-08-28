import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
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
    <FormControl fullWidth>
      <FormControlLabel
        control={<Field name="includeValues" component={BoolCheckbox} />}
        label="Include Values"
      />
      <FormHelperText>Return the value enumeration for each field</FormHelperText>
    </FormControl>
    <FormControl fullWidth>
      <FormControlLabel
        control={<Field name="traverse" component={BoolCheckbox} />}
        label="Traverse"
      />
      <FormHelperText>
        Traverse any sub-groups in order to retrieve the entire hierarchy.
      </FormHelperText>
    </FormControl>
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
