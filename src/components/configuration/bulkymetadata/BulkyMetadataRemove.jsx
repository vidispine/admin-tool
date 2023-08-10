import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { configuration as ConfigurationApi } from '@vidispine/vdt-api';
import withUI from '../../../hoc/withUI';

function BulkyMetadataRemove({
  open,
  onClose,
  openSnackBar,
  onSuccess,
  onError,
}) {
  const onRemove = () => {
    ConfigurationApi.updateBulkyMetadataConfiguration({
      bulkyMetadataConfigurationDocument: { uri: null },
    })
      .then(() => {
        const messageContent = 'Bulky Metadata Configuration Removed';
        openSnackBar({ messageContent });
        if (onSuccess) onSuccess();
        onClose();
      })
      .catch(() => {
        const messageContent = 'Error Removing Bulky Metadata Configuration';
        openSnackBar({ messageContent, messageColor: 'secondary' });
        if (onError) onError();
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        Remove Bulky Metadata Configuration?
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

export default withUI(BulkyMetadataRemove);
