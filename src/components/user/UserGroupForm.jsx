import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { loadGroupOptions } from '../group/GroupSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';

function GroupType() {
  return (
    <Field
      name="groupName"
      label="Group"
      component={StatefulAsyncSelect}
      loadOptions={loadGroupOptions}
      cacheOptions
      isClearable
    />
  );
}

function GroupListType() {
  return <FieldTypeArray name="group" label="Group" component={GroupType} />;
}

const queryParams = () => (
  <FormControlLabel
    control={<Field name="move" component={BoolCheckbox} />}
    label="Move All Groups"
  />
);

function UserGroupForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="queryParams" component={queryParams} />
      <FormSection name="groupListDocument" component={GroupListType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(UserGroupForm);
