import { PureComponent } from 'react';

import { notification as api } from '@vidispine/vdt-api';
import TitleHeader from '../components/ui/TitleHeader';
import NotificationListCard from '../components/notification/NotificationListCard';
import NotificationCreate from '../components/notification/NotificationCreate';

import withUI from '../hoc/withUI';
import capitalizeString from '../utils/capitalizeString';

const NOTIFICATION_CREATE_DIALOG = 'NOTIFICATION_CREATE_DIALOG';

class NotificationEntityList extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.onSetTitle = this.onSetTitle.bind(this);
    this.state = {
      uriListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onSetTitle();
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ entityType, entityId }) {
    const { entityType: prevEntityType, entityId: prevEntityId } = this.props;
    if (prevEntityType !== entityType || prevEntityId !== entityId) {
      this.onSetTitle();
      this.onFetch(entityType);
    }
  }

  onSetTitle() {
    const { entityType, entityId } = this.props;
    document.title = `VidiCore Admin | ${capitalizeString(entityType)} ${entityId} Notification`;
  }

  onRefresh() {
    const { entityType, entityId } = this.props;
    this.onFetch(entityType, entityId);
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Notifications';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onFetch(entityType, entityId) {
    try {
      api.listNotificationEntity({ entityType, entityId })
        .then((response) => this.setState({ uriListDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  render() {
    const {
      entityType,
      entityId,
      history,
    } = this.props;
    const { uriListDocument } = this.state;
    return (
      <>
        <TitleHeader
          grandParentTitle={capitalizeString(entityType)}
          grandParentTo={`/${entityType}/`}
          parentTitle={entityId}
          title="Notification"
          helpTo="/ref/notification/index.html"
          onRefresh={this.onRefresh}
          code={uriListDocument}
          codeModal="URIListDocument"
          createModal={NOTIFICATION_CREATE_DIALOG}
          entityType={entityType}
        />
        <NotificationListCard
          uriListDocument={uriListDocument}
          entityType={entityType}
          entityId={entityId}
        />
        <NotificationCreate
          dialogName={NOTIFICATION_CREATE_DIALOG}
          entityType={entityType}
          entityId={entityId}
          onSuccess={(response) => {
            const { data: newUriListDocument } = response;
            const { uri } = newUriListDocument;
            const notificationId = uri[0];
            history.push(`/${entityType}/${entityId}/notification/${notificationId}`);
          }}
        />
      </>
    );
  }
}

export default withUI(NotificationEntityList);
