import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';

export const queryParams = () => (
  <>
    <FormControlLabel
      control={<Field name="additionalUserInfo" component={BoolCheckbox} />}
      label="Additional User Info"
    />
    <FormControlLabel
      control={<Field name="additionalGroupInfo" component={BoolCheckbox} />}
      label="Additional Group Info"
    />
  </>
);

function AccessControlParamsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        label="queryParams"
        component={queryParams}
        fullWidth
      />
    </form>
  );
}

export default reduxForm()(AccessControlParamsForm);
