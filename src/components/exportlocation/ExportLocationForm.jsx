import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { loadProjectionOptions } from '../projection/ProjectionSelect';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import CodeField from '../ui/CodeField';
import Field from '../ui/Field';
import FieldArray from '../ui/FieldArray';
import FormSection from '../ui/FormSection';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';
import { StatefulAsyncSelect } from '../ui/Select';
import UrlField from '../ui/UrlField';

function ExportLocationType() {
  return (
    <>
      <Field name="name" label="name" component={InitialDisabledTextField} fullWidth />
      <FieldArray name="uriList" label="URI" component={UrlField} />
      <Field
        name="tag"
        label="Shape Tag"
        component={StatefulAsyncSelect}
        loadOptions={loadShapeTagOptions}
        cacheOptions
        isClearable
        fullWidth
        isMulti
        creatable
      />
      <Field
        name="projection"
        label="Projection"
        component={StatefulAsyncSelect}
        loadOptions={loadProjectionOptions}
        cacheOptions
        isClearable
        fullWidth
        creatable
      />
      <Field
        name="script"
        label="Script"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/json',
          lineWrapping: true,
          lineNumbers: true,
        }}
      />
    </>
  );
}

function ExportLocationForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="exportLocationDocument" component={ExportLocationType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ExportLocationForm);
