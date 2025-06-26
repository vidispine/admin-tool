import * as formActions from '../../../formactions/configuration';
import withSnackbar from '../../../hoc/withSnackbar';
import Editor from '../../ui/Editor';

import CorsDisplay from './CorsDisplay';
import CorsForm from './CorsForm';

function CorsEditor({ corsConfigurationDocument, openSnackBar, onSuccess }) {
  const EDIT_CORS_FORM = 'EDIT_CORS_FORM';
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'CORS Configuration Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating CORS Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Editor
      formName={EDIT_CORS_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdateCorsConfiguration}
      displayProps={{ corsConfigurationDocument }}
      initialValues={{ corsConfigurationDocument }}
      formComponent={CorsForm}
      displayComponent={CorsDisplay}
    />
  );
}

export default withSnackbar(CorsEditor);
