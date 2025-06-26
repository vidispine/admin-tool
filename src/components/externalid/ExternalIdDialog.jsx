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

import ExternalIdForm from './ExternalIdForm';

const EXTERNALID_FORM = 'EXTERNALID_FORM';

function ExternalIdDialog({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  entityType,
  entityId,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'External ID Created';
    openSnackBar({ messageContent });
    onClose();
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating External ID';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Create External ID</DialogTitle>
      <DialogContent>
        <ExternalIdForm
          form={EXTERNALID_FORM}
          onSubmit={formActions.onCreate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          entityType={entityType}
          entityId={entityId}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(EXTERNALID_FORM)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(ExternalIdDialog);
