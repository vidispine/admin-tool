import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { ItemSearchType } from '../item/ItemSearchForm';
import FormSection from '../ui/FormSection';

function FieldGroupSearchForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="metadataFieldGroupSearchDocument" component={ItemSearchType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(FieldGroupSearchForm);
