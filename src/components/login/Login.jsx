import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

import * as formActions from '../../formactions/user';
import withFormActions from '../../hoc/withFormActions';
import { withSnackbarNoRouter } from '../../hoc/withSnackbar';

import LoginForm from './LoginForm';
import LoginFormAdvanced from './LoginFormAdvanced';

const LOGIN_FORM = 'LOGIN_FORM';

function Login({ onSuccess, onFail, openSnackBar, submitForm, ...formProps }) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Login Success';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Logging In';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <>
      <DialogContent>
        <LoginForm
          form={LOGIN_FORM}
          onSubmit={formActions.onGetUserToken}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          {...formProps}
        />
        <Accordion>
          <AccordionSummary style={{ padding: 0 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Advanced
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <LoginFormAdvanced
              form={LOGIN_FORM}
              onSubmit={formActions.onGetUserToken}
              onSubmitSuccess={onSubmitSuccess}
              onSubmitFail={onSubmitFail}
              {...formProps}
            />
          </AccordionDetails>
        </Accordion>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={() => submitForm(LOGIN_FORM)} fullWidth>
          Log In
        </Button>
      </DialogActions>
    </>
  );
}

export default compose(withSnackbarNoRouter, withFormActions)(Login);
