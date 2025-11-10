import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { compose } from 'redux';

import * as formActions from '../../formactions/exporttemplate';
import withUI from '../../hoc/withUI';
import DialogContent from '../ui/DialogContent';
import WizardForm from '../ui/WizardForm';

import ExportTemplateForm from './ExportTemplateForm';

function ExportTemplateDialog({ templateName, open, onClose, onSuccess, openSnackBar, onFail }) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const { locationName } = response;
    const messageContent = `Export Location ${locationName} Created`;
    openSnackBar({ messageContent });
    onClose();
    if (onSuccess) onSuccess(response, dispatch, props);
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Creating Export Template';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) onSuccess(error, dispatch, props);
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>New Export Template</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={ExportTemplateForm}
          documentName="exportLocationDocument"
          onSubmit={formActions.onUpdateExportTemplate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          templateName={templateName}
        />
      </DialogContent>
    </Dialog>
  );
}

export default compose(withUI)(ExportTemplateDialog);
