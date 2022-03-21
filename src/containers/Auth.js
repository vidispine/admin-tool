import React from 'react';
import { withCookies } from 'react-cookie';
import { utils as api } from '@vidispine/vdt-api';

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

    this.cookieVidispineUrl = getVidispineUrlFromCookie();
    this.windowVidispineUrl = getVidispineUrlFromWindow();
    this.envVidispineUrl = getVidispineUrlFromEnv();
    this.pathVidispineUrl = getVidispineUrlFromPath();
    const baseUrl = this.pathVidispineUrl
      || this.windowVidispineUrl
      || this.envVidispineUrl
      || this.cookieVidispineUrl;
    this.useProxy = baseUrl !== undefined && (baseUrl === this.windowVidispineUrl
    || baseUrl === this.envVidispineUrl); // assume it is running in a container

    this.basename = getBasename(baseUrl);
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
    if (baseUrl && baseUrl !== 'undefined') {
      api.defaultClient.defaults.baseURL = this.useProxy ? window.location.origin : baseUrl;
    }
    if (token && token !== 'undefined') {
      api.defaultClient.defaults.headers.Authorization = `token ${token}`;
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
      this.useProxy = false;
    }
    api.defaultClient.defaults.baseURL = this.useProxy ? window.location.origin : baseUrl;
    this.setState({ baseUrl });
  }

  unsetUserName() {
    const { cookies, baseUrl } = this.props;
    cookies.remove(AUTH_USERNAME, { path: setCookiePath(baseUrl) });
    this.setState({ userName: undefined });
    this.unsetToken();
  }

  unsetToken() {
    const { cookies, baseUrl } = this.props;
    cookies.remove(AUTH_TOKEN, { path: setCookiePath(baseUrl) });
    cookies.remove(AUTH_IS_AUTHENTICATED, { path: APP_BASENAME });
    delete api.defaultClient.defaults.headers.Authorization;
    this.setState({ token: undefined });
  }

  unsetRunAs() {
    const { cookies, baseUrl } = this.props;
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
    return (
      token ? (
        <App
          userName={runAs || userName}
          baseUrl={baseUrl}
          unsetUserName={this.unsetUserName}
          unsetToken={this.unsetToken}
          unsetRunAs={this.unsetRunAs}
          useProxy={this.useProxy}
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
          useProxy={this.useProxy}
          {...props}
        />
      )
    );
  }
}

export default withCookies(Auth);
