import { PureComponent } from 'react';
import { compose } from 'redux';
import { notification as api } from '@vidispine/vdt-api';

import { withRouterProps } from '../hoc/withRouterProps';
import NotificationCard from '../components/notification/NotificationCard';
import NotificationRemove from '../components/notification/NotificationRemove';
import capitalizeString from '../utils/capitalizeString';
import withSnackbar from '../hoc/withSnackbar';
import TitleHeader from '../components/ui/TitleHeader';

const NOTIFICATION_REMOVE_DIALOG = 'NOTIFICATION_REMOVE_DIALOG';

class NotificationEntity extends PureComponent {
  constructor(props) {
    super(props);
    this.onSetTitle = this.onSetTitle.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.state = {
      notificationDocument: undefined,
      isEditing: false,
    };
  }

  componentDidMount() {
    this.onSetTitle();
    this.onRefresh();
  }

  onSetTitle() {
    const { entityType, entityId, notificationId } = this.props;
    document.title = `VidiCore Admin | ${capitalizeString(entityType)} ${entityId} | ${notificationId}`;
  }

  onRefresh() {
    const {
      entityType,
      entityId,
      notificationId,
    } = this.props;
    try {
      api.getNotificationEntity({ notificationId, entityType, entityId })
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
      entityType,
      entityId,
      history,
    } = this.props;
    const {
      notificationDocument,
      isEditing,
    } = this.state;
    return (
      <>
        <TitleHeader
          breadcrumbList={[
            { to: `/${entityType}/`, title: capitalizeString(entityType) },
            { to: `/${entityType}/${entityId}`, title: entityId },
            { to: `/${entityType}/${entityId}/notification/`, title: 'Notification' },
            { title: notificationId },
          ]}
          helpTo="/ref/notification/index.html"
          onRefresh={this.onRefresh}
          code={notificationDocument}
          codeModal="NotificationDocument"
          entityId={`notification/${notificationId}`}
          entityType={entityType}
          removeModal={NOTIFICATION_REMOVE_DIALOG}
        />
        <NotificationCard
          notificationDocument={notificationDocument}
          entityType={entityType}
          entityId={entityId}
          notificationId={notificationId}
          isEditing={isEditing}
          toggleEdit={this.toggleEdit}
          onRefresh={this.onRefresh}
        />
        <NotificationRemove
          dialogName={NOTIFICATION_REMOVE_DIALOG}
          onSuccess={() => history.push(`/${entityType}/${entityId}/notification/`)}
          entityType={entityType}
          entityId={entityId}
          notificationId={notificationId}
        />
      </>
    );
  }
}

export default compose(withRouterProps, withSnackbar)(NotificationEntity);
