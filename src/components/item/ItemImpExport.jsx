import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/item';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import ItemImpExportForm from './ItemImpExportForm';

const ITEM_EXPORTIMP_FORM = 'ITEM_EXPORTIMP_FORM';

function ItemImpExport({ open, onClose, onSuccess, onFail, openSnackBar, submitForm, itemId }) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Export Started';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Starting Export';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Export Item IMF Package</DialogTitle>
      <DialogContent>
        <ItemImpExportForm
          form={ITEM_EXPORTIMP_FORM}
          onSubmit={formActions.onCreateExportImp}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          itemId={itemId}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(ITEM_EXPORTIMP_FORM)}>
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(ItemImpExport);
