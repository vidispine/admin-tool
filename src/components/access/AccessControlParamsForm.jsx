import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

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
      <FormSection name="queryParams" label="queryParams" component={queryParams} fullWidth />
    </form>
  );
}

export default reduxForm()(AccessControlParamsForm);
