import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField, Select } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

import { queryParams as contentQueryParams } from './ItemContentParamsForm';

const queryParams = () => (
  <>
    <FormControl fullWidth>
      <InputLabel htmlFor="result">Result</InputLabel>
      <Field name="result" component={Select}>
        <MenuItem value="list">List</MenuItem>
        <MenuItem value="library">Library</MenuItem>
      </Field>
    </FormControl>
    <FormControlLabel control={<Field name="count" component={BoolCheckbox} />} label="Count" />
    <FormControlLabel control={<Field name="save" component={BoolCheckbox} />} label="Save" />
    <Field name="first" component={TextField} type="number" fullWidth />
    <Field name="number" component={TextField} type="number" fullWidth />
    <Field name="library" component={TextField} fullWidth />
    <Field name="libraryId" component={TextField} fullWidth />
    <Field name="updateFrequency" component={TextField} fullWidth />
    <FormControl fullWidth>
      <InputLabel htmlFor="updateMode">Update Mode</InputLabel>
      <Field name="updateMode" component={Select}>
        <MenuItem value="REPLACE">REPLACE</MenuItem>
        <MenuItem value="MERGE">MERGE</MenuItem>
        <MenuItem value="TRANSIENT">TRANSIENT</MenuItem>
      </Field>
    </FormControl>
    <FormControlLabel
      control={<Field name="autoRefresh" component={BoolCheckbox} />}
      label="Auto Refresh"
    />
  </>
);

function ItemSearchParamsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <FormSection name="queryParams" component={contentQueryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ItemSearchParamsForm);
