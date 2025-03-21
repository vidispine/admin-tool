import React from 'react';
import { withCookies } from 'react-cookie';
import { noauth as NoAuthApi, utils as api } from '@vidispine/vdt-api';
import { compose } from 'redux';
import { withSnackbarNoRouter } from '../hoc/withSnackbar';
import setWelcomeConsoleMessage from '../utils/setWelcomeConsoleMessage';

import {
  AUTH_TOKEN,
  AUTH_USERNAME,
  AUTH_RUNAS,
  AUTH_VIDISPINE_SERVER_URL,
  AUTH_IS_AUTHENTICATED,
} from '../const/Auth';
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

class Auth extends React.Component {
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
    const baseUrl = this.pathVidispineUrl
      || this.windowVidispineUrl
      || this.envVidispineUrl
      || this.cookieVidispineUrl;
    this.useDevProxy = this.useContainerProxy === undefined
    && baseUrl !== undefined
    && (baseUrl === this.windowVidispineUrl || baseUrl === this.envVidispineUrl);
    this.basename = getBasename(baseUrl);
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
    if (isAuthenticated === 'true' && this.cookieVidispineUrl && this.pathVidispineUrl === undefined) {
      // Set baseUrl in path then reload page to read token cookie
      const pathname = window.location.pathname.replace(/(.+?)\/+$/, '$1');
      const encodedBaseUrl = encodeURIComponent(this.cookieVidispineUrl);
      const newPath = pathname === '/' ? [encodedBaseUrl, '/'].join('') : [pathname, encodedBaseUrl, ''].join('/');
      window.history.pushState({}, '', newPath);
      window.location.reload();
    }

    if (this.useContainerProxy) {
      api.defaultClient.defaults.headers['X-Proxy-URL'] = baseUrl;
      api.defaultClient.defaults.baseURL = window.location.origin;
    } else if (baseUrl && baseUrl !== 'undefined') {
      api.defaultClient.defaults.baseURL = this.useDevProxy
        ? window.location.origin
        : baseUrl;
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
      baseUrl: baseUrl !== 'undefined' ? baseUrl : undefined,
    };
  }

  setUserName(userName, baseUrl) {
    const { cookies } = this.props;
    cookies.set(AUTH_USERNAME, userName, { path: setCookiePath(baseUrl) });
    this.setState({ userName });
  }

  setToken(token, baseUrl) {
    const { cookies } = this.props;
    cookies.set(AUTH_TOKEN, token, { path: setCookiePath(baseUrl) });
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
                setTimeout(() => this.unsetToken(), 1000);
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

  setRunAs(runAs, baseUrl) {
    const { cookies } = this.props;
    cookies.set(AUTH_RUNAS, runAs, { path: setCookiePath(baseUrl) });
    api.defaultClient.defaults.headers.RunAs = runAs;
    this.setState({ runAs });
  }

  setBaseUrl(baseUrl) {
    const { cookies } = this.props;
    cookies.set(AUTH_VIDISPINE_SERVER_URL, baseUrl, { path: APP_BASENAME });
    if (this.windowVidispineUrl !== baseUrl) {
      this.useDevProxy = false;
    }
    if (this.useContainerProxy) {
      api.defaultClient.defaults.headers['X-Proxy-URL'] = baseUrl;
      api.defaultClient.defaults.baseURL = window.location.origin;
    } else {
      api.defaultClient.defaults.baseURL = this.useDevProxy
        ? window.location.origin
        : baseUrl;
    }

    this.setState({ baseUrl });
  }

  unsetResponseInterceptor() {
    if (this.responseInterceptor) {
      api.defaultClient.interceptors.response.eject(this.responseInterceptor);
    }
  }

  unsetUserName() {
    const { cookies } = this.props;
    const { baseUrl } = this.state;
    cookies.remove(AUTH_USERNAME, { path: setCookiePath(baseUrl) });
    this.setState({ userName: undefined });
    this.unsetToken();
  }

  unsetToken() {
    const { cookies } = this.props;
    const { baseUrl } = this.state;
    cookies.remove(AUTH_TOKEN, { path: setCookiePath(baseUrl) });
    cookies.remove(AUTH_IS_AUTHENTICATED, { path: APP_BASENAME });
    delete api.defaultClient.defaults.headers.Authorization;
    this.setState({ token: undefined });
  }

  unsetRunAs() {
    const { cookies } = this.props;
    const { baseUrl } = this.state;
    cookies.remove(AUTH_RUNAS, { path: setCookiePath(baseUrl) });
    delete api.defaultClient.defaults.headers.RunAs;
    this.setState({ runAs: undefined });
  }

  unsetBaseUrl() {
    const { cookies } = this.props;
    cookies.remove(AUTH_VIDISPINE_SERVER_URL, { path: APP_BASENAME });
    delete api.defaultClient.defaults.baseURL;
    this.setState({ baseUrl: undefined });
  }

  render() {
    const {
      token,
      userName,
      runAs,
      baseUrl,
    } = this.state;
    const { loginComponent: Login, appComponent: App, ...props } = this.props;
    return token ? (
      <App
        userName={runAs || userName}
        baseUrl={baseUrl}
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
        baseUrl={baseUrl}
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

export default compose(withSnackbarNoRouter, withCookies)(Auth);
