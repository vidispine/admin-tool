import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <>
    <Field
      name="size"
      component={TextField}
      fullWidth
      label="Size"
      helperText="Range of bytes, in format s1-s2. Returns storages with nominal size that is in that range. Either number can be omitted to not specify lower/upper limit. Size units can be used."
    />
    <Field
      name="freebytes"
      component={TextField}
      fullWidth
      label="Free Bytes"
      helperText="Range of bytes, in format s1-s2. Returns storages with free space that is in that range. Either number can be omitted to not specify lower/upper limit. Size units can be used."
    />
    <Field
      name="usedbytes"
      component={TextField}
      fullWidth
      label="Used Bytes"
      helperText="Range of bytes, in format s1-s2. Returns storages with used space that is in that range. Either number can be omitted to not specify lower/upper limit. Size units can be used."
    />
    <Field
      name="freeamount"
      component={TextField}
      fullWidth
      label="Free Amount"
      helperText="Range of percent as integers, in format s1-s2. Returns storages with used space that is in that range. Either number can be omitted to not specify lower/upper limit."
    />
    <Field
      name="files"
      component={TextField}
      fullWidth
      label="Files"
      helperText="Range of files as integers, in format s1-s2. Returns storages with number of files that is in that range. Either number can be omitted to not specify lower/upper limit."
    />
    <Field
      name="storagegroup"
      component={TextField}
      fullWidth
      label="Storage Group"
      helperText="List of storage groups.
storage-group - Returned storage is member of specified storage group.
-storage-group - Returned storage is not member of specified storage group."
    />
    <Field
      name="status"
      component={TextField}
      fullWidth
      label="Status"
      helperText="List of storage status.
status - Returned storage has this status.
-status - Returned storage does not have this status."
    />
    <Field
      name="url"
      component={TextField}
      fullWidth
      label="URL"
      helperText="Returns storages with a method matching this URL. May include wildcards * and ?."
    />
  </>
);

function StorageListParamsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(StorageListParamsForm);
