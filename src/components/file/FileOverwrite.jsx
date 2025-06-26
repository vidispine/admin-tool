import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/file';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import FileOverwriteForm from './FileOverwriteForm';

const FILE_OVERWRITE_FORM = 'FILE_OVERWRITE_FORM';

function FileOverwrite({ open, onClose, onSuccess, openSnackBar, submitForm, fileDocument }) {
  if (fileDocument === undefined) {
    return null;
  }
  const transferId =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const { id: fileId } = fileDocument;
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'File Uploaded';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Uploading File';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Overwrite File Data</DialogTitle>
      <DialogContent>
        <FileOverwriteForm
          form={FILE_OVERWRITE_FORM}
          onSubmit={formActions.onFileOverwrite}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          fileId={fileId}
          initialValues={{ queryParams: { transferId } }}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(FILE_OVERWRITE_FORM)}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(FileOverwrite);
