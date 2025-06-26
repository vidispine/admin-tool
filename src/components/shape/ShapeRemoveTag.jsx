import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/shape';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import ShapeAddTagForm from './ShapeAddTagForm';

const SHAPE_REMOVE_TAG_FORM = 'SHAPE_REMOVE_TAG_FORM';

function ShapeRemoveTag({
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  itemId,
  shapeId,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Shape Tag Removed';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Removing Shape Tag';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Remove Shape Tags</DialogTitle>
      <DialogContent style={{ minHeight: 200 }}>
        <ShapeAddTagForm
          form={SHAPE_REMOVE_TAG_FORM}
          onSubmit={formActions.onRemoveShapeTag}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          itemId={itemId}
          shapeId={shapeId}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(SHAPE_REMOVE_TAG_FORM)}>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(ShapeRemoveTag);
