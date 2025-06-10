import { PureComponent } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/HelpOutline';
import { compose } from 'redux';

import { selftest as api } from '@vidispine/vdt-api';

import InitDialog from '../components/login/InitDialog';
import LoginCard from '../components/login/Login';
import LoginHelpDialog from '../components/login/LoginHelpDialog';
import SelfTestStatus from '../components/selftest/SelfTestStatus';
import GitHubButton from '../components/ui/GitHubButton';
import VidispineAltIcon from '../components/ui/VidispineAltIcon';
import { getVidispineUrlFromPath } from '../const';
import { withModalNoRouter } from '../hoc/withModal';
import { withSnackbarNoRouter } from '../hoc/withSnackbar';

const INIT_MODAL = 'INIT_MODAL';
const HELP_DIALOG = 'HELP_DIALOG';

const { VITE_VERSION } = import.meta.env;
const theme = (outerTheme) => createTheme({ ...outerTheme, palette: { type: 'light' } });

class Login extends PureComponent {
  constructor(props) {
    super(props);
    document.title = 'VidiCore Admin';
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
    const { baseURL } = this.props;
    if (baseURL) {
      this.onRefresh();
    }
  }

  async onRefresh() {
    const { onOpen, useDevProxy, useContainerProxy, baseURL } = this.props;
    this.setState({ selfTestDocument: undefined });
    await this.setState({ loading: true });
    let proxyBaseURL = useDevProxy ? window.location.origin : baseURL;
    if (useContainerProxy) proxyBaseURL = window.location.origin;
    try {
      api
        .listSelfTest({
          noAuth: true,
          baseURL: proxyBaseURL,
          headers: useContainerProxy ? { 'X-Proxy-URL': baseURL } : {},
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

  onSuccess({ data: token, userName: newUserName, runAs, baseURL }) {
    if (baseURL) {
      const encodedBaseUrl = encodeURIComponent(baseURL);
      const encodedPathBaseUrl = getVidispineUrlFromPath()
        ? encodeURIComponent(getVidispineUrlFromPath())
        : undefined;
      const pathname = window.location.pathname.replace(/(.+?)\/+$/, '$1');
      if (!pathname.includes(encodedBaseUrl)) {
        let newPath;
        if (encodedPathBaseUrl && pathname.includes(encodedPathBaseUrl)) {
          newPath = pathname.replace(encodedPathBaseUrl, encodedBaseUrl);
        } else {
          newPath =
            pathname === '/'
              ? [encodedBaseUrl, '/'].join('')
              : [pathname, encodedBaseUrl, ''].join('/');
        }
        window.history.pushState({}, '', newPath);
      }
    }
    const { setUserName, setToken, setRunAs, setResponseInterceptor, setBaseUrl } = this.props;
    if (runAs) {
      setRunAs(runAs, baseURL);
    }
    setResponseInterceptor();
    setUserName(newUserName, baseURL);
    setToken(token, baseURL);
    setBaseUrl(baseURL);
  }

  onTestUrl(baseURL) {
    const { setBaseUrl } = this.props;
    setBaseUrl(baseURL);
    this.onRefresh();
  }

  render() {
    const { selfTestDocument, loading, loadingInit } = this.state;
    const { userName, baseURL, onOpen, useDevProxy } = this.props;
    const initialValues = {
      headers: { username: userName, accept: 'text/plain' },
      queryParams: { autoRefresh: true, seconds: 604800 },
      baseURL,
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
              background: 'linear-gradient(rgba(22, 9, 31, 1), rgba(22, 9, 31, 1))',
            }}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <VidispineAltIcon
              alt="VidiCore Admin Tool"
              style={{
                height: 'inherit',
                width: '25vw',
                minWidth: '100px',
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
        <LoginHelpDialog dialogName={HELP_DIALOG} baseURL={baseURL} />
      </ThemeProvider>
    );
  }
}

export default compose(withModalNoRouter, withSnackbarNoRouter)(Login);
