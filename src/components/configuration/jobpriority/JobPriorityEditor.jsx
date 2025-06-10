import * as formActions from '../../../formactions/configuration';
import withSnackbar from '../../../hoc/withSnackbar';
import Editor from '../../ui/Editor';

import JobPriorityDisplay from './JobPriorityDisplay';
import JobPriorityForm from './JobPriorityForm';

const EDIT_JOBPRIORITY_FORM = 'EDIT_JOBPRIORITY_FORM';

function JobPriorityEditor({
  jobPriorityConfigurationDocument,
  openSnackBar,
  onSuccess,
  formName = EDIT_JOBPRIORITY_FORM,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Job Priority Configuration Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Job Priority Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Editor
      formName={formName}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdateJobPriorityConfiguration}
      displayProps={{ jobPriorityConfigurationDocument }}
      initialValues={{ jobPriorityConfigurationDocument }}
      formComponent={JobPriorityForm}
      displayComponent={JobPriorityDisplay}
    />
  );
}

export default withSnackbar(JobPriorityEditor);
