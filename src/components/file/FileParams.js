import React from 'react';
import { compose } from 'redux';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Accordion from '@material-ui/core/Accordion';

import * as formActions from '../../formactions/file';
import FileParamsForm from './FileParamsForm';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

function FileParams({
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  resetForm,
  form = 'FILE_PARAMS_FORM',
  initialValues = {},
  fileId,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Requesting File';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          File Params
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FileParamsForm
          form={form}
          onSubmit={formActions.onGetFile}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          destroyOnUnmount={false}
          initialValues={initialValues}
          fileId={fileId}
        />
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button
          size="small"
          onClick={() => resetForm(form)}
        >
          Reset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(form)}
        >
          Update
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default compose(withUI, withFormActions)(FileParams);
