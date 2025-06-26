import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/component';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import ShapeComponentRemoveFileForm from './ShapeComponentRemoveFileForm';

const SHAPE_COMPONENT_UNASSOCIATEFILE_FORM = 'SHAPE_COMPONENT_UNASSOCIATEFILE_FORM';

function ShapeComponentRemoveFile({
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  itemId,
  shapeId,
  componentId,
  fileId,
  form = SHAPE_COMPONENT_UNASSOCIATEFILE_FORM,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'File Unassociated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Unassociating File';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Unassociate File From Component</DialogTitle>
      <DialogContent style={{ minHeight: 200 }}>
        <ShapeComponentRemoveFileForm
          form={form}
          onSubmit={formActions.onRemoveComponentFile}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          itemId={itemId}
          shapeId={shapeId}
          componentId={componentId}
          fileId={fileId}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="primary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="secondary" onClick={() => submitForm(form)}>
          Unassociate File
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(ShapeComponentRemoveFile);
