import * as formActions from '../../../formactions/configuration';
import withSnackbar from '../../../hoc/withSnackbar';
import Editor from '../../ui/Editor';

import LogReportDisplay from './LogReportDisplay';
import LogReportForm from './LogReportForm';

function LogReportEditor({ logReportConfigurationDocument, openSnackBar, onSuccess }) {
  const EDIT_LOGREPORT_FORM = 'EDIT_LOGREPORT_FORM';
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'LogReport Configuration Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating LogReport Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Editor
      formName={EDIT_LOGREPORT_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdateLogReportConfiguration}
      displayProps={{ logReportConfigurationDocument }}
      initialValues={{ logReportConfigurationDocument }}
      formComponent={LogReportForm}
      displayComponent={LogReportDisplay}
    />
  );
}

export default withSnackbar(LogReportEditor);
