import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/fieldgroup';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import DialogContent from '../ui/DialogContent';

import FieldGroupChildForm from './FieldGroupChildForm';

const FIELDGROUP_CHILD_FORM = 'FIELDGROUP_CHILD_FORM';

function FieldGroupChildDialog({ open, onClose, onSuccess, openSnackBar, submitForm, groupName }) {
  const onSubmitSuccess = (response) => {
    const { childGroupName } = response;
    const messageContent = `Field Group ${childGroupName} Added`;
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Adding Field Group';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Add Child Group</DialogTitle>
      <DialogContent>
        <FieldGroupChildForm
          form={FIELDGROUP_CHILD_FORM}
          onSubmit={formActions.onUpdateFieldGroupChild}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          groupName={groupName}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(FIELDGROUP_CHILD_FORM)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(FieldGroupChildDialog);
