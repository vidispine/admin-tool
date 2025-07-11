import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import JobPriority from '../../const/JobPriority';
import { TextField, Select } from '../form';
import { MetadataType } from '../metadata/MetadataForm';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';

const queryParams = () => (
  <>
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
    <FieldTypeArray
      name="jobmetadata"
      component={KeyValuePairType}
      label="Job Metadata"
      withHeader={false}
      arrayHeader
      dense
    />
    <Field name="notification" component={TextField} fullWidth />
    <FieldTypeArray
      name="notificationData"
      component={KeyValuePairType}
      label="Notification Metadata"
      arrayHeader
      withHeader={false}
      dense
    />
  </>
);

function LibraryItemMetadataForm({ error, handleSubmit, libraryId }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!libraryId && <Field name="libraryId" component={TextField} fullWidth />}
      <FormSection name="metadataDocument" label="MetadataDocument" component={MetadataType} />
      <FormSection name="queryParams" label="queryParams" component={queryParams} />
    </form>
  );
}

export default reduxForm()(LibraryItemMetadataForm);
