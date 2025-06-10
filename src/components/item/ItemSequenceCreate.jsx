import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/sequence';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import ItemSequenceForm from './ItemSequenceForm';

const ITEM_SEQUENCE_CREATE_FORM = 'ITEM_SEQUENCE_CREATE_FORM';

function ItemSequenceCreate({
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  itemId,
  initialValues,
  form = ITEM_SEQUENCE_CREATE_FORM,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Sequence Created';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Creating Sequence';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Create Sequence</DialogTitle>
      <DialogContent>
        <ItemSequenceForm
          form={form}
          onSubmit={formActions.onUpdateItemSequence}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          itemId={itemId}
          initialValues={{ itemId, ...initialValues }}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="contained" color="primary" onClick={() => submitForm(form)}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(ItemSequenceCreate);
