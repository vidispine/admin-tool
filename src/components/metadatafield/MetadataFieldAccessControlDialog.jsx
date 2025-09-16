import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { compose } from 'redux';

import * as formActions from '../../formactions/metadatafield';
import withUI from '../../hoc/withUI';
import WizardForm from '../ui/WizardForm';

import MetadataFieldAccessControlForm from './MetadataFieldAccessControlForm';

function MetadataFieldAccessControlDialog({
  fieldName,
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const { data: metadataFieldAccessControlDocument } = response;
    const { id: accessId } = metadataFieldAccessControlDocument;
    const messageContent = `Metadata Field Access Control ${accessId} Created`;
    openSnackBar({ messageContent });
    if (onSuccess) onSuccess(response, dispatch, props);
    onClose();
  };
  const onSubmitFail = (error) => {
    const messageContent = 'Error Creating Metadata Field Access Control';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) onFail(error);
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>New Metadata Field Access Control</DialogTitle>
      <DialogContent>
        <WizardForm
          fieldName={fieldName}
          FormComponent={MetadataFieldAccessControlForm}
          documentName="metadataFieldAccessControlDocument"
          onSubmit={formActions.onCreateMetadataFieldAccess}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

export default compose(withUI)(MetadataFieldAccessControlDialog);
