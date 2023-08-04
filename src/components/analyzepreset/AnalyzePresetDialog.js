import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';

import Dialog from '@material-ui/core/Dialog';
import AnalyzePresetForm from './AnalyzePresetForm';
import * as formActions from '../../formactions/analyzepreset';
import WizardForm from '../ui/WizardForm';
import withUI from '../../hoc/withUI';
import DialogContent from '../ui/DialogContent';

function AnalyzePresetDialog({
  open,
  onClose,
  openSnackBar,
  onSuccess,
  onFail,
}) {
  const onSubmitSuccess = (response) => {
    const { preset } = response;
    const messageContent = `Analyze Preset ${preset} Created`;
    openSnackBar({ messageContent });
    onClose();
    if (onSuccess) onSuccess(response);
  };
  const onSubmitFail = (error) => {
    const messageContent = 'Error Creating Analyze Preset';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) onFail(error);
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>New Analyze Preset</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={AnalyzePresetForm}
          documentName="analyzePresetDocument"
          onSubmit={formActions.onUpdateAnalyzePreset}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

export default withUI(AnalyzePresetDialog);
