import Grid from '@material-ui/core/Grid';
import { reduxForm, Field } from 'redux-form';

import { TextField } from '../form';

function ProjectionNameForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" justifyContent="flex-start" alignItems="stretch">
        <Grid item>
          <Field
            name="projectionId"
            label="Projection Name"
            component={TextField}
            fullWidth
            required
          />
        </Grid>
      </Grid>
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ProjectionNameForm);
