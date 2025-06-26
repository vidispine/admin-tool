import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/secret';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import SecretValueForm from './SecretValueForm';

const SECRET_VALUE_UPDATE_FORM = 'SECRET_VALUE_UPDATE_FORM';

function SecretValueUpdate({
  alias,
  secretKey,
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  form = SECRET_VALUE_UPDATE_FORM,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Secret Value Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Creating Secret';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Create/Update Secret Value</DialogTitle>
      <DialogContent>
        <SecretValueForm
          form={form}
          onSubmit={formActions.onUpdateSecret}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          initialValues={{ key: secretKey, alias }}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="contained" color="primary" onClick={() => submitForm(form)}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(SecretValueUpdate);
