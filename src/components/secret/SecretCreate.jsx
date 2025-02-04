import React from 'react';
import { compose } from 'redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import * as formActions from '../../formactions/secret';
import SecretForm from './SecretForm';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';

const SECRET_CREATE_FORM = 'SECRET_CREATE_FORM';

function SecretCreate({
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  form = SECRET_CREATE_FORM,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Secret Created';
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
      <DialogTitle>Create Secret</DialogTitle>
      <DialogContent>
        <SecretForm
          form={form}
          onSubmit={formActions.onCreateSecret}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => submitForm(form)}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(SecretCreate);
