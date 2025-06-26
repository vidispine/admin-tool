import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { ItemSearchType } from '../item/ItemSearchForm';
import FormSection from '../ui/FormSection';

function ShapeSearchForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="shapeSearchDocument" component={ItemSearchType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeSearchForm);
