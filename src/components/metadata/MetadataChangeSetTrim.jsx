import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { metadata as MetadataApi } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function MetadataChangeSetTrim({
  open,
  onClose,
  openSnackBar,
  onSuccess,
  entity,
  entityId,
  changesetId,
}) {
  const onRemove = () => {
    MetadataApi.trimEntityMetadataChange({ entity, entityId, changesetId })
      .then(() => {
        const messageContent = `Change Set ${changesetId} Trimmed`;
        if (openSnackBar) openSnackBar({ messageContent });
        if (onClose) onClose();
        if (onSuccess) onSuccess();
      })
      .catch(() => {
        const messageContent = 'Error Trimming Change Set';
        if (openSnackBar) openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Trim Change Set ${changesetId}`}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button variant="text" onClick={onRemove} color="secondary" autoFocus>
          Trim
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withUI(MetadataChangeSetTrim);
