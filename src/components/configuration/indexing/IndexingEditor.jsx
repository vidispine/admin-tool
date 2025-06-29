import * as formActions from '../../../formactions/configuration';
import withSnackbar from '../../../hoc/withSnackbar';
import Editor from '../../ui/Editor';

import IndexingDisplay from './IndexingDisplay';
import IndexingForm from './IndexingForm';

function IndexingEditor({ indexingConfigurationDocument, openSnackBar, onSuccess }) {
  const EDIT_INDEXING_FORM = 'EDIT_INDEXING_FORM';
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Indexing Configuration Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Indexing Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Editor
      formName={EDIT_INDEXING_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdateIndexingConfiguration}
      displayProps={{ indexingConfigurationDocument }}
      initialValues={{ indexingConfigurationDocument }}
      formComponent={IndexingForm}
      displayComponent={IndexingDisplay}
    />
  );
}

export default withSnackbar(IndexingEditor);
