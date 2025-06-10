import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/file';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import DialogContent from '../ui/DialogContent';

import FileStateForm from './FileStateForm';

const FILE_STATE_FORM = 'FILE_STATE_FORM';

function FileState({ open, onClose, onSuccess, openSnackBar, submitForm, fileDocument }) {
  if (fileDocument === undefined) {
    return null;
  }
  const { id: fileId, state } = fileDocument;
  const onSubmitSuccess = () => {
    const messageContent = 'File State Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating File State';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Change File State</DialogTitle>
      <DialogContent>
        <FileStateForm
          form={FILE_STATE_FORM}
          onSubmit={formActions.onUpdateFileState}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          fileId={fileId}
          initialValues={{ state }}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(FILE_STATE_FORM)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(FileState);
