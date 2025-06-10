import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField, Select } from '../form';
import { ItemSearchType } from '../item/ItemSearchForm';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

function LibrarySettingsDocument() {
  return (
    <>
      <Field name="username" component={TextField} disabled fullWidth />
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
      <Field name="updateFrequency" component={TextField} fullWidth />
      <Field name="lastUpdate" component={TextField} disabled fullWidth />
      <FormSection name="query" label="Query" component={ItemSearchType} />
    </>
  );
}

function LibrarySettingsForm({ error, handleSubmit, libraryId }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!libraryId && <Field name="libraryId" component={TextField} fullWidth />}
      <FormSection name="librarySettingsDocument" component={LibrarySettingsDocument} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(LibrarySettingsForm);
