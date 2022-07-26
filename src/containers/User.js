import React from 'react';

import { user as api } from '@vidispine/vdt-api';
import UserTitle from '../components/user/UserTitle';
import UserCard from '../components/user/UserCard';
import UserGroupCard from '../components/user/UserGroupCard';
import UserPassword from '../components/user/UserPassword';
import UserToken from '../components/user/UserToken';
import UserRealName from '../components/user/UserRealName';
import UserAliasAddDialog from '../components/user/UserAliasAddDialog';
import UserAliasRemoveDialog from '../components/user/UserAliasRemoveDialog';
import UserDisableDialog from '../components/user/UserDisableDialog';
import UserUserNameDialog from '../components/user/UserUserNameDialog';
import SimpleMetadataCard from '../components/ui/SimpleMetadataCard';

import withUI from '../hoc/withUI';

const USER_PASSWORD_DIALOG = 'USER_PASSWORD_DIALOG';
const USER_TOKEN_DIALOG = 'USER_TOKEN_DIALOG';
const USER_REALNAME_DIALOG = 'USER_REALNAME_DIALOG';
const USER_ALIAS_ADD_DIALOG = 'USER_ALIAS_ADD_DIALOG';
const USER_ALIAS_REMOVE_DIALOG = 'USER_ALIAS_REMOVE_DIALOG';
const USER_DISABLE_DIALOG = 'USER_DISABLE_DIALOG';
const USER_USERNAME_DIALOG = 'USER_USERNAME_DIALOG';

class User extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
    this.onEnable = this.onEnable.bind(this);
    this.onDisableSuccess = this.onDisableSuccess.bind(this);
    this.onDeleteAlias = this.onDeleteAlias.bind(this);
    this.onUserNameSuccess = this.onUserNameSuccess.bind(this);
    this.state = {
      userDocument: undefined,
      userToken: undefined,
      alias: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    const { userName } = this.props;
    document.title = `VidiCore Admin | User | ${userName}`;
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
      api.getUser({ userName })
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

  onEnable() {
    const { userName, openSnackBar } = this.props;
    try {
      api.enableUser({ userName })
        .then(() => {
          const messageContent = 'User Enabled';
          openSnackBar({ messageContent });
          this.onRefresh();
        })
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onDisableSuccess(response, dispatch, props) {
    const { history } = this.props;
    const hard = props?.values?.queryParams?.hard;
    if (hard === true || hard === 'true') history.push('/user/');
    else this.onRefresh();
  }

  onUserNameSuccess(response, dispatch, props) {
    const { history } = this.props;
    const userName = props?.values?.userDocument?.userName;
    if (userName) history.push(`/user/${userName}`);
    else this.onRefresh();
  }

  onDeleteAlias(event, alias) {
    const { onOpen } = this.props;
    this.setState({ alias }, () => onOpen({ modalName: USER_ALIAS_REMOVE_DIALOG }));
  }

  render() {
    const { userDocument, userToken, alias } = this.state;
    const { userName } = this.props;
    return (
      <>
        <UserTitle
          onRefresh={this.onRefresh}
          code={userDocument}
          codeModal="UserDocument"
          userName={userName}
          passwordModal={USER_PASSWORD_DIALOG}
          realNameModal={USER_REALNAME_DIALOG}
          aliasModal={USER_ALIAS_ADD_DIALOG}
          tokenModal={USER_TOKEN_DIALOG}
          onEnable={this.onEnable}
          disableModal={USER_DISABLE_DIALOG}
          userNameModal={USER_USERNAME_DIALOG}
        />
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
            <UserRealName
              dialogName={USER_REALNAME_DIALOG}
              onSuccess={this.onRefresh}
              userName={userName}
              realName={userDocument.realName}
            />
            <UserAliasAddDialog
              dialogName={USER_ALIAS_ADD_DIALOG}
              onSuccess={this.onRefresh}
              userName={userName}
            />
          </>
        )}
        <UserPassword
          dialogName={USER_PASSWORD_DIALOG}
          userName={userName}
        />
        <UserDisableDialog
          dialogName={USER_DISABLE_DIALOG}
          userName={userName}
          onSuccess={this.onDisableSuccess}
        />
        <UserUserNameDialog
          dialogName={USER_USERNAME_DIALOG}
          userName={userName}
          onSuccess={this.onUserNameSuccess}
        />
        <UserAliasRemoveDialog
          dialogName={USER_ALIAS_REMOVE_DIALOG}
          userName={userName}
          alias={alias}
          onSuccess={this.onRefresh}
        />
        <UserToken
          dialogName={USER_TOKEN_DIALOG}
          userName={userName}
          userToken={userToken}
          onSuccess={(response) => this.setState({ userToken: response.data })}
        />
      </>
    );
  }
}

export default withUI(User);
