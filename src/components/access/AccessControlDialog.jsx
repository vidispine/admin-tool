import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/access';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import AccessControlForm from './AccessControlForm';

const EDIT_ACCESSCONTROL_FORM = 'EDIT_ACCESSCONTROL_FORM';

function AccessControlDialog({
  submitForm,
  onClose,
  open,
  onSuccess,
  openSnackBar,
  entityType,
  entityId,
}) {
  const onSubmitSuccess = () => {
    const messageContent = 'Access Control Created';
    openSnackBar({ messageContent });
    if (onSuccess) onSuccess();
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Access Control';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const initialValues = {
    queryParams: {
      allowDuplicate: true,
    },
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Create Access Control</DialogTitle>
      <DialogContent>
        <AccessControlForm
          form={EDIT_ACCESSCONTROL_FORM}
          onSubmit={formActions.onCreate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          entityType={entityType}
          entityId={entityId}
          initialValues={initialValues}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(EDIT_ACCESSCONTROL_FORM)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const AccessControlDialogWithUiWithFormActions = compose(
  withUI,
  withFormActions,
)(AccessControlDialog);

export default AccessControlDialogWithUiWithFormActions;
