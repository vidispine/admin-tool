import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as formActions from '../../formactions/storagerule';
import withUI from '../../hoc/withUI';
import WizardForm from '../ui/WizardForm';

import { StorageRuleEntityForm } from './StorageRuleForm';

function StorageRuleTagDialog({ open, onClose, openSnackBar, onSuccess, tagName }) {
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
          onSubmit={formActions.onUpdateShapeTag}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          tagName={tagName}
        />
      </DialogContent>
    </Dialog>
  );
}

export default withUI(StorageRuleTagDialog);
