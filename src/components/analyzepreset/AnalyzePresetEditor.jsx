import React from 'react';

import * as formActions from '../../formactions/analyzepreset';
import AnalyzePresetDisplay from './AnalyzePresetDisplay';
import AnalyzePresetForm from './AnalyzePresetForm';

import Editor from '../ui/Editor';
import withUI from '../../hoc/withUI';

const EDIT_ANALYZEPRESET_FORM = 'EDIT_ANALYZEPRESET_FORM';

function AnalyzePresetEditor({
  analyzePresetDocument,
  preset,
  openSnackBar,
  onSuccess,
  onFail,
}) {
  const onSubmitSuccess = () => {
    const messageContent = 'Analyze Preset Saved';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Analyze Preset';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(); }
  };
  return (
    <Editor
      formName={EDIT_ANALYZEPRESET_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdateAnalyzePreset}
      formProps={{ preset }}
      displayProps={{ analyzePresetDocument }}
      initialValues={{ analyzePresetDocument }}
      displayComponent={AnalyzePresetDisplay}
      formComponent={AnalyzePresetForm}
    />
  );
}

export default withUI(AnalyzePresetEditor);
