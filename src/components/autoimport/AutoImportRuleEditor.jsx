import { connect } from 'react-redux';

import * as actions from '../../actions';
import * as formActions from '../../formactions/autoimport';
import Editor from '../ui/Editor';

import AutoImportRuleDisplay from './AutoImportRuleDisplay';
import AutoImportRuleForm from './AutoImportRuleForm';

function AutoImportRuleEditor({ autoImportRuleDocument, storageId, openSnackBar, onRefresh }) {
  const onSubmitSuccess = () => {
    const messageContent = 'Auto Import Rule Saved';
    openSnackBar({ messageContent });
    if (onRefresh) {
      onRefresh();
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Auto Import Rule';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const formProps = { storageId };
  const displayProps = { autoImportRuleDocument };
  const initialValues = { autoImportRuleDocument };
  return (
    <Editor
      formName="EDIT_AUTOIMPORTRULE_FORM"
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdate}
      formComponent={AutoImportRuleForm}
      formProps={formProps}
      displayComponent={AutoImportRuleDisplay}
      displayProps={displayProps}
      initialValues={initialValues}
      storageId={storageId}
    />
  );
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
};

export default connect(null, mapDispatchToProps)(AutoImportRuleEditor);
