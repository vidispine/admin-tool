import React from 'react';

import { notification as api } from '@vidispine/vdt-api';
import NotificationPlaceholderCard from '../components/notification/NotificationPlaceholderCard';
import NotificationRemove from '../components/notification/NotificationRemove';
import withSnackbar from '../hoc/withSnackbar';
import TitleHeader from '../components/ui/TitleHeader';

const NOTIFICATION_REMOVE_DIALOG = 'NOTIFICATION_REMOVE_DIALOG';

class Notification extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.state = {
      notificationDocument: undefined,
      isEditing: false,
    };
  }

  componentDidMount() {
    const { notificationId } = this.props;
    document.title = `VidiCore Admin | Notification | ${notificationId}`;
    this.onRefresh();
  }

  onRefresh() {
    const {
      notificationId,
    } = this.props;
    try {
      api.getNotification({ notificationId, entityType: 'placeholder', path: `/API/notification/${notificationId}/` })
        .then((response) => this.setState({ notificationDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Notification';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  toggleEdit() {
    const { isEditing: currentIsEditing } = this.state;
    this.setState({ isEditing: !currentIsEditing });
  }

  render() {
    const {
      notificationId,
      history,
    } = this.props;
    const {
      notificationDocument,
      isEditing,
    } = this.state;
    return (
      <>
        <TitleHeader
          title={notificationId}
          parentTitle="Notification"
          parentTo="/notification/"
          helpTo="/ref/notification/index.html"
          onRefresh={this.onRefresh}
          code={notificationDocument}
          codeModal="NotificationDocument"
          entityId={notificationId}
          entityType="notification"
          removeModal={NOTIFICATION_REMOVE_DIALOG}
        />
        <NotificationPlaceholderCard
          notificationDocument={notificationDocument}
          notificationId={notificationId}
          isEditing={isEditing}
          toggleEdit={this.toggleEdit}
          onRefresh={this.onRefresh}
        />
        <NotificationRemove
          dialogName={NOTIFICATION_REMOVE_DIALOG}
          onSuccess={() => history.push('/notification/')}
          notificationId={notificationId}
        />
      </>
    );
  }
}

export default withSnackbar(Notification);
