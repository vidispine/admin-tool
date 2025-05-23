import React from 'react';
import { compose } from 'redux';
import { selftest as api } from '@vidispine/vdt-api';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/HelpOutline';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import { withModalNoRouter } from '../hoc/withModal';
import { withSnackbarNoRouter } from '../hoc/withSnackbar';
import SelfTestStatus from '../components/selftest/SelfTestStatus';
import LoginCard from '../components/login/Login';
import InitDialog from '../components/login/InitDialog';
import LoginHelpDialog from '../components/login/LoginHelpDialog';
import GitHubButton from '../components/ui/GitHubButton';

import { APP_LOGO } from '../const/logos';
import { getVidispineUrlFromPath } from '../const';

const INIT_MODAL = 'INIT_MODAL';
const HELP_DIALOG = 'HELP_DIALOG';

const { VITE_VERSION } = import.meta.env;
const theme = (outerTheme) => createTheme({ ...outerTheme, palette: { type: 'light' } });

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onTestUrl = this.onTestUrl.bind(this);
    this.state = {
      selfTestDocument: undefined,
      loading: false,
      loadingInit: false,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin';
    const { baseUrl } = this.props;
    if (baseUrl) {
      this.onRefresh();
    }
  }

  async onRefresh() {
    const { onOpen, useDevProxy, useContainerProxy } = this.props;
    this.setState({ selfTestDocument: undefined });
    await this.setState({ loading: true });
    let baseURL = useDevProxy ? window.location.origin : this.props.baseUrl;
    if (useContainerProxy) baseURL = window.location.origin;
    try {
      api
        .listSelfTest({
          noAuth: true,
          baseURL,
          headers: useContainerProxy
            ? { 'X-Proxy-URL': this.props.baseUrl }
            : {},
        })
        .then(({ data: selfTestDocument }) => {
          this.setState({ selfTestDocument, loading: false });
          const { status, test: testList = [] } = selfTestDocument;
          let initTest;
          if (status === 'warning') {
            initTest = testList.find((thisTest) => {
              const { name, test: subTestList = [] } = thisTest;
              if (name === 'database') {
                return subTestList.find((thisSubTest) => {
                  const { message: messageList = [] } = thisSubTest;
                  return messageList.find((message) => message.includes('did APIInit run?'));
                });
              }
              return false;
            });
          }
          if (initTest) {
            onOpen({ modalName: INIT_MODAL });
          }
        })
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    this.setState({ loading: false, selfTestDocument: { status: 'failed' } });
    const messageContent = 'Error Contacting Server';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onSuccess({
    data: token, userName: newUserName, runAs, baseUrl,
  }) {
    if (baseUrl) {
      const encodedBaseUrl = encodeURIComponent(baseUrl);
      const encodedPathBaseUrl = getVidispineUrlFromPath()
        ? encodeURIComponent(getVidispineUrlFromPath()) : undefined;
      const pathname = window.location.pathname.replace(/(.+?)\/+$/, '$1');
      if (!pathname.includes(encodedBaseUrl)) {
        let newPath;
        if (encodedPathBaseUrl && pathname.includes(encodedPathBaseUrl)) {
          newPath = pathname.replace(encodedPathBaseUrl, encodedBaseUrl);
        } else {
          newPath = pathname === '/' ? [encodedBaseUrl, '/'].join('') : [pathname, encodedBaseUrl, ''].join('/');
        }
        window.history.pushState({}, '', newPath);
      }
    }
    const {
      setUserName,
      setToken,
      setRunAs,
      setResponseInterceptor,
      setBaseUrl,
    } = this.props;
    if (runAs) {
      setRunAs(runAs, baseUrl);
    }
    setResponseInterceptor();
    setUserName(newUserName, baseUrl);
    setToken(token, baseUrl);
    setBaseUrl(baseUrl);
  }

  onTestUrl(baseUrl) {
    const { setBaseUrl } = this.props;
    setBaseUrl(baseUrl);
    this.onRefresh();
  }

  render() {
    const {
      selfTestDocument, loading, loadingInit,
    } = this.state;
    const {
      userName, baseUrl, onOpen, useDevProxy,
    } = this.props;
    const initialValues = {
      headers: { username: userName, accept: 'text/plain' },
      queryParams: { autoRefresh: true, seconds: 604800 },
      baseUrl,
    };
    const { status } = selfTestDocument || {};
    return (
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid item sm={4}>
            <Card elevation={0} square style={{ height: '100vh' }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ height: '100%' }}
              >
                <Grid item>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    direction="row"
                    style={{ height: 35, marginBottom: 20 }}
                  >
                    {selfTestDocument && (
                      <SelfTestStatus
                        selfTestDocument={selfTestDocument}
                        clickable
                        onClick={this.onRefresh}
                        loading={loading}
                      />
                    )}
                  </Grid>
                  <LoginCard
                    initialValues={initialValues}
                    onSuccess={this.onSuccess}
                    onTestUrl={this.onTestUrl}
                    status={status}
                    useDevProxy={useDevProxy}
                  />
                </Grid>
              </Grid>
              <AppBar
                color="inherit"
                style={{
                  top: 'auto',
                  bottom: 0,
                  backgroundColor: 'black',
                  color: 'white',
                }}
                square
                elevation={0}
              >
                <Toolbar variant="dense">
                  <Grid container justifyContent="flex-end" alignItems="center">
                    <Link
                      href="https://github.com/vidispine/admin-tool"
                      variant="body2"
                      color="inherit"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginRight: 5 }}
                    >
                      VidiCore Admin
                    </Link>
                    <Typography variant="body2" color="inherit">
                      {`v${VITE_VERSION}`}
                    </Typography>
                    <GitHubButton />
                    <IconButton
                      color="inherit"
                      disableRipple
                      onClick={() => onOpen({ modalName: HELP_DIALOG })}
                    >
                      <HelpIcon />
                    </IconButton>
                  </Grid>
                </Toolbar>
              </AppBar>
            </Card>
          </Grid>
          <Grid
            item
            sm={8}
            style={{
              background:
                'linear-gradient(-45deg,#b0c800,#0068a9 0,#0068a9 33%,#002749 100%,#b0c800 0)',
            }}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <APP_LOGO
              alt="VidiCore Admin Tool"
              style={{
                height: 'inherit',
                width: '25vw',
                minWidth: '100px',
                backgroundColor: '#fff',
              }}
            />
          </Grid>
        </Grid>
        <InitDialog
          dialogName={INIT_MODAL}
          onSuccess={this.onRefresh}
          loadingInit={loadingInit}
          setLoadingInit={(newState) => this.setState({ loadingInit: newState })}
        />
        <LoginHelpDialog dialogName={HELP_DIALOG} baseUrl={baseUrl} />
      </ThemeProvider>
    );
  }
}

export default compose(withModalNoRouter, withSnackbarNoRouter)(Login);
