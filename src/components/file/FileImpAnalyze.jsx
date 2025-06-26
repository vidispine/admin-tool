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

import FileAnalyzeForm from './FileAnalyzeForm';

const FILE_ANALYZE_FORM = 'FILE_ANALYZE_FORM';

function FileImpAnalyze({ open, onClose, onSuccess, openSnackBar, submitForm, fileDocument }) {
  if (fileDocument === undefined) {
    return null;
  }
  const { id: fileId } = fileDocument;
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Starting IMP Deduction Job';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Starting IMP Deduction Job';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Run IMP Deduction Job</DialogTitle>
      <DialogContent>
        <FileAnalyzeForm
          form={FILE_ANALYZE_FORM}
          onSubmit={formActions.onFileImpAnalyze}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          fileId={fileId}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(FILE_ANALYZE_FORM)}>
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(FileImpAnalyze);
