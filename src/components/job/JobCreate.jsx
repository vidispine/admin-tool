import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/job';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import JobCreateForm from './JobCreateForm';

const JOB_CREATE_FORM = 'JOB_CREATE_FORM';

function JobCreate({ open, onClose, onSuccess, openSnackBar, submitForm, initialValues }) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Job Started';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Starting Job';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Start Job</DialogTitle>
      <DialogContent>
        <JobCreateForm
          form={JOB_CREATE_FORM}
          onSubmit={formActions.onCreateJob}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          initialValues={initialValues}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(JOB_CREATE_FORM)}>
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(JobCreate);
