import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/job';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import DialogContent from '../ui/DialogContent';

import JobPriorityForm from './JobPriorityForm';

const JOB_PRIORITY_FORM = 'JOB_PRIORITY_FORM';

function JobPriority({ open, onClose, onSuccess, openSnackBar, submitForm, jobDocument }) {
  if (jobDocument === undefined) {
    return null;
  }
  const { jobId, priority } = jobDocument;
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Job Status Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Job Status';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Change Job ${jobId} Priority`}</DialogTitle>
      <DialogContent>
        <JobPriorityForm
          form={JOB_PRIORITY_FORM}
          onSubmit={formActions.onModifyJob}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          jobId={jobId}
          initialValues={{ queryParams: { priority } }}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(JOB_PRIORITY_FORM)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(JobPriority);
