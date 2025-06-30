import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { compose } from 'redux';

import { shapetag as ShapeTagApi } from '@vidispine/vdt-api';

import withUI from '../../hoc/withUI';

function ShapeTagRemove({ tagName, open, onClose, onSuccess, onFail, openSnackBar }) {
  const onRemove = () => {
    ShapeTagApi.removeShapeTag({ tagName })
      .then((response) => {
        const messageContent = `Shape Tag ${tagName} Removed`;
        openSnackBar({ messageContent });
        if (onSuccess) onSuccess(response);
        onClose();
      })
      .catch((error) => {
        const messageContent = 'Error Removing Shape Tag';
        openSnackBar({ messageContent, messageColor: 'secondary' });
        if (onFail) onFail(error);
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Remove Shape Tag "${tagName}"?`}</DialogTitle>
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

export default compose(withUI)(ShapeTagRemove);
