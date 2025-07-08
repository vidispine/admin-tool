import Typography from '@material-ui/core/Typography';
import { reduxForm, Field } from 'redux-form';

import { required } from '../../utils/FieldValidation';
import { TextField } from '../form';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import FormSection from '../ui/FormSection';
import { SimpleMetadataType } from '../ui/FormType';
import { StatefulAsyncSelect } from '../ui/Select';

const queryParams = () => (
  <>
    <Field
      name="tag"
      label="Shape Tag"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
      creatable
    />
    <Field
      name="container"
      label="Container"
      component={TextField}
      type="number"
      fullWidth
      helperText="Total Container Files"
    />
    <Field
      name="audio"
      label="Audio"
      component={TextField}
      helperText="Total Audio Files"
      type="number"
      fullWidth
    />
    <Field
      name="video"
      label="Video"
      component={TextField}
      type="number"
      helperText="Total Video Files"
      fullWidth
    />
    <Field
      name="binary"
      label="Binary"
      component={TextField}
      type="number"
      fullWidth
      helperText="Total Binary Files"
    />
    <Field
      name="subtitle"
      label="Subtitle"
      component={TextField}
      type="number"
      fullWidth
      helperText="Total Subtitle Files"
    />
    <Field
      name="frameDuration"
      label="Frame Duration"
      component={TextField}
      type="number"
      fullWidth
    />
  </>
);

function ImportShapePlaceholderForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="itemId"
        label="Item Id"
        component={TextField}
        validate={[required]}
        required
        fullWidth
      />
      <FormSection name="queryParams" component={queryParams} />
      <FormSection
        name="simpleMetadataDocument"
        label="Simple Metadata"
        component={SimpleMetadataType}
      />
      <button type="submit" hidden />
    </form>
  );
}
export default reduxForm()(ImportShapePlaceholderForm);
