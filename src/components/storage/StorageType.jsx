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

import StorageTypeForm from './StorageTypeForm';

const STORAGE_TYPE_FORM = 'STORAGE_TYPE_FORM';

function StorageType({ open, onClose, onSuccess, openSnackBar, submitForm, storageDocument }) {
  if (storageDocument === undefined) {
    return null;
  }
  const { id: storageId, type } = storageDocument;
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Storage Type Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Storage Type';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Change Storage Type</DialogTitle>
      <DialogContent>
        <StorageTypeForm
          form={STORAGE_TYPE_FORM}
          onSubmit={formActions.onUpdateStorageType}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          storageId={storageId}
          initialValues={{ type }}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(STORAGE_TYPE_FORM)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(StorageType);
