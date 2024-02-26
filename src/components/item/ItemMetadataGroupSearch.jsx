import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import CardContent from '@material-ui/core/CardContent';
import Accordion from '@material-ui/core/Accordion';

import ItemMetadataGroupSearchForm from './ItemMetadataGroupSearchForm';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';
import withExpansion from '../../hoc/withExpansion';
import * as formActions from '../../formactions/item';

export const ITEM_METADATAGROUPSEARCH_FORM = 'ITEM_METADATAGROUPSEARCH_FORM';

function ItemMetadataGroupSearch({
  onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  expanded,
  onChangeExpansion,
  form = ITEM_METADATAGROUPSEARCH_FORM,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onChangeExpansion) {
      onChangeExpansion(null, false);
    }
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Searching Items';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Accordion expanded={expanded} onChange={onChangeExpansion}>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Metadata Group Search Document
        </Typography>
      </AccordionSummary>
      <CardContent>
        <ItemMetadataGroupSearchForm
          form={form}
          onSubmit={formActions.onSearchItemMetadataGroup}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          {...formProps}
        />
      </CardContent>
      <Divider />
      <AccordionActions>
        <Button size="small" onClick={() => resetForm(form)}>
          Reset
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(form)}>
          Update
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default compose(
  withSnackbar,
  withFormActions,
  withExpansion,
)(ItemMetadataGroupSearch);
