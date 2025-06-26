import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/externalid';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import ExternalIdNamespaceForm from './ExternalIdNamespaceForm';

const EXTERNALID_NAMESPACE_FORM = 'EXTERNALID_NAMESPACE_FORM';

function ExternalIdNamespaceDialog({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  externalIdentifierNamespaceDocument,
}) {
  if (externalIdentifierNamespaceDocument === undefined) {
    return null;
  }
  const { name: idName } = externalIdentifierNamespaceDocument;
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'External ID Namespace Updated';
    openSnackBar({ messageContent });
    onClose();
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating External ID Namespace';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Edit External ID Namespace ${idName}`}</DialogTitle>
      <DialogContent>
        <ExternalIdNamespaceForm
          form={EXTERNALID_NAMESPACE_FORM}
          onSubmit={formActions.onUpdateNamespace}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          initialValues={{ externalIdentifierNamespaceDocument }}
          idName={idName}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(EXTERNALID_NAMESPACE_FORM)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(ExternalIdNamespaceDialog);
