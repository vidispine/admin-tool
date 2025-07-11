import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/shape';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import DialogContent from '../ui/DialogContent';

import ShapeDeleteAllForm from './ShapeDeleteAllForm';

const SHAPE_DELETE_ALL_FORM = 'SHAPE_DELETE_ALL_FORM';

function ShapeDeleteAll({ open, onClose, onSuccess, onFail, openSnackBar, submitForm, itemId }) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'All Shapes Deleted';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Deleting All Shapes';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Delete All Shapes</DialogTitle>
      <DialogContent>
        <ShapeDeleteAllForm
          form={SHAPE_DELETE_ALL_FORM}
          onSubmit={formActions.onRemoveShapeAll}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          itemId={itemId}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="secondary" onClick={() => submitForm(SHAPE_DELETE_ALL_FORM)}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(ShapeDeleteAll);
