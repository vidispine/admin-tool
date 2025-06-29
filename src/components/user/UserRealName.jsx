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

import UserRealNameForm from './UserRealNameForm';

const USER_REALNAME_FORM = 'USER_PASSWORD_FORM';

function UserRealName({ open, onClose, onSuccess, openSnackBar, submitForm, userName, realName }) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Real Name Changed';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Changing Real Name';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Change Real Name</DialogTitle>
      <DialogContent>
        <UserRealNameForm
          form={USER_REALNAME_FORM}
          onSubmit={formActions.onUpdateRealName}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          userName={userName}
          initialValues={{ realName }}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(USER_REALNAME_FORM)}>
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(UserRealName);
