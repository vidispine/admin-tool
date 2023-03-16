import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import ShapeRemoveMimeTypeForm from './ShapeRemoveMimeTypeForm';
import * as formActions from '../../formactions/shape';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';

const SHAPE_REMOVE_MIMETYPE_FORM = 'SHAPE_REMOVE_MIMETYPE_FORM';

function ShapeRemoveMimeType({
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  itemId,
  shapeId,
  form = SHAPE_REMOVE_MIMETYPE_FORM,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Mime-Type Removed';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Removing Mime-Type';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Remove Mime-Type</DialogTitle>
      <DialogContent style={{ minHeight: 200 }}>
        <ShapeRemoveMimeTypeForm
          form={form}
          onSubmit={formActions.onRemoveShapeMime}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          itemId={itemId}
          shapeId={shapeId}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          size="small"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={() => submitForm(form)}
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(ShapeRemoveMimeType);
