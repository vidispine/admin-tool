import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/vxa';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import VxaForm from './VxaForm';

const EDIT_AGENT_FORM = 'EDIT_AGENT_FORM';

function VxaDialog({ open, onClose, openSnackBar, onSuccess, submitForm }) {
  const onSubmitSuccess = (response) => {
    const messageContent = 'Agent Created';
    openSnackBar({ messageContent });
    onClose();
    onSuccess(response);
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Agent';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>New Agent</DialogTitle>
      <DialogContent>
        <VxaForm
          form={EDIT_AGENT_FORM}
          onSubmit={formActions.onCreate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(EDIT_AGENT_FORM)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(VxaDialog);
