import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as formActions from '../../formactions/storagerule';
import withUI from '../../hoc/withUI';
import WizardForm from '../ui/WizardForm';

import { StorageRuleEntityForm } from './StorageRuleForm';

function StorageRuleEntityDialog({ open, onClose, openSnackBar, onSuccess, entityType, entityId }) {
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
          FormComponent={StorageRuleEntityForm}
          documentName="storageRuleDocument"
          onSubmit={formActions.onUpdateEntity}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          entityType={entityType}
          entityId={entityId}
        />
      </DialogContent>
    </Dialog>
  );
}

export default withUI(StorageRuleEntityDialog);
