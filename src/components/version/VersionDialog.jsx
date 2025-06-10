import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/license';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import LicenseForm from './LicenseForm';

const EDIT_LICENSE_FORM = 'EDIT_LICENSE_FORM';

function VersionDialog({ open, onClose, submitForm, openSnackBar, onSuccess, onFail }) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'License Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating License';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Upload License</DialogTitle>
      <DialogContent>
        <LicenseForm
          form={EDIT_LICENSE_FORM}
          onSubmit={formActions.onUpdate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(EDIT_LICENSE_FORM)}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(VersionDialog);
