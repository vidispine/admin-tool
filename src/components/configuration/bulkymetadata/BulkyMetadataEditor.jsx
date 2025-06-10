import * as formActions from '../../../formactions/configuration';
import withSnackbar from '../../../hoc/withSnackbar';
import Editor from '../../ui/Editor';

import BulkyMetadataDisplay from './BulkyMetadataDisplay';
import BulkyMetadataForm from './BulkyMetadataForm';

const EDIT_BULKYMETADATA_FORM = 'EDIT_BULKYMETADATA_FORM';

function BulkyMetadataEditor({
  bulkyMetadataConfigurationDocument,
  openSnackBar,
  onSuccess,
  formName = EDIT_BULKYMETADATA_FORM,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Bulky Metadata Configuration Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Bulky Metadata Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Editor
      formName={formName}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdateBulkyMetadataConfiguration}
      displayProps={{ bulkyMetadataConfigurationDocument }}
      initialValues={{ bulkyMetadataConfigurationDocument }}
      formComponent={BulkyMetadataForm}
      displayComponent={BulkyMetadataDisplay}
    />
  );
}

export default withSnackbar(BulkyMetadataEditor);
