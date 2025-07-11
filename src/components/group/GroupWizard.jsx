import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as formActions from '../../formactions/group';
import withUI from '../../hoc/withUI';
import WizardForm from '../ui/WizardForm';

import GroupForm from './GroupForm';

function GroupWizard({ open, onClose, onSuccess, openSnackBar }) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Group Created';
    openSnackBar({ messageContent });
    onClose();
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Group';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>New Group</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={GroupForm}
          documentName="groupDocument"
          onSubmit={formActions.onUpdateGroup}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

export default withUI(GroupWizard);
