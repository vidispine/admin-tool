import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { compose } from 'redux';

import * as formActions from '../../formactions/storage';
import withUI from '../../hoc/withUI';
import WizardForm from '../ui/WizardForm';

import StorageForm from './StorageForm';

function StorageDialog({ open, onClose, onSuccess, openSnackBar }) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const { storageDocument } = response;
    const { id: storageId } = storageDocument;
    const messageContent = `Storage ${storageId} Created`;
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Storage';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>New Storage</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={StorageForm}
          documentName="storageDocument"
          onSubmit={formActions.onCreate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

export default compose(withUI)(StorageDialog);
