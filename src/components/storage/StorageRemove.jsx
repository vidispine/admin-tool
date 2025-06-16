import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/storage';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import DialogContent from '../ui/DialogContent';

import StorageRemoveForm from './StorageRemoveForm';

const STORAGE_REMOVE_FORM = 'STORAGE_REMOVE_FORM';

function StorageRemove({ open, onClose, onSuccess, onFail, openSnackBar, submitForm, storageId }) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Storage Deleted';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Deleting Storage';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Delete Storage ${storageId}`}</DialogTitle>
      <DialogContent>
        <StorageRemoveForm
          form={STORAGE_REMOVE_FORM}
          onSubmit={formActions.onRemove}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          storageId={storageId}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="secondary" onClick={() => submitForm(STORAGE_REMOVE_FORM)}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(StorageRemove);
