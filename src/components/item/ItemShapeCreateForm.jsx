import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { required } from '../../utils/FieldValidation';
import { TextField } from '../form';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import CodeField from '../ui/CodeField';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';

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
      creatable
    />
    <FormControlLabel
      control={<Field name="updateItemMetadata" component={BoolCheckbox} />}
      label="Update Item Metadata"
    />
  </>
);

function ItemShapeCreateForm({ error, handleSubmit, itemId }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!itemId && <Field name="itemId" component={TextField} validate={[required]} fullWidth />}
      <FormSection name="queryParams" component={queryParams} />
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
