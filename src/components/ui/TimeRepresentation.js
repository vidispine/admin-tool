import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Accordion from '@material-ui/core/Accordion';

import TimeRepresentationForm from './TimeRepresentationForm';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';

export const TIME_REPRESENTATION_FORM = 'TIME_REPRESENTATION_FORM';

function TimeRepresentationParams({
  // onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  formName = TIME_REPRESENTATION_FORM,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Time Representation Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Time Representation';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Time Representation Options
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TimeRepresentationForm
          form={formName}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          {...formProps}
        />
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button
          size="small"
          onClick={() => resetForm(formName)}
        >
          Reset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(formName)}
        >
          Update
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default compose(withSnackbar, withFormActions)(TimeRepresentationParams);
