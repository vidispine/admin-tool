import React from 'react';
import { reduxForm } from 'redux-form';
import Typography from '@material-ui/core/Typography';

import FormSection from '../ui/FormSection';
import { ItemSearchType } from '../item/ItemSearchForm';

function FileSearchForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="fileSearchDocument" component={ItemSearchType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(FileSearchForm);
