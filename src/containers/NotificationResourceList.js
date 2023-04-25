import React from 'react';

import { notification as api } from '@vidispine/vdt-api';
import TitleHeader from '../components/ui/TitleHeader';
import NotificationListCard from '../components/notification/NotificationListCard';
import NotificationCreate from '../components/notification/NotificationCreate';
import UriListCard from '../components/ui/UriListCard';
import CardList from '../components/ui/CardList';
import { NOTIFICATION_ENTITY } from '../const';

import withUI from '../hoc/withUI';

const NOTIFICATION_CREATE_DIALOG = 'NOTIFICATION_CREATE_DIALOG';

class NotificationResourceList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      uriListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | Notifications';
    this.onRefresh();
  }

  onRefresh() {
    const { entityType } = this.props;
    this.onFetch(entityType);
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Notifications';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onFetch() {
    try {
      api.listNotification({ entityType: 'placeholder', path: '/API/notification/' })
        .then((response) => this.setState({ uriListDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  render() {
    const {
      history,
    } = this.props;
    const { uriListDocument } = this.state;
    return (
      <>
        <TitleHeader
          title="Notification"
          helpTo="/ref/notification/index.html"
          onRefresh={this.onRefresh}
          code={uriListDocument}
          codeModal="URIListDocument"
          createModal={NOTIFICATION_CREATE_DIALOG}
        />
        <CardList>
          <UriListCard
            uriListDocument={{ uri: NOTIFICATION_ENTITY }}
            linkTo={(uri) => `/notification/${uri}/`}
            header={false}
            titleCase
          />
          <NotificationListCard
            uriListDocument={uriListDocument}
          />
        </CardList>
        <NotificationCreate
          dialogName={NOTIFICATION_CREATE_DIALOG}
          onSuccess={(response) => {
            const { data: newUriListDocument } = response;
            const { uri } = newUriListDocument;
            const notificationId = uri[0];
            history.push(`/notification/${notificationId}`);
          }}
        />
      </>
    );
  }
}

export default withUI(NotificationResourceList);
