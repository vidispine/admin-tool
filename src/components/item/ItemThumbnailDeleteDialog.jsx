import { compose } from 'redux';
import { thumbnail as ThumbnailApi } from '@vidispine/vdt-api';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import withUI from '../../hoc/withUI';
import parseThumbnailUri from '../../utils/parseThumbnailUri';

export const DIALOG_NAME = 'ITEMTHUMBNAILDELETE_DIALOG';

function ItemThumbnailDeleteDialog({
  open,
  onClose,
  uri,
  onSuccess,
  onError,
  openSnackBar,
}) {
  if (open === false) return null;
  const {
    resourceId, itemId, time, isPoster,
  } = parseThumbnailUri(uri);
  const apiHandler = isPoster
    ? ThumbnailApi.removePoster
    : ThumbnailApi.removeThumbnail;
  const onClick = () => apiHandler({ resourceId, itemId, time })
    .then(() => {
      const messageContent = 'Thumbnail Deleted';
      openSnackBar({ messageContent });
      if (onSuccess) onSuccess();
      onClose();
    })
    .catch(() => {
      const messageContent = 'Error Deleting Thumbnail';
      openSnackBar({ messageContent, messageColor: 'secondary' });
      if (onError) onError();
    });
  return (
    <Dialog open={open} onClose={onClose} maxWidth={false}>
      <DialogTitle>{`Remove ${isPoster ? 'Poster' : 'Thumbnail'} ${time}?`}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button variant="text" onClick={onClick} color="secondary" autoFocus>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(
  withUI,
)(ItemThumbnailDeleteDialog);
