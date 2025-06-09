import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';

import { RadioGroup, TextField } from '../form';
import { formatNumber } from '../form/utils';
import Field from './Field';
import {
  TEXT_TIME,
  SMPTE_TIME,
  SECONDS_TIME,
  PAL_TIMEBASE,
  NTSC_TIMEBASE,
  NTSC30_TIMEBASE,
  F2398_TIMEBASE,
  F24_TIMEBASE,
} from '../../const/Time';

function TimeRepresentationForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormControl component="fieldset">
        <FormLabel component="legend">Display</FormLabel>
        <Field name="to" component={RadioGroup}>
          <FormControlLabel
            value={TEXT_TIME}
            control={<Radio />}
            label="Text"
          />
          <FormControlLabel
            value={SMPTE_TIME}
            control={<Radio />}
            label="SMPTE"
          />
          <FormControlLabel
            value={SECONDS_TIME}
            control={<Radio />}
            label="Seconds"
          />
        </Field>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Conform</FormLabel>
        <Field name="conform" component={RadioGroup}>
          <FormControlLabel
            value=""
            control={<Radio />}
            label="As Original"
          />
          <FormControlLabel
            value={PAL_TIMEBASE}
            control={<Radio />}
            label="PAL"
          />
          <FormControlLabel
            value={NTSC_TIMEBASE}
            control={<Radio />}
            label="NTSC"
          />
          <FormControlLabel
            value={NTSC30_TIMEBASE}
            control={<Radio />}
            label="NTSC30"
          />
          <FormControlLabel
            value={F2398_TIMEBASE}
            control={<Radio />}
            label="23.98"
          />
          <FormControlLabel
            value={F24_TIMEBASE}
            control={<Radio />}
            label="24"
          />
        </Field>
      </FormControl>
      <FormControl component="fieldset">
        <Field
          name="conform.denominator"
          component={TextField}
          label="Denominator"
          type="number"
          parse={formatNumber}
        />
        <Field
          name="conform.numerator"
          component={TextField}
          label="Numerator"
          type="number"
          parse={formatNumber}
        />
      </FormControl>
    </form>
  );
}

export default reduxForm()(TimeRepresentationForm);
