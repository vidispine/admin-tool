import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import ShapeCreateComponentPlaceholderForm from './ShapeCreateComponentPlaceholderForm';
import * as formActions from '../../formactions/component';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';

const SHAPE_CREATECOMPONENTPLACEHOLDER_FORM = 'SHAPE_CREATECOMPONENTPLACEHOLDER_FORM';

function ShapeCreateComponentPlaceholder({
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  itemId,
  shapeId,
  form = SHAPE_CREATECOMPONENTPLACEHOLDER_FORM,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Component Placeholder Created';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Creating Placeholder Component';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Create Component Placeholder</DialogTitle>
      <DialogContent style={{ minHeight: 200 }}>
        <ShapeCreateComponentPlaceholderForm
          form={form}
          onSubmit={formActions.onCreateComponentPlaceholder}
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
          onClick={() => submitForm(form)}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(ShapeCreateComponentPlaceholder);
