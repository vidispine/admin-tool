import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import Field from '../ui/Field';
import { required } from '../../utils/FieldValidation';

function ShapeComponentRemoveFileForm({
  error,
  handleSubmit,
  itemId,
  shapeId,
  componentId,
  fileId,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!itemId && (
        <Field
          name="itemId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      {!shapeId && (
        <Field
          name="shapeId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      {!componentId && (
        <Field
          name="componentId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      {!fileId && (
        <Field
          name="fileId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeComponentRemoveFileForm);
