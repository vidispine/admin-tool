import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/library';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import DialogContent from '../ui/DialogContent';

import LibraryRemoveForm from './LibraryRemoveForm';

const LIBRARY_REMOVE_FORM = 'LIBRARY_REMOVE_FORM';

function LibraryRemove({ open, onClose, onSuccess, onFail, openSnackBar, submitForm, libraryId }) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Library Deleted';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Deleting Library';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Delete Library ${libraryId}`}</DialogTitle>
      <DialogContent>
        <LibraryRemoveForm
          form={LIBRARY_REMOVE_FORM}
          onSubmit={formActions.onRemove}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          libraryId={libraryId}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="secondary" onClick={() => submitForm(LIBRARY_REMOVE_FORM)}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(LibraryRemove);
