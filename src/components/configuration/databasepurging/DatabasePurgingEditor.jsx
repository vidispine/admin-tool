import * as formActions from '../../../formactions/configuration';
import withSnackbar from '../../../hoc/withSnackbar';
import Editor from '../../ui/Editor';

import DatabasePurgingDisplay from './DatabasePurgingDisplay';
import DatabasePurgingForm from './DatabasePurgingForm';

const EDIT_DATABASEPURGING_FORM = 'EDIT_DATABASEPURGING_FORM';

function DatabasePurgingEditor({
  databasePurgingConfigurationDocument,
  openSnackBar,
  onSuccess,
  formName = EDIT_DATABASEPURGING_FORM,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Database Purging Configuration Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Database Purging Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Editor
      formName={formName}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdateDatabasePurgingConfiguration}
      displayProps={{ databasePurgingConfigurationDocument }}
      initialValues={{ databasePurgingConfigurationDocument }}
      formComponent={DatabasePurgingForm}
      displayComponent={DatabasePurgingDisplay}
    />
  );
}

export default withSnackbar(DatabasePurgingEditor);
