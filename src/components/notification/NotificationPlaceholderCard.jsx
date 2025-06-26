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

export const NOTIFICATIONPLACEHOLDER_EDIT_FORM = 'NOTIFICATIONPLACEHOLDER_EDIT_FORM';

function NotificationPlaceholderCard({
  notificationId,
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
  const { action } = notificationDocument;
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
      <Card>
        <CardHeader title="Action" action={ActionComponent} />
        {isEditing ? (
          <>
            <CardContent>
              <NotificationActionForm
                notificationId={notificationId}
                form={NOTIFICATIONPLACEHOLDER_EDIT_FORM}
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
                onClick={() => submitForm(NOTIFICATIONPLACEHOLDER_EDIT_FORM)}
              >
                Save
              </Button>
            </DialogActions>
          </>
        ) : (
          <CardContent>
            <NotificationAction notificationId={notificationId} action={action} />
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
)(NotificationPlaceholderCard, NOTIFICATIONPLACEHOLDER_EDIT_FORM);
