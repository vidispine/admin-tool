import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';

function FormWrapper({
  onSubmit,
  openSnackBar,
  submitForm,
  resetForm,
  onSuccess,
  onFail,
  form,
  title,
  formAction,
  FormComponent: formComponent,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = `Error Updating ${title}`;
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  const FormComponentList = Array.isArray(formComponent) ? formComponent : [formComponent];
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          {FormComponentList.map((FormComponent, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid item xs key={idx}>
              <FormComponent
                form={form}
                onSubmit={formAction}
                onSubmitSuccess={onSubmitSuccess}
                onSubmitFail={onSubmitFail}
                {...formProps}
              />
            </Grid>
          ))}
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

export default compose(withSnackbar, withFormActions)(FormWrapper);
