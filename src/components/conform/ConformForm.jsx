import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field, FieldArray, FormSection } from 'redux-form';

import { TextField } from '../form';
import SquareCard from '../ui/SquareCard';
import TextButton from '../ui/TextButton';

export function TimeBaseType({ label }) {
  return (
    <>
      <Field
        name="numerator"
        component={TextField}
        label={label ? `${label} Numerator` : 'Numerator'}
        type="number"
      />
      <Field
        name="denominator"
        component={TextField}
        label={label ? `${label} Denominator` : 'Denominator'}
        type="number"
      />
    </>
  );
}

export function ConformTimePointType({ label }) {
  return (
    <>
      <Field
        name="samples"
        component={TextField}
        label={label ? `${label} Sample` : 'Sample'}
        type="number"
      />
      <FormSection name="timeBase" component={TimeBaseType} label={label} />
    </>
  );
}

export function SegmentArray({ fields, maxFields = Infinity, minFields = 0, label }) {
  const addField = () => fields.push({});
  return (
    <>
      {fields.map((thisField, index) => (
        <SquareCard key={thisField}>
          <CardContent>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item sm={2}>
                {label && (
                  <InputLabel shrink>
                    {label} {index + 1}
                  </InputLabel>
                )}
              </Grid>
              <Grid item sm={2}>
                {minFields < fields.length && (
                  <Button size="small" color="secondary" onClick={() => fields.remove(index)}>
                    Remove Segment
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid container direction="row" key={thisField} alignItems="flex-end" spacing={16}>
              <Grid item sm={8}>
                <Field
                  name={`${thisField}.source.id`}
                  component={TextField}
                  label="Source ID"
                  fullWidth
                />
                <Grid container direction="row" justifyContent="space-between">
                  <FormSection
                    name={`${thisField}.source.interval.start`}
                    component={ConformTimePointType}
                    label="Start"
                  />
                </Grid>
                <Grid container direction="row" justifyContent="space-between">
                  <FormSection
                    name={`${thisField}.source.interval.end`}
                    component={ConformTimePointType}
                    label="End"
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </SquareCard>
      ))}
      {maxFields > fields.length && (
        <Grid container direction="column" justifyContent="flex-start" alignItems="stretch">
          <TextButton onClick={addField} color="primary">
            Add Segment
          </TextButton>
        </Grid>
      )}
    </>
  );
}

function ConformForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FieldArray
        name="conformRequestDocument.conform.timeline.segment"
        component={SegmentArray}
        label="Segment"
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ConformForm);
