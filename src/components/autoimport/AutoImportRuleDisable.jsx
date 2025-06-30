import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { autoimport as AutoImportApi } from '@vidispine/vdt-api';

import withUI from '../../hoc/withUI';

function AutoImportRuleDisable({ open, onClose, openSnackBar, storageId, onSuccess }) {
  const onAbandon = () => {
    AutoImportApi.disableAutoImport({ storageId })
      .then(() => {
        const messageContent = 'Auto Import Rule Disabled';
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch(() => {
        const messageContent = 'Error Disabling Auto Import Rule ';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Disable ${storageId} Auto Import Rule`}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button variant="text" onClick={onAbandon} color="secondary" autoFocus>
          Disable
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withUI(AutoImportRuleDisable);
