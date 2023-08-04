import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { analyzepreset as AnalyzePresetApi } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function AnalyzePresetRemove({
  preset,
  open,
  onClose,
  openSnackBar,
  onSuccess,
}) {
  const onRemove = () => {
    AnalyzePresetApi.getAnalyzePreset({ preset, method: 'DELETE' })
      .then(() => {
        const messageContent = `Analyze Preset ${preset} Removed`;
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess({ preset }); }
      })
      .catch(() => {
        const messageContent = 'Error Removing Analyze Preset';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove Analyze Preset "${preset}"?`}
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

export default withUI(AnalyzePresetRemove);
