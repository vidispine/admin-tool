import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { notification as api } from '@vidispine/vdt-api';

import withUI from '../../hoc/withUI';

function NotificationRemove({
  open,
  onClose,
  openSnackBar,
  notificationId,
  entityType,
  entityId,
  onSuccess,
}) {
  const onRemovePlaceholder = () => {
    const path = `/API/notification/${notificationId}`;
    api
      .removeNotification({ notificationId, entityType: 'placeholder', path })
      .then(() => {
        const messageContent = `Notification ${notificationId} Removed`;
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch(() => {
        const messageContent = 'Error Removing Notification';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  const onRemoveResource = () => {
    api
      .removeNotification({ notificationId, entityType })
      .then(() => {
        const messageContent = `Notification ${notificationId} Removed`;
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch(() => {
        const messageContent = 'Error Removing Notification';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  const onRemoveEntity = () => {
    api
      .removeNotificationEntity({ notificationId, entityType, entityId })
      .then(() => {
        const messageContent = `Notification ${notificationId} Removed`;
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch(() => {
        const messageContent = 'Error Removing Notification';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  let onRemove = onRemovePlaceholder;
  if (entityId && entityType) onRemove = onRemoveEntity;
  else if (entityType) onRemove = onRemoveResource;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Remove Notification ${notificationId}?`}</DialogTitle>
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

export default withUI(NotificationRemove);
