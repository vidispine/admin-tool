import { PureComponent } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import ReactJson from 'react-json-view';
import { compose } from 'redux';

import { utils as api } from '@vidispine/vdt-api';

import RequestToCurl from '../components/ui/RequestToCurl';
import RequestToJavascript from '../components/ui/RequestToJavascript';
import Table from '../components/ui/Table';
import TableBody from '../components/ui/TableBody';
import TableCell from '../components/ui/TableCell';
import TableRow from '../components/ui/TableRow';
import TextGrid from '../components/ui/TextGrid';
import TypeArray from '../components/ui/TypeArray';
import { PROXY_HEADER } from '../const/Auth';
import withModal from '../hoc/withModal';
import formatXML from '../utils/formatXML';

const TRANSFORM_CURL = 'TRANSFORM_CURL';
const TRANSFORM_JAVASCRIPTAPI = 'TRANSFORM_JAVASCRIPTAPI';

const styles = (theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: theme.palette.background.default,
  },
  scrollPaper: {
    width: '85%',
    backgroundColor: theme.palette.background.default,
  },
  dialogRoot: {
    justifyContent: 'flex-start',
  },
  displayToolbar: {
    display: 'flex',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingRight: theme.spacing(2),
  },
  transformButtonList: {
    display: 'flex',
    gap: theme.spacing(2),
  },
});

function RequestParam({ value: [paramKey, paramValue] }) {
  return <TextGrid title={paramKey} value={paramValue} hover titleStartCase={false} />;
}

function RequestHeader({ value: v }) {
  const [headerKey] = v;
  let [, headerValue] = v;
  if (headerKey && ['authorization'].includes(headerKey.toLowerCase()))
    headerValue = headerValue.replace(/[^*]/g, '•');
  return <TextGrid title={headerKey} value={headerValue} hover titleStartCase={false} />;
}

function ResponseHeader({ value: v }) {
  return <TextGrid title={v[0]} value={v[1]} hover titleStartCase={false} />;
}

class HistoryDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.onRequest = this.onRequest.bind(this);
    this.onResponse = this.onResponse.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onTransform = this.onTransform.bind(this);
    this.maxReponsesLength = 20;
    this.requestInterceptor = api.defaultClient.interceptors.request.use((request) => {
      request.requestId = Math.random().toString(36).substr(2, 12);
      this.onRequest(request);
      return request;
    });
    this.responseInterceptor = api.defaultClient.interceptors.response.use(
      (response) => {
        this.onResponse(response);
        return response;
      },
      (error) => {
        this.onResponse({ ...error.response, config: error.config });
        return Promise.reject(error);
      },
    );
    this.state = {
      recentResponses: [],
      displayResponse: undefined,
      transformResponse: undefined,
    };
  }

  componentWillUnmount() {
    api.defaultClient.interceptors.request.eject(this.requestInterceptor);
    api.defaultClient.interceptors.response.eject(this.responseInterceptor);
  }

  onRequest(request) {
    const { baseURL } = this.props;
    if (!request) {
      return;
    }
    const { recentResponses: prevResponses } = this.state;
    const { requestId, headers = {}, data: requestData, method, url } = request;
    let { url: fullUrl } = request;
    if (baseURL) fullUrl = [baseURL, url].join('');
    const requestUrl = new URL(fullUrl);
    const requestParams = Array.from(requestUrl.searchParams);
    const requestHeaders = {};
    Object.entries(headers).forEach(([key, value]) => {
      if (typeof value === 'string' && key !== PROXY_HEADER) {
        requestHeaders[key] = value;
      }
    });
    let requestDataString;
    let requestContentType;
    const findContentTypeKey = (headerKey) => headerKey.toLowerCase() === 'content-type';
    const requestContentTypeKey = Object.keys(requestHeaders).find(findContentTypeKey);
    if (requestContentTypeKey && requestData) {
      requestContentType = requestHeaders[requestContentTypeKey].toLowerCase();
      switch (requestContentType) {
        case 'application/xml':
          requestDataString = formatXML(requestData);
          break;
        case 'application/json':
          if (typeof requestData === 'string') {
            requestDataString = JSON.parse(requestData);
          } else {
            requestDataString = requestData;
          }
          break;
        case 'application/javascript':
          requestDataString = requestData;
          break;
        case 'text/plain':
          requestDataString = requestData;
          break;
        default:
          break;
      }
    }
    const thisRequest = {
      requestId,
      url,
      fullUrl,
      baseURL,
      method: method.toUpperCase(),
      requestData: requestDataString,
      requestHeaders,
      requestParams,
      requestContentType,
    };
    const recentResponses = [thisRequest, ...prevResponses].slice(0, this.maxReponsesLength);
    this.setState({ recentResponses });
  }

  onResponse(response) {
    if (!response) {
      return;
    }
    const { recentResponses: prevResponses } = this.state;
    const { config = {}, status, headers: responseHeaders = {}, data: responseData } = response;
    const { requestId } = config;
    let responseDataString;
    let responseContentType;
    const findContentTypeKey = (headerKey) => headerKey.toLowerCase() === 'content-type';
    const responseContentTypeKey = Object.keys(responseHeaders).find(findContentTypeKey);
    if (responseContentTypeKey) {
      responseContentType = responseHeaders[responseContentTypeKey].toLowerCase();
      switch (responseContentType) {
        case 'application/xml':
          responseDataString = formatXML(responseData);
          break;
        case 'application/json':
          responseDataString = responseData;
          break;
        case 'application/javascript':
          responseDataString = responseData;
          break;
        case 'text/plain':
          responseDataString = responseData;
          break;
        default:
          break;
      }
    }
    const thisResponse = {
      status,
      responseData: responseDataString,
      responseHeaders,
      responseContentType,
    };
    const requestIndex = prevResponses.findIndex((r) => r.requestId === requestId);
    const newResponses = [...prevResponses];
    if (requestIndex >= 0) {
      const prevResponse = prevResponses[requestIndex];
      newResponses[requestIndex] = { ...prevResponse, ...thisResponse };
    } else {
      newResponses.unshift(thisResponse);
    }
    const recentResponses = newResponses.slice(0, this.maxReponsesLength);
    this.setState({ recentResponses });
  }

  onClose() {
    const { onClose: onCloseDialog } = this.props;
    onCloseDialog();
    this.setState({ displayResponse: undefined, transformResponse: undefined });
  }

  onTransform(newstate) {
    const { transformResponse: currentState } = this.state;
    this.setState({
      transformResponse: currentState === newstate ? undefined : newstate,
    });
  }

  render() {
    const { classes, open, history } = this.props;
    const { recentResponses, displayResponse, transformResponse } = this.state;
    if (open === false) return null;
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={this.onClose}
        classes={{
          root: classes.dialogRoot,
          scrollPaper: classes.scrollPaper,
        }}
      >
        <AppBar elevation={0} className={classes.appBar}>
          <Toolbar disableGutters variant="dense">
            {displayResponse ? (
              <div className={classes.displayToolbar}>
                <IconButton
                  onClick={() =>
                    this.setState({
                      displayResponse: undefined,
                      transformResponse: undefined,
                    })
                  }
                  style={{ padding: 4 }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <div className={classes.transformButtonList}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => this.onTransform(TRANSFORM_JAVASCRIPTAPI)}
                  >
                    {transformResponse === TRANSFORM_JAVASCRIPTAPI
                      ? 'Hide Javascript API'
                      : 'Show Javascript API'}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => this.onTransform(TRANSFORM_CURL)}
                  >
                    {transformResponse === TRANSFORM_CURL ? 'Hide cURL' : 'Show cURL'}
                  </Button>
                </div>
              </div>
            ) : (
              <IconButton onClick={this.onClose}>
                <CloseIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        {displayResponse ? (
          <DialogContent>
            {transformResponse === TRANSFORM_CURL ? (
              <RequestToCurl request={displayResponse} />
            ) : null}
            {transformResponse === TRANSFORM_JAVASCRIPTAPI ? (
              <RequestToJavascript
                request={displayResponse}
                onClick={(javascriptDocument) => {
                  history.push({
                    pathname: '/javascript/test/',
                    state: { initialValues: { javascriptDocument } },
                  });
                  this.onClose();
                }}
              />
            ) : null}
            {transformResponse === undefined ? (
              <>
                <TextGrid title="URL" value={displayResponse.fullUrl} hover />
                <TextGrid title="Method" value={displayResponse.method} hover />
                <TextGrid title="Status" value={displayResponse.status} hover />
                <TypeArray
                  arrayTitle="Request Params"
                  value={displayResponse.requestParams}
                  component={RequestParam}
                />
                <TypeArray
                  arrayTitle="Request Headers"
                  value={Object.entries(displayResponse.requestHeaders)}
                  component={RequestHeader}
                />
                {displayResponse.requestContentType === 'application/json' ? (
                  <>
                    <Typography variant="subtitle2">Request Data</Typography>
                    <ReactJson
                      src={displayResponse.requestData}
                      theme="solarized"
                      displayDataTypes={false}
                      collapsed={false}
                      enableClipboard={(copy) =>
                        navigator.clipboard.writeText(JSON.stringify(copy.src, null, '\t'))
                      }
                      displayObjectSize={false}
                      name={false}
                    />
                  </>
                ) : (
                  <TextGrid
                    title="Request Data"
                    value={displayResponse.requestData}
                    variant="code"
                    hover
                    hideNoValue
                  />
                )}
                {displayResponse.responseHeaders && (
                  <TypeArray
                    arrayTitle="Response Headers"
                    value={Object.entries(displayResponse.responseHeaders)}
                    component={ResponseHeader}
                  />
                )}
                {displayResponse.responseData &&
                  (displayResponse.responseContentType === 'application/json' ? (
                    <>
                      <Typography variant="subtitle2">Response Data</Typography>
                      <ReactJson
                        src={displayResponse.responseData}
                        theme="solarized"
                        displayDataTypes={false}
                        collapsed={2}
                        enableClipboard={(copy) =>
                          navigator.clipboard.writeText(JSON.stringify(copy.src, null, '\t'))
                        }
                        name={false}
                      />
                    </>
                  ) : (
                    <TextGrid
                      title="Response Data"
                      value={displayResponse.responseData}
                      variant="code"
                      hover
                      hideNoValue
                    />
                  ))}
              </>
            ) : null}
          </DialogContent>
        ) : (
          <Table>
            <TableBody>
              {recentResponses.map((thisResponse) => (
                <TableRow
                  key={thisResponse.requestId}
                  hover
                  onClick={() => this.setState({ displayResponse: thisResponse })}
                >
                  <TableCell>{thisResponse.url}</TableCell>
                  <TableCell>{thisResponse.method}</TableCell>
                  <TableCell>{thisResponse.status || 'Pending'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Dialog>
    );
  }
}

export default compose(withModal, withStyles(styles))(HistoryDialog);
