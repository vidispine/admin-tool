import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { TextField, Select } from '../form';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';

export const queryParams = () => (
  <>
    <FormControl fullWidth>
      <InputLabel htmlFor="noauth-url">noauth-url</InputLabel>
      <Field name="noauth-url" component={Select}>
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </Field>
    </FormControl>
  </>
);

export const headers = () => (
  <>
    <Field name="If-Modified-None" component={TextField} fullWidth />
    <FormControl fullWidth>
      <InputLabel htmlFor="accept">accept</InputLabel>
      <Field name="accept" component={Select}>
        <MenuItem value="application/xml">application/xml</MenuItem>
        <MenuItem value="application/json">application/json</MenuItem>
        <MenuItem value="text/vtt">text/vtt</MenuItem>
      </Field>
    </FormControl>
  </>
);

function ItemThumbnailSpritesheetParamsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        label="queryParams"
        component={queryParams}
      />
      <FormSection name="headers" label="headers" component={headers} />
    </form>
  );
}

export default reduxForm()(ItemThumbnailSpritesheetParamsForm);
