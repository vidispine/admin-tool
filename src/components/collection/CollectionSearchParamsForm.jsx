import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import { queryParams as contentQueryParams } from './CollectionContentParamsForm';

const queryParams = () => (
  <>
    <FormControlLabel
      control={(
        <Field
          name="count"
          component={BoolCheckbox}
        />
      )}
      label="Count"
    />
    <Field
      name="first"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="number"
      component={TextField}
      type="number"
      fullWidth
    />
  </>
);

function CollectionSearchParamsForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <FormSection
        name="queryParams"
        component={contentQueryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(CollectionSearchParamsForm);
