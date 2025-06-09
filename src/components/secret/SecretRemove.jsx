import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { secret as SecretApi } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function SecretRemove({
  open,
  alias,
  onClose,
  openSnackBar,
  onSuccess,
  onError,
}) {
  const onRemove = async () => {
    try {
      await SecretApi.deleteSecret({ alias });
      const messageContent = `Secret ${alias} Removed`;
      if (openSnackBar) openSnackBar({ messageContent });
      if (onClose) onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      const messageContent = 'Error Removing Secret';
      if (openSnackBar) openSnackBar({ messageContent, messageColor: 'secondary' });
      if (onError) onError(error);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Remove Secret "${alias}"?`}</DialogTitle>
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

export default withUI(SecretRemove);
