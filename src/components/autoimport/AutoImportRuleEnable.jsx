import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { autoimport as AutoImportApi } from '@vidispine/vdt-api';

import withUI from '../../hoc/withUI';

function AutoImportRuleEnable({ open, onClose, openSnackBar, storageId, onSuccess }) {
  const onAbandon = () => {
    AutoImportApi.enableAutoImport({ storageId })
      .then(() => {
        const messageContent = 'Auto Import Rule Enabled';
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch(() => {
        const messageContent = 'Error Enabling Auto Import Rule ';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Enable ${storageId} Auto Import Rule`}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button variant="text" onClick={onAbandon} color="secondary" autoFocus>
          Enable
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withUI(AutoImportRuleEnable);
