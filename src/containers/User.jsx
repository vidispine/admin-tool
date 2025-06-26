import { PureComponent } from 'react';

import List from '@material-ui/core/List';
import { Route, Switch, generatePath } from 'react-router-dom';
import { compose } from 'redux';

import { user as api } from '@vidispine/vdt-api';

import DrawerContainer from '../components/ui/DrawerContainer';
import ListItemLink from '../components/ui/ListItemLink';
import UserDisableDialog from '../components/user/UserDisableDialog';
import UserPassword from '../components/user/UserPassword';
import UserTitle from '../components/user/UserTitle';
import UserToken from '../components/user/UserToken';
import UserUserNameDialog from '../components/user/UserUserNameDialog';
import { withRouterProps } from '../hoc/withRouterProps';
import withTabs from '../hoc/withTabs';
import withUI from '../hoc/withUI';

import UserDefault from './user/User';
import UserKey from './user/UserKey';

const USER_DEFAULT_TAB = 'USER_DEFAULT_TAB';
const USER_GRAPH_TAB = 'USER_GRAPH_TAB';

const USER_PASSWORD_DIALOG = 'USER_PASSWORD_DIALOG';
const USER_TOKEN_DIALOG = 'USER_TOKEN_DIALOG';
const USER_DISABLE_DIALOG = 'USER_DISABLE_DIALOG';
const USER_USERNAME_DIALOG = 'USER_USERNAME_DIALOG';

const TAB_TITLE = [
  {
    tab: USER_DEFAULT_TAB,
    listText: 'User',
    component: UserDefault,
    path: '/user/:userName/',
    exact: true,
  },
  {
    tab: USER_GRAPH_TAB,
    listText: 'Keys',
    component: UserKey,
    path: '/user/:userName/key',
    exact: true,
  },
];

const listComponentRoute = (props) => (
  <List>
    {TAB_TITLE.map(({ path, listText, exact }) => (
      <ListItemLink
        key={path}
        primary={listText}
        to={generatePath(path, props)}
        exact={exact}
        dense
        style={{ paddingLeft: 8 }}
        disableGutters
      />
    ))}
  </List>
);

const mainComponentRoute = (props) => (
  <Switch>
    {TAB_TITLE.map(({ path, component: RenderComponent, listText, exact }) => (
      <Route
        key={path}
        path={path}
        exact={exact}
        render={() => <RenderComponent {...props} title={listText} />}
      />
    ))}
  </Switch>
);

class User extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.setOnRefresh = this.setOnRefresh.bind(this);
    this.onEnable = this.onEnable.bind(this);
    this.onDisableSuccess = this.onDisableSuccess.bind(this);
    this.onUserNameSuccess = this.onUserNameSuccess.bind(this);
    this.state = {
      onRefresh: undefined,
      userToken: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    const { userName } = this.props;
    document.title = `VidiCore Admin | User | ${userName}`;
  }

  onRefresh() {
    const { onRefresh } = this.state;
    if (onRefresh) {
      onRefresh();
    }
  }

  onEnable() {
    const { userName, openSnackBar } = this.props;
    try {
      api
        .enableUser({ userName })
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

  setOnRefresh(onRefresh) {
    this.setState({ onRefresh });
  }

  render() {
    const { onChangeTab, tabValue, userName } = this.props;
    const { userToken } = this.state;
    const titleComponent = (props) => (
      <UserTitle
        onRefresh={this.onRefresh}
        userName={userName}
        passwordModal={USER_PASSWORD_DIALOG}
        tokenModal={USER_TOKEN_DIALOG}
        onEnable={this.onEnable}
        disableModal={USER_DISABLE_DIALOG}
        userNameModal={USER_USERNAME_DIALOG}
        {...props}
      />
    );
    return (
      <>
        <DrawerContainer
          mainComponent={mainComponentRoute}
          listComponent={listComponentRoute}
          defaultOpen
          onChangeTab={onChangeTab}
          tabValue={tabValue}
          titleComponent={titleComponent}
          setOnRefresh={this.setOnRefresh}
          userName={userName}
        />
        <UserPassword dialogName={USER_PASSWORD_DIALOG} userName={userName} />
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

export default compose(withTabs(USER_DEFAULT_TAB), withRouterProps, withUI)(User);
