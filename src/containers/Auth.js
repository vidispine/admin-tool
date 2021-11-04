import React from 'react';
import { withCookies } from 'react-cookie';
import { utils as api } from '@vidispine/vdt-api';

import {
  AUTH_TOKEN,
  AUTH_USERNAME,
  AUTH_RUNAS,
  AUTH_VIDISPINE_SERVER_URL,
} from '../const/Auth';
import { getBasename, getBaseUrlFromPath } from '../const';

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
    if (window.VIDISPINE_URL !== '$VIDISPINE_URL') this.windowBaseUrl = window.location.origin;
    const { cookies } = this.props;
    this.basename = getBasename();
    let baseUrl = cookies.get(AUTH_VIDISPINE_SERVER_URL, { path: this.basename });
    const baseUrlFromPath = getBaseUrlFromPath();
    if (baseUrlFromPath && !this.windowBaseUrl) {
      baseUrl = decodeURIComponent(baseUrlFromPath);
      this.windowBaseUrl = decodeURIComponent(baseUrlFromPath);
    }
    const token = cookies.get(AUTH_TOKEN, { path: this.basename });
    const userName = cookies.get(AUTH_USERNAME, { path: this.basename });
    const runAs = cookies.get(AUTH_RUNAS, { path: this.basename });
    if (baseUrl && baseUrl !== 'undefined') {
      api.defaultClient.defaults.baseURL = baseUrl;
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

  setUserName(userName) {
    const { cookies } = this.props;
    cookies.set(AUTH_USERNAME, userName, { path: this.basename });
    this.setState({ userName });
  }

  setToken(token) {
    const { cookies } = this.props;
    cookies.set(AUTH_TOKEN, token, { path: this.basename });
    api.defaultClient.defaults.headers.Authorization = `token ${token}`;
    this.setState({ token });
  }

  setRunAs(runAs) {
    const { cookies } = this.props;
    cookies.set(AUTH_RUNAS, runAs, { path: this.basename });
    api.defaultClient.defaults.headers.RunAs = runAs;
    this.setState({ runAs });
  }

  setBaseUrl(baseUrl) {
    const { cookies } = this.props;
    localStorage.setItem('vsBaseUrl', baseUrl);
    cookies.set(AUTH_VIDISPINE_SERVER_URL, baseUrl, { path: this.basename });
    api.defaultClient.defaults.baseURL = baseUrl;
    this.setState({ baseUrl });
  }

  unsetUserName() {
    const { cookies } = this.props;
    cookies.remove(AUTH_USERNAME, { path: this.basename });
    this.setState({ userName: undefined });
    this.unsetToken();
  }

  unsetToken() {
    const { cookies } = this.props;
    cookies.remove(AUTH_TOKEN, { path: this.basename });
    delete api.defaultClient.defaults.headers.Authorization;
    this.setState({ token: undefined });
  }

  unsetRunAs() {
    const { cookies } = this.props;
    cookies.remove(AUTH_RUNAS, { path: this.basename });
    delete api.defaultClient.defaults.headers.RunAs;
    this.setState({ runAs: undefined });
  }

  unsetBaseUrl() {
    const { cookies } = this.props;
    cookies.remove(AUTH_VIDISPINE_SERVER_URL, { path: this.basename });
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
          {...props}
        />
      ) : (
        <Login
          userName={userName}
          runAs={runAs}
          baseUrl={this.windowBaseUrl || baseUrl}
          setUserName={this.setUserName}
          setToken={this.setToken}
          setBaseUrl={this.setBaseUrl}
          setRunAs={this.setRunAs}
          {...props}
        />
      )
    );
  }
}

export default withCookies(Auth);
