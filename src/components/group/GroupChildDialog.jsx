import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/group';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import DialogContent from '../ui/DialogContent';

import { GroupChildForm } from './GroupForm';

const GROUP_CHILD_FORM = 'GROUP_CHILD_FORM';

function GroupChildDialog({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  groupName,
  groupDocument,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Groups Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Adding Groups';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Add Groups To ${groupName}`}</DialogTitle>
      <DialogContent>
        <GroupChildForm
          form={GROUP_CHILD_FORM}
          onSubmit={formActions.onUpdateGroup}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          groupName={groupName}
          initialValues={groupDocument}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(GROUP_CHILD_FORM)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(GroupChildDialog);
