import { compose } from 'redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import * as formActions from '../../formactions/collection';
import CollectionExportForm from './CollectionExportForm';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';

const COLLECTION_EXPORT_FORM = 'COLLECTION_EXPORT_FORM';

function CollectionExport({
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  collectionId,
  form = COLLECTION_EXPORT_FORM,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Export Started';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Starting Export';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>Export Collection</DialogTitle>
      <DialogContent>
        <CollectionExportForm
          form={form}
          onSubmit={formActions.onCreateExport}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          collectionId={collectionId}
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
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(CollectionExport);
