import { Fragment } from 'react';

import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';
import { reduxForm, Field, FormSection, FieldArray } from 'redux-form';

import {
  AccessControlMetadataType,
  AccessControlShapeType,
  AccessControlUriType,
} from '../access/AccessControlForm';
import { TextField, Select } from '../form';
import GroupSelect from '../group/GroupSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import DynamicSelect from '../ui/DynamicSelect';
import TextButton from '../ui/TextButton';
import UserSelect from '../user/UserSelect';

function AccessControlType({ fields }) {
  return (
    <>
      <InputLabel>Access Control</InputLabel>
      {fields.map((thisField, index) => (
        <Fragment key={thisField}>
          <Grid container direction="row" wrap="nowrap" spacing={16} style={{ marginTop: '10px' }}>
            <Grid item sm={8}>
              <Field
                name={`${thisField}`}
                component={DynamicSelect}
                label="Entity"
                fullWidth
                choices={{
                  user: (
                    <UserSelect name={`${thisField}.user`} label="User" isClearable fullWidth />
                  ),
                  group: (
                    <GroupSelect name={`${thisField}.group`} label="Group" isClearable fullWidth />
                  ),
                }}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="group">Group</MenuItem>
              </Field>
              <Field
                name={`${thisField}.priority`}
                component={TextField}
                label="Priority"
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel htmlFor={`${thisField}.permission`}>Permission</InputLabel>
                <Field name={`${thisField}.permission`} component={Select}>
                  <MenuItem value="READ">Read</MenuItem>
                  <MenuItem value="WRITE">Write</MenuItem>
                  <MenuItem value="ALL">All</MenuItem>
                  <MenuItem value="OWNER">Owner</MenuItem>
                  <MenuItem value="NONE">None</MenuItem>
                </Field>
              </FormControl>
              <UserSelect name={`${thisField}.grantor`} label="Grantor" isClearable fullWidth />
              <FormControlLabel
                control={<Field name={`${thisField}.recursive`} component={BoolCheckbox} />}
                label="Recursive"
              />
              <Field
                name={`${thisField}.operation`}
                component={DynamicSelect}
                label="Operation"
                fullWidth
                choices={{
                  metadata: (
                    <FormSection
                      name={`${thisField}.operation.metadata`}
                      component={AccessControlMetadataType}
                    />
                  ),
                  shape: (
                    <FormSection
                      name={`${thisField}.operation.shape`}
                      component={AccessControlShapeType}
                    />
                  ),
                  uri: (
                    <FormSection
                      name={`${thisField}.operation.uri`}
                      component={AccessControlUriType}
                    />
                  ),
                }}
              >
                <MenuItem value="metadata">Metadata</MenuItem>
                <MenuItem value="shape">Shape</MenuItem>
                <MenuItem value="uri">URI</MenuItem>
              </Field>
            </Grid>
            <Grid item sm="auto">
              <IconButton onClick={() => fields.remove(index)}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
          <Divider />
        </Fragment>
      ))}
      <Grid item>
        <TextButton onClick={() => fields.push()} color="primary">
          Add Access
        </TextButton>
      </Grid>
    </>
  );
}

function ImportSettingsType() {
  return <FieldArray name="access" component={AccessControlType} />;
}

function ImportSettingsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="importSettingsDocument" component={ImportSettingsType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ImportSettingsForm);
