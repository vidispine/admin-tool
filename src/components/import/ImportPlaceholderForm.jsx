import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';

const queryParams = () => (
  <FormGroup>
    <Field
      name="container"
      component={TextField}
      type="number"
      helperText="The number of files that contain container components"
      fullWidth
    />
    <Field
      name="audio"
      component={TextField}
      type="number"
      helperText="The number of files that contain audio components"
      fullWidth
    />
    <Field
      name="video"
      component={TextField}
      type="number"
      helperText="The number of files that contain video components"
      fullWidth
    />
    <Field
      name="binary"
      component={TextField}
      type="number"
      helperText="The number of files that contain binary components"
      fullWidth
    />
    <Field
      name="subtitle"
      component={TextField}
      type="number"
      helperText="The number of files that contain subtitle components"
      fullWidth
    />
    <Field
      name="frameDuration"
      label="Frame Duration"
      component={TextField}
      helperText="Duration for each image in the sequence"
      type="number"
      fullWidth
    />
    <Field
      name="settings"
      label="Settings"
      helperText="Pre-configured import settings"
      component={TextField}
      fullWidth
    />
    <Field
      name="importTag"
      label="Import Tag"
      helperText="List of shape tags that the created shape will be associated with"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
    <Field
      name="externalId"
      label="External ID"
      helperText="An external identifier to assign to the item"
      component={TextField}
      fullWidth
    />
  </FormGroup>
);

function ImportPlaceholderForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ImportPlaceholderForm);
