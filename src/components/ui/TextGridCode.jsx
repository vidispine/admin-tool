import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import startCase from 'lodash.startcase';

import CodeMirror from './CodeMirror';
import formatXML from '../../utils/formatXML';
import formatJSON from '../../utils/formatJSON';

function TextGridCode({
  title,
  value,
  variant,
  titleGridProps,
  titleStartCase = true,
  codeProps = {},
  noWrapTitle = true,
  hideCode = false,
  onTextClick,
  isValueHidden,
  toggleHideValue,
}) {
  let codeValue = value || '';
  let codeMode;

  switch (variant) {
    case 'json':
    case 'application/json':
      codeValue = formatJSON(value) || '';
      codeMode = 'application/json';
      break;
    case 'xml':
    case 'application/xml':
      codeValue = formatXML(value) || '';
      codeMode = 'xml';
      break;
    case 'application/ld+json':
      codeValue = '';
      codeMode = 'application/ld+json';
      break;
    default:
      break;
  }

  return (
    <div>
      {title !== undefined && (
        <Grid container direction="row" alignItems="center" wrap="nowrap">
          <Grid md={3} sm={4} xs={6} {...titleGridProps} item>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              onClick={onTextClick}
              noWrap={noWrapTitle}
            >
              {titleStartCase ? startCase(title) : title}
            </Typography>
          </Grid>
          {hideCode === true && (
            <Button onClick={toggleHideValue} size="small" variant="outlined">
              {`${isValueHidden ? 'Show' : 'Hide'} ${
                titleStartCase ? startCase(title) : title
              }`}
            </Button>
          )}
        </Grid>
      )}
      {(hideCode === false || isValueHidden === false) && (
        <CodeMirror
          value={codeValue}
          onClick={onTextClick}
          options={{
            mode: codeMode,
            readOnly: true,
            theme: 'material',
            lineWrapping: true,
            lineNumbers: true,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            ...codeProps,
          }}
        />
      )}
    </div>
  );
}

export default TextGridCode;
