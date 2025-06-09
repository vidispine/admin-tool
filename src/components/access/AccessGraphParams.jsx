import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Accordion from '@material-ui/core/Accordion';

import AccessGraphParamsForm from './AccessGraphParamsForm';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';
import * as formActions from '../../formactions/access';

export const FORM_NAME = 'ACCESS_GRAPH_PARAMS_FORM';

function AccessGraphParams({
  entityId,
  entityType,
  onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  form = FORM_NAME,
  defaultExpanded = true,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Access Graph';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Access Graph Options
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <AccessGraphParamsForm
          form={form}
          onSubmit={formActions.onGetEntityAccessGraphDot}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          entityId={entityId}
          entityType={entityType}
          {...formProps}
        />
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

export default compose(withSnackbar, withFormActions)(AccessGraphParams);
