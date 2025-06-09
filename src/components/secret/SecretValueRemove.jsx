import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { secret as SecretApi } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function SecretValueRemove({
  open,
  alias,
  secretKey,
  onClose,
  openSnackBar,
  onSuccess,
  onError,
}) {
  const onRemove = async () => {
    try {
      await SecretApi.deleteSecretValue({ alias, key: secretKey });
      const messageContent = `Secret Value ${secretKey} Removed`;
      if (openSnackBar) openSnackBar({ messageContent });
      if (onClose) onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      const messageContent = 'Error Removing Secret Value';
      if (openSnackBar) openSnackBar({ messageContent, messageColor: 'secondary' });
      if (onError) onError(error);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Remove Secret Value "${secretKey}"?`}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button variant="text" onClick={onRemove} color="secondary" autoFocus>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withUI(SecretValueRemove);
