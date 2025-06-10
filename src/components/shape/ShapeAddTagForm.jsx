import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { required } from '../../utils/FieldValidation';
import { TextField } from '../form';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import Field from '../ui/Field';
import { StatefulAsyncSelect } from '../ui/Select';

function ShapeTagAddForm({ error, handleSubmit, itemId, shapeId }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!itemId && <Field name="itemId" component={TextField} validate={[required]} fullWidth />}
      {!shapeId && <Field name="shapeId" component={TextField} validate={[required]} fullWidth />}
      <Field
        name="tagName"
        label="Shape Tag"
        component={StatefulAsyncSelect}
        loadOptions={loadShapeTagOptions}
        cacheOptions
        isClearable
        fullWidth
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeTagAddForm);
