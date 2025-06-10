import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/fieldgroup';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import DialogContent from '../ui/DialogContent';

import FieldGroupFieldForm from './FieldGroupFieldForm';

const FIELDGROUP_FIELD_FORM = 'FIELDGROUP_FIELD_FORM';

function FieldGroupFieldDialog({ open, onClose, onSuccess, openSnackBar, submitForm, groupName }) {
  const onSubmitSuccess = (response) => {
    const { fieldName } = response;
    const messageContent = `Field ${fieldName} Added`;
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Adding Field';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Add Metadata Field To Field Group</DialogTitle>
      <DialogContent>
        <FieldGroupFieldForm
          form={FIELDGROUP_FIELD_FORM}
          onSubmit={formActions.onUpdateFieldGroupField}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          groupName={groupName}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(FIELDGROUP_FIELD_FORM)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(FieldGroupFieldDialog);
