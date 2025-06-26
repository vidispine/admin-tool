import { Fragment } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';
import { reduxForm, Field, FormSection, FieldArray } from 'redux-form';

import { Select, TextField } from '../form';
import { loadJobTypeOptions } from '../jobtype/JobTypeSelect';
import ChipInput from '../ui/ChipInput';
import { SimpleMetadataType } from '../ui/FormType';
import { StatefulAsyncSelect } from '../ui/Select';
import TextButton from '../ui/TextButton';

function InitialDisabledTextField(props) {
  return (
    <TextField
      disabled={props?.meta.initial !== undefined}
      onFocus={props?.onFocus}
      onBlur={props?.onBlur}
      {...props}
    />
  );
}

function TranscoderArray({ fields }) {
  return (
    <>
      {fields.map((thisField, index) => (
        <Grid key={thisField} container direction="row" wrap="nowrap" spacing={16}>
          <Grid item sm={10}>
            <Field name={`${thisField}.id`} component={TextField} label="Transcoder ID" fullWidth />
          </Grid>
          <Grid item sm={2}>
            <IconButton onClick={() => fields.remove(index)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <TextButton onClick={() => fields.push()} color="primary" style={{ marginTop: 10 }}>
        Add Transcoder
      </TextButton>
    </>
  );
}

function DataArray({ fields }) {
  return (
    <>
      {fields.map((thisField, index) => (
        <Grid key={thisField} container direction="row" wrap="nowrap" spacing={16}>
          <Grid item sm={5}>
            <Field name={`${thisField}.key`} component={TextField} label="Data Key" fullWidth />
          </Grid>
          <Grid item sm={5}>
            <Field name={`${thisField}.value`} component={TextField} label="Data Value" fullWidth />
          </Grid>
          <Grid item sm={2}>
            <IconButton onClick={() => fields.remove(index)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <TextButton onClick={() => fields.push()} color="primary" style={{ marginTop: 10 }}>
        Add Data
      </TextButton>
    </>
  );
}

function JobArray({ fields }) {
  return (
    <>
      {fields.map((thisField, index) => (
        <Fragment key={thisField}>
          <Grid key={thisField} container direction="row" wrap="nowrap" spacing={16}>
            <Grid item sm={10}>
              <Field
                name={`${thisField}.type`}
                label="Job Type"
                component={StatefulAsyncSelect}
                loadOptions={loadJobTypeOptions}
                isMulti
                cacheOptions
                isClearable
                fullWidth
              />
              <Field
                name={`${thisField}.priority`}
                label="Job Priority"
                component={ChipInput}
                simple
                fullWidth
              />
              <Field
                name={`${thisField}.user`}
                label="Job User"
                component={ChipInput}
                simple
                fullWidth
              />
              <Field
                name={`${thisField}.group`}
                label="Job Group"
                component={ChipInput}
                simple
                fullWidth
              />
            </Grid>
            <Grid item sm={2}>
              <IconButton onClick={() => fields.remove(index)}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
          <FieldArray name={`${thisField}.data`} component={DataArray} />
        </Fragment>
      ))}
      <TextButton onClick={() => fields.push()} color="primary" style={{ marginTop: 10 }}>
        Add Job
      </TextButton>
    </>
  );
}

function TaskGroupType() {
  return (
    <>
      <Field name="name" component={InitialDisabledTextField} label="Name" required fullWidth />
      <FormControl fullWidth>
        <InputLabel htmlFor="priority">Priority</InputLabel>
        <Field name="priority" component={Select}>
          <MenuItem value="HIGHEST">HIGHEST</MenuItem>
          <MenuItem value="HIGH">HIGH</MenuItem>
          <MenuItem value="MEDIUM">MEDIUM</MenuItem>
          <MenuItem value="LOW">LOW</MenuItem>
          <MenuItem value="LOWEST">LOWEST</MenuItem>
        </Field>
      </FormControl>
      <Field name="maxConcurrency" component={TextField} label="Max Concurrency" fullWidth />
      <Grid container direction="column">
        <FieldArray name="transcoder" component={TranscoderArray} />
      </Grid>
      <Grid container direction="column">
        <FieldArray name="job" component={JobArray} />
      </Grid>
      <FormSection name="metadata" component={SimpleMetadataType} />
    </>
  );
}

function TaskGroupForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="taskGroupDocument" component={TaskGroupType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(TaskGroupForm);
