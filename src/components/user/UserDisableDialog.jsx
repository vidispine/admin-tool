import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/user';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import DialogContent from '../ui/DialogContent';

import UserDisableForm from './UserDisableForm';

const USER_DISABLE_FORM = 'USER_DISABLE_FORM';

function UserDisableDialog({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  userName,
  form = USER_DISABLE_FORM,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const hard = props?.values?.queryParms?.hard;
    const messageContent = `User ${hard === true || hard === 'true' ? 'Removed' : 'Disabled'}`;
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Disabling / Removing User';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Disable User</DialogTitle>
      <DialogContent>
        <UserDisableForm
          form={form}
          onSubmit={formActions.onDisable}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          userName={userName}
          initialValues={{ queryParams: { hard: false, preserveAccess: false } }}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(form)}>
          Disable / Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(UserDisableDialog);
