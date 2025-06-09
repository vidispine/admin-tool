import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { compose } from 'redux';

import * as formActions from '../../formactions/file';
import FileHashForm from './FileHashForm';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';

const FILE_HASH_FORM = 'FILE_HASH_FORM';

function FileHash({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  fileDocument,
}) {
  if (fileDocument === undefined) { return null; }
  const { id: fileId } = fileDocument;
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Checksum Hash Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Checksum Hash';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>Set File Checksum Hash</DialogTitle>
      <DialogContent>
        <FileHashForm
          form={FILE_HASH_FORM}
          onSubmit={formActions.onUpdateFileHash}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          fileId={fileId}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          size="small"
          color="secondary"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(FILE_HASH_FORM)}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(FileHash);
