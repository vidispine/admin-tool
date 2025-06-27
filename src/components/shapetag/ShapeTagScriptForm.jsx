import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import CodeField from '../ui/CodeField';
import Field from '../ui/Field';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';

function ShapeTagScriptForm({ error, handleSubmit, tagName }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {tagName === undefined ? (
        <Field name="tagName" label="Tag Name" component={InitialDisabledTextField} fullWidth />
      ) : null}
      <Field
        name="shapeTagScript"
        component={CodeField}
        nameAsTitle={false}
        options={{
          theme: 'material',
          mode: 'application/javascript',
          lineWrapping: true,
          lineNumbers: true,
        }}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeTagScriptForm);
