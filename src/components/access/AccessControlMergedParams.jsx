import React from 'react';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';

import AccessControlMergedParamsForm from './AccessControlMergedParamsForm';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';
import * as formActions from '../../formactions/access';

export const ACCESS_MERGED_PARAMS_FORM = 'ACCESS_MERGED_PARAMS_FORM';

function AccessControlMergedParams({
  onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  entityType,
  entityId,
  form = ACCESS_MERGED_PARAMS_FORM,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Access Control Merged Display';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Access Control Merged Options
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs>
            <AccessControlMergedParamsForm
              form={form}
              onSubmit={formActions.onEntityAccessMerged}
              onSubmitSuccess={onSubmitSuccess}
              onSubmitFail={onSubmitFail}
              entityType={entityType}
              entityId={entityId}
              {...formProps}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button size="small" onClick={() => resetForm(form)}>
          Reset
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(form)}>
          Update
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default compose(withSnackbar, withFormActions)(AccessControlMergedParams);
