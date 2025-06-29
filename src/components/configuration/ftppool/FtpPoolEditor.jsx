import * as formActions from '../../../formactions/configuration';
import withSnackbar from '../../../hoc/withSnackbar';
import Editor from '../../ui/Editor';

import FtpPoolDisplay from './FtpPoolDisplay';
import FtpPoolForm from './FtpPoolForm';

function FtpPoolEditor({ ftpPoolConfigurationDocument, openSnackBar, onSuccess }) {
  const EDIT_FTPPOOL_FORM = 'EDIT_FTPPOOL_FORM';
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'FTP Pool Configuration Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating FTP Pool Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Editor
      formName={EDIT_FTPPOOL_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdateFtpPoolConfiguration}
      displayProps={{ ftpPoolConfigurationDocument }}
      initialValues={{ ftpPoolConfigurationDocument }}
      formComponent={FtpPoolForm}
      displayComponent={FtpPoolDisplay}
    />
  );
}

export default withSnackbar(FtpPoolEditor);
