import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/library';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import LibraryUpdateForm from './LibraryUpdateForm';

export const LIBRARY_ITEM_ADD_FORM = 'LIBRARY_ITEM_ADD_FORM';

function LibraryUpdate({ submitForm, open, onClose, onSuccess, openSnackBar, onFail, libraryId }) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Library Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Library';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Add Items To Library</DialogTitle>
      <DialogContent>
        <LibraryUpdateForm
          onSubmit={formActions.onUpdate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          libraryId={libraryId}
          form={LIBRARY_ITEM_ADD_FORM}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(LIBRARY_ITEM_ADD_FORM)}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default compose(withUI, withFormActions)(LibraryUpdate);
