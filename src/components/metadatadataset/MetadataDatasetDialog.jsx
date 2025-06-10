import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/metadatadataset';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import MetadataDatasetForm from './MetadataDatasetForm';

const EDIT_METADATADATASET_FORM = 'EDIT_METADATADATASET_FORM';

function MetadataDatasetDialog({ submitForm, open, onClose, openSnackBar, history }) {
  const onSubmitSuccess = (response) => {
    const { datasetId } = response;
    const messageContent = `Metadata Dataset ${datasetId} Created`;
    openSnackBar({ messageContent });
    history.push(`/metadata-dataset/${datasetId}/`);
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Metadata Dataset';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>New Metadata Dataset</DialogTitle>
      <DialogContent>
        <MetadataDatasetForm
          form={EDIT_METADATADATASET_FORM}
          onSubmit={formActions.onUpdate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(EDIT_METADATADATASET_FORM)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(MetadataDatasetDialog);
