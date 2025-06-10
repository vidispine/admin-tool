import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import * as actions from '../../actions';
import * as formActions from '../../formactions/taskgroup';

import TaskGroupForm from './TaskGroupForm';

const EDIT_TASKGROUP_FORM = 'EDIT_TASKGROUP_FORM';

function TaskGroupDialog({ submitForm, closeModal, isOpen, history, openSnackBar }) {
  const onSubmitSuccess = (response) => {
    const { taskGroupDocument } = response;
    const { name: groupName } = taskGroupDocument;
    const messageContent = `Task Group ${groupName} Created`;
    openSnackBar({ messageContent });
    history.push(`/task-group/${groupName}`);
    closeModal();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Task Group';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>New Task Group</DialogTitle>
      <DialogContent>
        <TaskGroupForm
          form={EDIT_TASKGROUP_FORM}
          onSubmit={formActions.onUpdate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(EDIT_TASKGROUP_FORM)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapDispatchToProps = {
  submitForm: submit,
  openSnackBar: actions.ui.openSnackBar,
};

export default connect(null, mapDispatchToProps)(TaskGroupDialog);
