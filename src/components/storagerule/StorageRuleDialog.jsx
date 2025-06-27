import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as formActions from '../../formactions/storagerule';
import withUI from '../../hoc/withUI';
import WizardForm from '../ui/WizardForm';

import StorageRuleForm from './StorageRuleForm';

function StorageRuleDialog({ open, onClose, openSnackBar, onSuccess, tagName }) {
  const onSubmitSuccess = (response) => {
    const messageContent = 'Storage Rule Created';
    openSnackBar({ messageContent });
    onClose();
    if (onSuccess) {
      onSuccess(response);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Storage Rule';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>New Storage Rule</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={StorageRuleForm}
          documentName="storageRuleDocument"
          onSubmit={formActions.onUpdateEntity}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

export default withUI(StorageRuleDialog);
