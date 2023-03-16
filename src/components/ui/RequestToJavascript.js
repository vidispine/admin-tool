import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';
import stringifyObject from 'stringify-object';

import TextGrid from './TextGrid';

const STANDARD_HEADERS = ['accept', 'content-type', 'authorization'];

const requestToJavascriptApi = ({
  method, fullUrl, requestHeaders, requestData, requestContentType,
}) => {
  const output = [];
  let requestBody;
  const url = new URL(fullUrl);
  if (url.pathname.startsWith('/API/')) {
    output.push('api');
    output.push(`path('${url.pathname.replace('/API/', '')}')`);
  } else {
    output.push('http');
    output.push(`uri('${url.origin}${url.pathname}')`);
  }
  const headers = Object.entries(requestHeaders).filter(
    ([key]) => !STANDARD_HEADERS.includes(key.toLowerCase()),
  );
  headers.forEach(([key, value]) => output.push(`header('${key}', '${value}')`));
  const queryParams = [...url.searchParams.entries()];
  queryParams.forEach(([key, value]) => output.push(`queryParam('${key}', '${value}')`));
  const isJson = requestContentType && requestContentType.toLowerCase() === 'application/json';
  if (requestData !== undefined) {
    const requestString = isJson ? stringifyObject(requestData, { indent: '  ' }) : `\`${requestData}\``;
    requestBody = `const requestBody = ${requestString};`;
    output.push('input(requestBody)');
    if (!isJson) output.push(`dataType('${requestContentType}')`);
  }
  output.push(`${method.toLowerCase()}();`);
  const lineLength = output.join('').length;
  output[1] = [output[0], output[1]].join('.'); // always keep first two on same line
  output.splice(0, 1);
  const outputString = output.join(lineLength > 100 ? '\n  .' : '.'); // new line if over 100 chars
  if (requestBody) {
    return [requestBody, outputString].join('\n\n');
  }
  return outputString;
};

function RequestToJavascript({ request, onClick: propsOnClick, label = 'Go To JavaScript Test' }) {
  const value = requestToJavascriptApi(request);
  const onClick = propsOnClick ? () => propsOnClick(value) : undefined;
  return (
    <>
      <TextGrid
        value={value}
        variant="code"
        codeProps={{ lineNumbers: false, mode: 'javascript' }}
      />
      {onClick && label ? (
        <Button
          variant="text"
          startIcon={<ArrowForwardIcon />}
          onClick={onClick}
        >
          {label}
        </Button>
      ) : null}
    </>
  );
}

export default RequestToJavascript;
