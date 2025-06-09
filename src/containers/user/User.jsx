import { PureComponent } from 'react';
import { user as api } from '@vidispine/vdt-api';
import UserCard from '../../components/user/UserCard';
import UserGroupCard from '../../components/user/UserGroupCard';
import SimpleMetadataCard from '../../components/ui/SimpleMetadataCard';
import UserRealName from '../../components/user/UserRealName';
import UserAliasAddDialog from '../../components/user/UserAliasAddDialog';
import UserAliasRemoveDialog from '../../components/user/UserAliasRemoveDialog';

import withUI from '../../hoc/withUI';

const USER_REALNAME_DIALOG = 'USER_REALNAME_DIALOG';
const USER_ALIAS_ADD_DIALOG = 'USER_ALIAS_ADD_DIALOG';
const USER_ALIAS_REMOVE_DIALOG = 'USER_ALIAS_REMOVE_DIALOG';

class User extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onDeleteAlias = this.onDeleteAlias.bind(this);
    this.state = {
      userDocument: undefined,
      alias: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    const { setOnRefresh } = this.props;
    if (setOnRefresh) setOnRefresh(this.onRefresh);
  }

  UNSAFE_componentWillReceiveProps({ userName }) {
    const { userName: prevUserName } = this.props;
    if (prevUserName !== userName) {
      this.onFetch(userName);
      document.title = `VidiCore Admin | User | ${userName}`;
    }
  }

  onRefresh() {
    const { userName } = this.props;
    this.onFetch(userName);
  }

  onFetch(userName) {
    try {
      api
        .getUser({ userName })
        .then((response) => this.setState({ userDocument: response.data }))
        .catch((error) => this.onFetchError(error));
    } catch (error) {
      this.onFetchError(error);
    }
  }

  onFetchError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading User';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading User';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onDeleteAlias(event, alias) {
    const { onOpen } = this.props;
    this.setState({ alias }, () => onOpen({ modalName: USER_ALIAS_REMOVE_DIALOG }));
  }

  render() {
    const {
      userName,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    const { userDocument, alias } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={userDocument}
            codeModal="UserDocument"
            onRefresh={this.onRefresh}
            realNameModal={USER_REALNAME_DIALOG}
            aliasModal={USER_ALIAS_ADD_DIALOG}
          />
        )}
        {TabComponent && <TabComponent />}
        {userDocument && (
          <>
            <UserCard
              userDocument={userDocument}
              onDeleteAlias={this.onDeleteAlias}
            />
            <SimpleMetadataCard
              simpleMetadataDocument={userDocument.metadata}
              onSuccess={this.onRefresh}
              entityType="user"
              entityId={userName}
            />
            <UserGroupCard
              groupListDocument={userDocument.groupList}
              onSuccess={this.onRefresh}
              userName={userName}
            />
          </>
        )}
        <UserRealName
          dialogName={USER_REALNAME_DIALOG}
          onSuccess={this.onRefresh}
          userName={userName}
          realName={userDocument?.realName}
        />
        <UserAliasAddDialog
          dialogName={USER_ALIAS_ADD_DIALOG}
          onSuccess={this.onRefresh}
          userName={userName}
        />
        <UserAliasRemoveDialog
          dialogName={USER_ALIAS_REMOVE_DIALOG}
          userName={userName}
          alias={alias}
          onSuccess={this.onRefresh}
        />
      </>
    );
  }
}

export default withUI(User);
