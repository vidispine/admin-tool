import { Component } from 'react';

import { withCookies } from 'react-cookie';
import { compose } from 'redux';

import { noauth as NoAuthApi, utils as api } from '@vidispine/vdt-api';

import {
  getBasename,
  getVidispineUrlFromCookie,
  getVidispineUrlFromWindow,
  getVidispineUrlFromEnv,
  getVidispineUrlFromPath,
  getContainerProxyFromWindow,
  setCookiePath,
  APP_BASENAME,
} from '../const';
import {
  AUTH_TOKEN,
  AUTH_USERNAME,
  AUTH_RUNAS,
  AUTH_VIDISPINE_SERVER_URL,
  AUTH_IS_AUTHENTICATED,
  PROXY_HEADER,
} from '../const/Auth';
import { withSnackbarNoRouter } from '../hoc/withSnackbar';
import setWelcomeConsoleMessage from '../utils/setWelcomeConsoleMessage';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.setUserName = this.setUserName.bind(this);
    this.unsetUserName = this.unsetUserName.bind(this);
    this.setToken = this.setToken.bind(this);
    this.unsetToken = this.unsetToken.bind(this);
    this.setRunAs = this.setRunAs.bind(this);
    this.unsetRunAs = this.unsetRunAs.bind(this);
    this.setBaseUrl = this.setBaseUrl.bind(this);
    this.unsetBaseUrl = this.unsetBaseUrl.bind(this);
    this.setResponseInterceptor = this.setResponseInterceptor.bind(this);
    this.unsetResponseInterceptor = this.unsetResponseInterceptor.bind(this);

    this.cookieVidispineUrl = getVidispineUrlFromCookie();
    this.windowVidispineUrl = getVidispineUrlFromWindow();
    this.envVidispineUrl = getVidispineUrlFromEnv();
    this.pathVidispineUrl = getVidispineUrlFromPath();
    this.useContainerProxy = getContainerProxyFromWindow();
    const baseURL =
      this.pathVidispineUrl ||
      this.windowVidispineUrl ||
      this.envVidispineUrl ||
      this.cookieVidispineUrl;
    this.useDevProxy =
      this.useContainerProxy === undefined &&
      baseURL !== undefined &&
      (baseURL === this.windowVidispineUrl || baseURL === this.envVidispineUrl);
    this.basename = getBasename(baseURL);
    const atBasename = window.location.pathname.startsWith(APP_BASENAME);
    if (atBasename === false) {
      window.history.pushState({}, '', APP_BASENAME);
      window.location.reload();
    }
    const { cookies } = this.props;
    const token = cookies.get(AUTH_TOKEN, { path: this.basename });
    const userName = cookies.get(AUTH_USERNAME, { path: this.basename });
    const runAs = cookies.get(AUTH_RUNAS, { path: this.basename });
    // see if the app is logged in even if it cannot read the token cookie
    const isAuthenticated = cookies.get(AUTH_IS_AUTHENTICATED, { path: APP_BASENAME });
    if (
      isAuthenticated === 'true' &&
      this.cookieVidispineUrl &&
      this.pathVidispineUrl === undefined
    ) {
      // Set baseURL in path then reload page to read token cookie
      const appBaseName = APP_BASENAME;
      const { cookieVidispineUrl } = this;
      const encodedBaseUrl = encodeURIComponent(cookieVidispineUrl);
      const currentPathName = window.location.pathname;
      const newRootPath = `${appBaseName}/${encodedBaseUrl}/`.replaceAll('//', '/');
      if (!currentPathName.startsWith(newRootPath) && !newRootPath.includes('undefined')) {
        window.history.pushState({}, '', newRootPath);
        window.location.reload();
      }
    }

    if (this.useContainerProxy) {
      api.defaultClient.defaults.headers[PROXY_HEADER] = baseURL;
      api.defaultClient.defaults.baseURL = window.location.origin;
    } else if (this.useDevProxy) {
      api.defaultClient.defaults.baseURL = window.location.origin;
    } else if (baseURL && baseURL !== 'undefined') {
      api.defaultClient.defaults.baseURL = this.useDevProxy ? window.location.origin : baseURL;
    }

    if (token && token !== 'undefined') {
      api.defaultClient.defaults.headers.Authorization = `token ${token}`;
      this.setResponseInterceptor();
      setWelcomeConsoleMessage();
    }
    if (runAs && runAs !== 'undefined') {
      api.defaultClient.defaults.headers.RunAs = runAs;
    }
    this.state = {
      token: token !== 'undefined' ? token : undefined,
      userName: userName !== 'undefined' ? userName : undefined,
      runAs: runAs !== 'undefined' ? runAs : undefined,
      baseURL: baseURL !== 'undefined' ? baseURL : undefined,
    };
  }

  setUserName(userName, baseURL) {
    const { cookies } = this.props;
    const path = setCookiePath(baseURL);
    cookies.set(AUTH_USERNAME, userName, { path });
    this.setState({ userName });
  }

  setToken(token, baseURL) {
    const { cookies } = this.props;
    const path = setCookiePath(baseURL);
    cookies.set(AUTH_TOKEN, token, { path: setCookiePath(baseURL) });
    cookies.set(AUTH_IS_AUTHENTICATED, true, { path: APP_BASENAME });
    api.defaultClient.defaults.headers.Authorization = `token ${token}`;
    this.setState({ token });
    this.setResponseInterceptor();
  }

  setResponseInterceptor() {
    const { openSnackBar } = this.props;
    this.responseInterceptor = api.defaultClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status) {
          if (error.response.status === 401) {
            const messageContent = 'Logged Out';
            openSnackBar({ messageContent, messageColor: 'secondary' });
            setTimeout(() => this.unsetToken(), 1000);
          }
        } else {
          const { config: { baseURL } = {} } = error;
          if (!this.checkOnline) {
            this.checkOnline = true;
            NoAuthApi.getSelfTest({ baseURL })
              .then(() => {
                const messageContent = 'Logged Out';
                openSnackBar({ messageContent, messageColor: 'secondary' });
                // setTimeout(() => this.unsetToken(), 1000);
                this.checkOnline = false;
              })
              .catch(() => {
                const messageContent = 'Server Offline';
                openSnackBar({ messageContent, messageColor: 'secondary' });
                this.checkOnline = false;
              }); // Will throw if offline or CORS error
          }
        }
        return Promise.reject(error);
      },
    );
  }

  setRunAs(runAs, baseURL) {
    const { cookies } = this.props;
    cookies.set(AUTH_RUNAS, runAs, { path: setCookiePath(baseURL) });
    api.defaultClient.defaults.headers.RunAs = runAs;
    this.setState({ runAs });
  }

  setBaseUrl(baseURL) {
    const { cookies } = this.props;
    cookies.set(AUTH_VIDISPINE_SERVER_URL, baseURL, { path: APP_BASENAME });
    if (this.windowVidispineUrl !== baseURL) this.useDevProxy = false;
    if (this.useContainerProxy) {
      api.defaultClient.defaults.headers[PROXY_HEADER] = baseURL;
      api.defaultClient.defaults.baseURL = window.location.origin;
    } else if (this.useDevProxy) {
      api.defaultClient.defaults.baseURL = window.location.origin;
    } else {
      api.defaultClient.defaults.baseURL = baseURL;
    }

    this.setState({ baseURL });
  }

  unsetResponseInterceptor() {
    if (this.responseInterceptor) {
      api.defaultClient.interceptors.response.eject(this.responseInterceptor);
    }
  }

  unsetUserName() {
    const { cookies } = this.props;
    const { baseURL } = this.state;
    cookies.remove(AUTH_USERNAME, { path: setCookiePath(baseURL) });
    this.setState({ userName: undefined });
    this.unsetToken();
  }

  unsetToken() {
    const { cookies } = this.props;
    const { baseURL } = this.state;
    cookies.remove(AUTH_TOKEN, { path: setCookiePath(baseURL) });
    cookies.remove(AUTH_IS_AUTHENTICATED, { path: APP_BASENAME });
    delete api.defaultClient.defaults.headers.Authorization;
    this.setState({ token: undefined });
  }

  unsetRunAs() {
    const { cookies } = this.props;
    const { baseURL } = this.state;
    cookies.remove(AUTH_RUNAS, { path: setCookiePath(baseURL) });
    delete api.defaultClient.defaults.headers.RunAs;
    this.setState({ runAs: undefined });
  }

  unsetBaseUrl() {
    const { cookies } = this.props;
    cookies.remove(AUTH_VIDISPINE_SERVER_URL, { path: APP_BASENAME });
    delete api.defaultClient.defaults.baseURL;
    this.setState({ baseURL: undefined });
  }

  render() {
    const { token, userName, runAs, baseURL } = this.state;
    const { loginComponent: Login, appComponent: App, ...props } = this.props;
    return token ? (
      <App
        userName={runAs || userName}
        baseURL={baseURL}
        unsetResponseInterceptor={this.unsetResponseInterceptor}
        unsetUserName={this.unsetUserName}
        unsetToken={this.unsetToken}
        unsetRunAs={this.unsetRunAs}
        useDevProxy={this.useDevProxy}
        useContainerProxy={this.useContainerProxy}
        {...props}
      />
    ) : (
      <Login
        userName={userName}
        runAs={runAs}
        baseURL={baseURL}
        setUserName={this.setUserName}
        setToken={this.setToken}
        setBaseUrl={this.setBaseUrl}
        setRunAs={this.setRunAs}
        setResponseInterceptor={this.setResponseInterceptor}
        unsetUserName={this.unsetUserName}
        unsetToken={this.unsetToken}
        unsetRunAs={this.unsetRunAs}
        useDevProxy={this.useDevProxy}
        useContainerProxy={this.useContainerProxy}
        {...props}
      />
    );
  }
}

const AuthWithSnackbarWithCookies = compose(withSnackbarNoRouter, withCookies)(Auth);

export default AuthWithSnackbarWithCookies;
