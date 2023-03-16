import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';

import TextGrid from './TextGrid';

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

function RequestToCurl({ request, onClick: propsOnClick, label }) {
  const value = requestToCurl(request);
  const onClick = propsOnClick ? () => propsOnClick(value) : undefined;
  return (
    <>
      <TextGrid
        value={value}
        variant="code"
        codeProps={{ lineNumbers: false, mode: 'shell' }}
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

export default RequestToCurl;
