import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { user as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function UserAliasRemoveDialog({
  open,
  onClose,
  openSnackBar,
  alias,
  userName,
  onSuccess,
}) {
  const onRemove = () => {
    api.removeAlias({ userName, alias })
      .then(() => {
        const messageContent = `Alias ${alias} Removed From ${userName}`;
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing Alias From User';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove Alias "${alias}" From "${userName}"?`}
      </DialogTitle>
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

export default withUI(UserAliasRemoveDialog);
