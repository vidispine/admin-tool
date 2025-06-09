import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import ShapePlaceholderUpdateForm from './ShapePlaceholderUpdateForm';
import * as formActions from '../../formactions/shape';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';

const SHAPE_PLACEHOLDERUPDATE_FORM = 'SHAPE_PLACEHOLDERUPDATE_FORM';

function ShapePlaceholderUpdate({
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
    const messageContent = 'Placeholder Shape Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Placeholder Shape';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Update Placeholder Shape</DialogTitle>
      <DialogContent style={{ minHeight: 200 }}>
        <ShapePlaceholderUpdateForm
          form={SHAPE_PLACEHOLDERUPDATE_FORM}
          onSubmit={formActions.onUpdateShapePlaceholder}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          itemId={itemId}
          shapeId={shapeId}
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
          onClick={() => submitForm(SHAPE_PLACEHOLDERUPDATE_FORM)}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(ShapePlaceholderUpdate);
