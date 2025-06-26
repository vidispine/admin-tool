import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { required } from '../../utils/FieldValidation';
import { TextField } from '../form';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <>
    <Field name="start" label="Start Timecode" component={TextField} fullWidth />
    <Field name="end" label="End Timecode" component={TextField} fullWidth />
    <Field name="stream" label="Stream Index" component={TextField} fullWidth />
    <Field name="channel" label="Audio Channel" component={TextField} fullWidth />
    <Field name="itemTrack" label="Item Track" component={TextField} fullWidth />
    <Field name="extraMapValues" label="Extra Map Values" component={TextField} fullWidth />
  </>
);

function BulkyMetadataDownloadForm({ error, handleSubmit, itemId, bulkyMetadataKey }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!itemId && <Field name="itemId" component={TextField} validate={[required]} fullWidth />}
      {!bulkyMetadataKey && (
        <Field name="bulkyMetadataKey" component={TextField} validate={[required]} fullWidth />
      )}
      <FormSection name="queryParams" label="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(BulkyMetadataDownloadForm);
