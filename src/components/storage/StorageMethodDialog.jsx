import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { compose } from 'redux';

import * as formActions from '../../formactions/storage';
import withUI from '../../hoc/withUI';
import WizardForm from '../ui/WizardForm';

import { StorageMethodForm } from './StorageForm';

function StorageMethodDialog({ open, onClose, openSnackBar, storageId, onRefresh }) {
  const onSubmitSuccess = () => {
    const messageContent = 'Storage Method Added';
    openSnackBar({ messageContent });
    onRefresh();
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Adding Storage Method';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>New Storage Method</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={StorageMethodForm}
          documentName="storageMethodDocument"
          onSubmit={formActions.onMethodCreate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          storageId={storageId}
        />
      </DialogContent>
    </Dialog>
  );
}

export default compose(withUI)(StorageMethodDialog);
