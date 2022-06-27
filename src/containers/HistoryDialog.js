import React from 'react';
import { compose } from 'redux';
import ReactJson from 'react-json-view';
import { utils as api } from '@vidispine/vdt-api';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Table from '../components/ui/Table';
import TableBody from '../components/ui/TableBody';
import TableCell from '../components/ui/TableCell';
import TableRow from '../components/ui/TableRow';
import TextGrid from '../components/ui/TextGrid';
import TypeArray from '../components/ui/TypeArray';
import formatXML from '../utils/formatXML';

import { withModalNoRouter } from '../hoc/withModal';

const escapeBash = (str) => String(str).replaceAll('\'', '\'\\\'\'');

const requestToCurl = ({
  method, fullUrl, requestHeaders, requestData, requestContentType,
}) => {
  const output = [];
  output.push(`curl '${escapeBash(fullUrl)}'`);
  output.push(`--request ${method}`);
  Object.entries(requestHeaders).forEach(([key, value]) => output.push(`--header '${escapeBash(`${key}: ${value}`)}'`));
  if (requestData) {
    if (requestContentType === 'application/json') output.push(`--data-raw '${escapeBash(JSON.stringify(requestData))}'`);
    else output.push(`--data-raw '${escapeBash(requestData)}'`);
  }
  return output.join(' \\\n');
};

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
});

class HistoryDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRequest = this.onRequest.bind(this);
    this.onResponse = this.onResponse.bind(this);
    this.onClose = this.onClose.bind(this);
    this.maxReponsesLength = 20;
    this.requestInterceptor = api.defaultClient.interceptors.request.use(
      (request) => {
        request.requestId = Math.random().toString(36).substr(2, 12);
        this.onRequest(request);
        return request;
      },
    );
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
      curlResponse: undefined,
    };
  }

  componentWillUnmount() {
    api.defaultClient.interceptors.request.eject(this.requestInterceptor);
    api.defaultClient.interceptors.response.eject(this.responseInterceptor);
  }

  onRequest(request) {
    if (!request) {
      return;
    }
    const { recentResponses: prevResponses } = this.state;
    const {
      requestId,
      headers = {},
      data: requestData,
      method,
      url,
      baseURL,
    } = request;
    let { url: fullUrl } = request;
    if (baseURL) fullUrl = [baseURL, url].join('');
    const requestHeaders = {};
    Object.entries(headers).forEach(([key, value]) => {
      if (typeof value === 'string') { requestHeaders[key] = value; }
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
    const {
      config = {},
      status,
      headers: responseHeaders = {},
      data: responseData,
    } = response;
    const {
      requestId,
    } = config;
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
    this.setState({ displayResponse: undefined, curlResponse: undefined });
  }

  render() {
    const {
      classes,
      open,
    } = this.props;
    const {
      recentResponses,
      displayResponse,
      curlResponse,
    } = this.state;
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
            { displayResponse ? (
              <div className={classes.displayToolbar}>
                <IconButton
                  onClick={() => this.setState({
                    displayResponse: undefined,
                    curlResponse: undefined,
                  })}
                  style={{ padding: 4 }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => this.setState({ curlResponse: !curlResponse })}
                >
                  {curlResponse ? 'Hide cURL' : 'cURL'}
                </Button>
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
            {curlResponse ? (
              <TextGrid
                value={requestToCurl(displayResponse)}
                variant="code"
                codeProps={{ lineNumbers: false, mode: 'shell' }}
              />
            ) : (
              <>
                <TextGrid title="URL" value={displayResponse.fullUrl} hover />
                <TextGrid title="Method" value={displayResponse.method} hover />
                <TextGrid title="Status" value={displayResponse.status} hover />
                <TypeArray
                  arrayTitle="Request Headers"
                  value={Object.entries(displayResponse.requestHeaders)}
                  component={({ value: v }) => {
                    const [headerKey] = v;
                    let [, headerValue] = v;
                    if (headerKey && ['authorization'].includes(headerKey.toLowerCase())) headerValue = headerValue.replace(/[^*]/g, '•');
                    return (
                      <TextGrid
                        title={headerKey}
                        value={headerValue}
                        hover
                        titleStartCase={false}
                      />
                    );
                  }}
                />
                { displayResponse.requestContentType === 'application/json' ? (
                  <>
                    <Typography variant="subtitle2">Request Data</Typography>
                    <ReactJson
                      src={displayResponse.requestData}
                      theme="solarized"
                      displayDataTypes={false}
                      collapsed={false}
                      enableClipboard={(copy) => navigator.clipboard.writeText(JSON.stringify(copy.src, null, '\t'))}
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
                  component={({ value: v }) => (
                    <TextGrid title={v[0]} value={v[1]} hover titleStartCase={false} />
                  )}
                />
                )}
                {displayResponse.responseData && (
                <>
                  { displayResponse.responseContentType === 'application/json' ? (
                    <>
                      <Typography variant="subtitle2">Response Data</Typography>
                      <ReactJson
                        src={displayResponse.responseData}
                        theme="solarized"
                        displayDataTypes={false}
                        collapsed={2}
                        enableClipboard={(copy) => navigator.clipboard.writeText(JSON.stringify(copy.src, null, '\t'))}
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
                  )}
                </>
                )}
              </>
            )}
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
                  <TableCell>
                    {thisResponse.url}
                  </TableCell>
                  <TableCell>
                    {thisResponse.method}
                  </TableCell>
                  <TableCell>
                    {thisResponse.status || 'Pending'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Dialog>
    );
  }
}

export default compose(withModalNoRouter, withStyles(styles))(HistoryDialog);
