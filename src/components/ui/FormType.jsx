import Grid from '@material-ui/core/Grid';

import { TextField } from '../form';

import Field from './Field';
import FieldTypeArray from './FieldTypeArray';

export function KeyValuePairType({ dense = true }) {
  return dense ? (
    <Grid container spacing={8}>
      <Grid item sm={6}>
        <Field name="key" label="key" component={TextField} fullWidth />
      </Grid>
      <Grid item sm={6}>
        <Field name="value" label="value" component={TextField} fullWidth />
      </Grid>
    </Grid>
  ) : (
    <>
      <Field name="key" label="key" component={TextField} fullWidth />
      <Field name="value" label="value" component={TextField} fullWidth />
    </>
  );
}

export function SimpleMetadataType({ dense = true }) {
  return (
    <FieldTypeArray
      name="field"
      arrayHeader="field"
      withHeader={false}
      component={KeyValuePairType}
      dense={dense}
    />
  );
}
