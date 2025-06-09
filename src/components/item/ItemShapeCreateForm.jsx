import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { TextField } from '../form';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import { required } from '../../utils/FieldValidation';
import CodeField from '../ui/CodeField';

const queryParams = () => (
  <>
    <Field
      name="tag"
      label="Shape Tag"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="updateItemMetadata"
          component={BoolCheckbox}
        />
      )}
      label="Update Item Metadata"
    />

  </>
);

function ItemShapeCreateForm({
  error,
  handleSubmit,
  itemId,
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
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <Field
        name="shapeDocument"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/json',
          lineWrapping: true,
          lineNumbers: true,
        }}
      />

      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ItemShapeCreateForm);
