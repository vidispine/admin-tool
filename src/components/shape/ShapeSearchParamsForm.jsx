import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';

const queryParams = () => (
  <>
    <Field
      name="content"
      component={StatefulAsyncSelect}
      isMulti
      options={[
        { value: 'component', label: 'Component' },
        { value: 'metadata', label: 'Metadata' },
        { value: 'essenceVersion', label: 'Essence Version' },
        { value: 'tag', label: 'Tag' },
        { value: 'mimeType', label: 'Mime Type' },
        { value: '*', label: 'All' },
      ]}
      fullWidth
    />
    <Field name="methodType" component={TextField} fullWidth />
    <Field name="storageType" component={TextField} fullWidth />
    <Field name="methodMetadata" component={TextField} fullWidth />
    <Field name="scheme" component={TextField} fullWidth />
    <FormControlLabel control={<Field name="count" component={BoolCheckbox} />} label="Count" />
    <Field name="first" component={TextField} type="number" fullWidth />
    <Field name="number" component={TextField} type="number" fullWidth />
  </>
);

function ShapeSearchParamsForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeSearchParamsForm);
