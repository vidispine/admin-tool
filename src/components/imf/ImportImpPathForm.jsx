import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import FileStates from '../../const/FileStates';
import JobPriority from '../../const/JobPriority';
import { TextField, Select } from '../form';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import { loadStorageOptions } from '../storage/StorageSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';

const queryParams = () => (
  <>
    <Field name="path" component={TextField} fullWidth required />
    <FormControl fullWidth>
      <InputLabel htmlFor="priority">Priority</InputLabel>
      <Field name="priority" component={Select}>
        {JobPriority.map((priority) => (
          <MenuItem key={priority} value={priority}>
            {priority}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
    <FormControlLabel
      control={<Field name="allowReimport" component={BoolCheckbox} />}
      label="Allow Reimport"
    />
    <FormControlLabel
      control={<Field name="createOnly" component={BoolCheckbox} />}
      label="Create Only"
    />
    <FormControlLabel
      control={<Field name="no-transcode" component={BoolCheckbox} />}
      label="No Transcode"
    />
    <FormControlLabel
      control={<Field name="createThumbnails" component={BoolCheckbox} />}
      label="Create Thumbnails"
    />
    <Field
      name="tag"
      label="Shape Tag"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="state">State</InputLabel>
      <Field name="state" component={Select}>
        {FileStates.map((filestate) => (
          <MenuItem key={filestate} value={filestate}>
            {filestate}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
  </>
);

function ImportImpPathForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="storageId"
        label="Storage ID"
        component={StatefulAsyncSelect}
        loadOptions={loadStorageOptions}
        cacheOptions
        isClearable
        required
        fullWidth
        disableInitial
      />
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ImportImpPathForm);
