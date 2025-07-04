import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Delete from '@material-ui/icons/Delete';
import { Field, FieldArray } from 'redux-form';

import { TextField } from '../form';

import TextButton from './TextButton';

export function SimpleMetadataFieldRemove({ fields, onRestore }) {
  const removeField = (index) => {
    const thisField = fields.get(index);
    if (onRestore) {
      onRestore(thisField, index);
    }
    fields.remove(index);
  };
  return (
    <>
      {fields.length > 0 && <InputLabel shrink>Removed</InputLabel>}
      {fields.map((thisField, index) => (
        <Grid key={thisField} container direction="row" wrap="nowrap" spacing={4}>
          <Grid item sm={5}>
            <Field name={`${thisField}.key`} component={TextField} label="Key" disabled fullWidth />
          </Grid>
          <Grid item sm={5}>
            <Grid item>
              <Field
                name={`${thisField}.value`}
                component={TextField}
                label="Value"
                disabled
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item sm={2}>
            <IconButton onClick={() => removeField(index)}>
              <ArrowBack />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </>
  );
}

function InitialTextField(p) {
  return (
    <TextField
      disabled={p?.meta?.initial !== undefined}
      onFocus={p?.onFocus}
      onBlur={p?.onBlur}
      {...p}
    />
  );
}

export function SimpleMetadataFieldArray({ fields, buttonLabel, label, onAdd, onRemove }) {
  const addField = () => {
    fields.push();
    if (onAdd) {
      onAdd();
    }
  };
  const removeField = (index) => {
    const thisField = fields.get(index);
    if (onRemove) {
      onRemove(thisField, index);
    }
    fields.remove(index);
  };
  return (
    <Grid container direction="column">
      <InputLabel shrink>{label}</InputLabel>
      {fields.map((thisField, index) => (
        <Grid
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          container
          direction="row"
          wrap="nowrap"
          spacing={4}
        >
          <Grid item sm={5}>
            <Field name={`${thisField}.key`} component={InitialTextField} label="Key" fullWidth />
          </Grid>
          <Grid item sm={5}>
            <Grid item>
              <Field name={`${thisField}.value`} component={TextField} label="Value" fullWidth />
            </Grid>
          </Grid>
          <Grid item sm={2}>
            <IconButton onClick={() => removeField(index)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Grid item>
        <TextButton onClick={addField} color="primary" style={{ marginTop: 10 }}>
          {buttonLabel || 'Add Metadata'}
        </TextButton>
      </Grid>
    </Grid>
  );
}

export function SimpleMetadataTypeForm() {
  return <FieldArray name="field" component={SimpleMetadataFieldArray} />;
}

export default SimpleMetadataFieldArray;
