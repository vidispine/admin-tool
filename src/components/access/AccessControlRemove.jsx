import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { access as AccessApi } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function AccessControlRemove({
  open,
  onClose,
  openSnackBar,
  onSuccess,
  onError,
  accessId,
  entityId,
  entityType,
}) {
  const onRemove = () => {
    AccessApi.removeEntityAccess({ accessId, entityId, entityType })
      .then((response) => {
        const messageContent = `Access Control "${accessId}" Removed`;
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) onSuccess(response);
      })
      .catch((error) => {
        const messageContent = 'Error Removing Access Control';
        openSnackBar({ messageContent, messageColor: 'secondary' });
        if (onError) onError(error);
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Remove Import Setting ${accessId} ?`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Users may no longer be able to access this.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="text"
          onClick={onRemove}
          color="secondary"
          autoFocus
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withUI(AccessControlRemove);
