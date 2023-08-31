import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import ItemAnalyzeForm from './ItemAnalyzeForm';
import * as formActions from '../../formactions/item';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';

const ITEM_ANALYZE_FORM = 'ITEM_ANALYZE_FORM';

function ItemAnalyze({
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  itemId,
  form = ITEM_ANALYZE_FORM,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Analyze Job Created';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Creating Analyze Job';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Start Item Analyze Job</DialogTitle>
      <DialogContent style={{ minHeight: 200 }}>
        <ItemAnalyzeForm
          form={form}
          onSubmit={formActions.onCreateItemAnalyze}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          itemId={itemId}
          initialValues={{}}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          size="small"
          color="secondary"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(form)}
        >
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(ItemAnalyze);
