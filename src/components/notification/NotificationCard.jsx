import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import DialogActions from '@material-ui/core/DialogActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { compose } from 'redux';

import * as formActions from '../../formactions/notification';
import withFormActions from '../../hoc/withFormActions';
import withFormSelectors from '../../hoc/withFormSelectors';
import withUI from '../../hoc/withUI';
import CardList from '../ui/CardList';

import NotificationAction from './NotificationAction';
import NotificationActionForm from './NotificationActionForm';
import NotificationTrigger from './NotificationTrigger';
import NotificationTriggerForm from './NotificationTriggerForm';

export const NOTIFICATION_EDIT_FORM = 'NOTIFICATION_EDIT_FORM';

function NotificationCard({
  notificationId,
  entityType,
  entityId,
  notificationDocument,
  submitForm,
  onRefresh,
  isEditing,
  toggleEdit,
  valueSelector,
  openSnackBar,
}) {
  if (notificationDocument === undefined) {
    return null;
  }
  const onSubmitSuccess = () => {
    const messageContent = 'Notification Updated';
    openSnackBar({ messageContent });
    if (onRefresh) {
      onRefresh();
    }
    if (toggleEdit) {
      toggleEdit();
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Notification';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const { action, trigger } = notificationDocument;
  const ActionComponent = (
    <FormControlLabel
      control={<Switch color="primary" />}
      label="Edit"
      checked={isEditing}
      onChange={toggleEdit}
    />
  );
  return (
    <CardList>
      {trigger && (
        <Card>
          <CardHeader title="Trigger" action={ActionComponent} />
          {isEditing ? (
            <>
              <CardContent>
                <NotificationTriggerForm
                  notificationId={notificationId}
                  entityType={entityType}
                  entityId={entityId}
                  form={NOTIFICATION_EDIT_FORM}
                  onSubmit={formActions.onUpdate}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  initialValues={{ notificationDocument }}
                  valueSelector={valueSelector}
                />
              </CardContent>
              <DialogActions>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => submitForm(NOTIFICATION_EDIT_FORM)}
                >
                  Save
                </Button>
              </DialogActions>
            </>
          ) : (
            <CardContent>
              <NotificationTrigger
                notificationId={notificationId}
                trigger={trigger}
                entityType={entityType}
                entityId={entityId}
              />
            </CardContent>
          )}
        </Card>
      )}
      <Card>
        <CardHeader title="Action" action={ActionComponent} />
        {isEditing ? (
          <>
            <CardContent>
              <NotificationActionForm
                notificationId={notificationId}
                entityType={entityType}
                entityId={entityId}
                form={NOTIFICATION_EDIT_FORM}
                onSubmit={formActions.onUpdate}
                onSubmitSuccess={onSubmitSuccess}
                onSubmitFail={onSubmitFail}
                initialValues={{ notificationDocument }}
                valueSelector={valueSelector}
              />
            </CardContent>
            <DialogActions>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => submitForm(NOTIFICATION_EDIT_FORM)}
              >
                Save
              </Button>
            </DialogActions>
          </>
        ) : (
          <CardContent>
            <NotificationAction
              notificationId={notificationId}
              action={action}
              entityType={entityType}
              entityId={entityId}
            />
          </CardContent>
        )}
      </Card>
    </CardList>
  );
}

export default compose(
  withUI,
  withFormActions,
  withFormSelectors,
)(NotificationCard, NOTIFICATION_EDIT_FORM);
