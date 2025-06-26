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

import ShapeAnalyzeForm from './ShapeAnalyzeForm';

const SHAPE_ANALYZE_FORM = 'SHAPE_ANALYZE_FORM';

function ShapeAnalyze({
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  itemId,
  shapeId,
  form = SHAPE_ANALYZE_FORM,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Analyze Job Created';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Creating Analyze Job';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Start Shape Analyze Job</DialogTitle>
      <DialogContent style={{ minHeight: 200 }}>
        <ShapeAnalyzeForm
          form={form}
          onSubmit={formActions.onCreateShapeAnalyze}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          itemId={itemId}
          shapeId={shapeId}
          initialValues={{}}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(form)}>
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(ShapeAnalyze);
