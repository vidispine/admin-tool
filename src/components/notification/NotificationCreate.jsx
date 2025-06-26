import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

import * as formActions from '../../formactions/notification';
import withFormActions from '../../hoc/withFormActions';
import withFormSelectors from '../../hoc/withFormSelectors';
import withUI from '../../hoc/withUI';
import capitalizeString from '../../utils/capitalizeString';

import NotificationActionForm from './NotificationActionForm';
import NotificationTriggerForm from './NotificationTriggerForm';

export const NOTIFICATION_CREATE_FORM = 'NOTIFICATION_CREATE_FORM';

function NotificationCreate({
  open,
  onClose,
  onSuccess,
  submitForm,
  entityType,
  entityId,
  valueSelector,
  openSnackBar,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Notification Created';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Notification';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const initialValues = {
    entityId,
    notificationDocument: {
      action: {},
      // trigger: {},
    },
  };
  if (entityType) {
    initialValues.notificationDocument.trigger = {};
    if (entityType === 'deletion-lock')
      initialValues.notificationDocument.trigger.deletionLock = {};
    else initialValues.notificationDocument.trigger[entityType] = {};
  }
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {entityType ? `New ${capitalizeString(entityType)} Notification` : 'New Notification'}
      </DialogTitle>
      <DialogContent>
        {entityType && (
          <>
            <Typography variant="h5" color="textSecondary" style={{ textDecoration: 'none' }}>
              Trigger
            </Typography>
            <NotificationTriggerForm
              entityType={entityType}
              form={NOTIFICATION_CREATE_FORM}
              onSubmit={entityType ? formActions.onCreate : formActions.onCreatePlaceholder}
              onSubmitSuccess={onSubmitSuccess}
              onSubmitFail={onSubmitFail}
              valueSelector={valueSelector}
              initialValues={initialValues}
            />
          </>
        )}
        <Typography variant="h5" color="textSecondary" style={{ textDecoration: 'none' }}>
          Action
        </Typography>
        <NotificationActionForm
          entityType={entityType}
          form={NOTIFICATION_CREATE_FORM}
          onSubmit={entityType ? formActions.onCreate : formActions.onCreatePlaceholder}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          valueSelector={valueSelector}
          initialValues={initialValues}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(NOTIFICATION_CREATE_FORM)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(
  withUI,
  withFormActions,
  withFormSelectors,
)(NotificationCreate, NOTIFICATION_CREATE_FORM);
