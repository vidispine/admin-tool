import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { metadatafield as api } from '@vidispine/vdt-api';

import withUI from '../../hoc/withUI';

function MetadataFieldRemove({ open, onClose, history, openSnackBar, fieldName, onSuccess }) {
  const onRemove = () => {
    api
      .removeMetadataField({ fieldName })
      .then(() => {
        const messageContent = `Metadata Field ${fieldName} Removed`;
        openSnackBar({ messageContent });
        history.push('/metadata-field/');
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch(() => {
        const messageContent = 'Error Removing Metadata Field';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Remove Metadata Field "${fieldName}"?`}</DialogTitle>
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

export default withUI(MetadataFieldRemove);
