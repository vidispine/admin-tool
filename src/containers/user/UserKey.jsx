import { PureComponent } from 'react';

import { user as api } from '@vidispine/vdt-api';

import UserKeyCard from '../../components/user/UserKeyCard';
import UserKeyDialog from '../../components/user/UserKeyDialog';
import withUI from '../../hoc/withUI';

const USERKEY_CREATE_MODAL = 'USERKEY_CREATE_MODAL';

class UserKey extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
    this.onSetAccessKey = this.onSetAccessKey.bind(this);
    this.state = {
      accessKeyListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    const { userName } = this.props;
    document.title = `VidiCore Admin | User | ${userName} | Keys`;
  }

  UNSAFE_componentWillReceiveProps({ userName }) {
    const { userName: prevUserName } = this.props;
    if (prevUserName !== userName) {
      this.onFetch(userName);
      document.title = `VidiCore Admin | User | ${userName} | Keys`;
    }
  }

  onRefresh() {
    const { userName } = this.props;
    this.onFetch(userName);
  }

  onFetch(userName) {
    try {
      api
        .listKey({ userName })
        .then((response) => this.setState({ accessKeyListDocument: response.data }))
        .catch((error) => this.onFetchError(error));
    } catch (error) {
      this.onFetchError(error);
    }
  }

  onSetAccessKey(accessKeyDocument) {
    this.setState({ accessKeyDocument });
  }

  onFetchError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading User Keys';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { accessKeyListDocument, accessKeyDocument } = this.state;
    const { userName, titleComponent: TitleComponent, tabComponent: TabComponent } = this.props;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            title="Keys"
            grandParentTitle="User"
            grandParentTo="/user/"
            parentTitle={userName}
            parentTo={`/user/${userName}`}
            onRefresh={this.onRefresh}
            code={accessKeyListDocument}
            codeModal="AccessKeyListDocument"
            createModal={USERKEY_CREATE_MODAL}
            createModalTitle="Create New Key"
          />
        )}
        {TabComponent && <TabComponent />}
        <UserKeyCard
          accessKeyListDocument={accessKeyListDocument}
          userName={userName}
          onRemoveSuccess={this.onRefresh}
        />
        <UserKeyDialog
          dialogName={USERKEY_CREATE_MODAL}
          onSuccess={this.onRefresh}
          accessKeyDocument={accessKeyDocument}
          onSetAccessKey={this.onSetAccessKey}
          userName={userName}
        />
      </>
    );
  }
}

export default withUI(UserKey);
