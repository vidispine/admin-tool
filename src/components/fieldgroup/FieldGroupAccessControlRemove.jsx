import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import { fieldgroup as MetadataFieldGroupApi } from '@vidispine/vdt-api';

import withUI from '../../hoc/withUI';

export const REMOVE_FIELDGROUP_ACCESS_DIALOG = 'REMOVE_FIELDGROUP_ACCESS_DIALOG';

function FieldGroupAccessControlRemove({
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
  groupName,
  accessId,
}) {
  const onRemove = async () => {
    try {
      await MetadataFieldGroupApi.removeFieldGroupAccess({ groupName, accessId });
      const messageContent = `Metadata Field Group Access ${accessId} Removed`;
      openSnackBar({ messageContent });
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      const messageContent = 'Error Removing Metadata Field Group Access';
      if (onFail) onFail(error);
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Delete Access ID ${accessId} for field ${groupName}`}</DialogTitle>
      <Divider />
      <DialogActions>
        <Button size="small" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="secondary" onClick={onRemove}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI)(FieldGroupAccessControlRemove);
