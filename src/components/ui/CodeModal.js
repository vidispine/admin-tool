import React from 'react';
import ReactJson from 'react-json-view';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CodeMirror from './CodeMirror';

import withUI from '../../hoc/withUI';
import formatXML from '../../utils/formatXML';

const JavascriptVariant = ({ code, ...props }) => (
  <ReactJson
    src={code}
    theme="solarized"
    displayDataTypes={false}
    collapsed={false}
    displayObjectSize={false}
    name={false}
    enableClipboard={(copy) => navigator.clipboard.writeText(JSON.stringify(copy.src, null, '\t'))}
    {...props}
  />
);

const XmlVariant = ({ code, options = {}, ...props }) => (
  <CodeMirror
    value={formatXML(code) || ''}
    options={{
      readOnly: true,
      theme: 'material',
      mode: 'xml',
      lineWrapping: true,
      lineNumbers: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      ...options,
    }}
    {...props}
  />
);

const TextVariant = ({ code, options = {}, ...props }) => (
  <CodeMirror
    value={formatXML(code) || ''}
    options={{
      readOnly: true,
      theme: 'material',
      mode: 'text/plain',
      lineWrapping: true,
      lineNumbers: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      ...options,
    }}
    {...props}
  />
);

function CodeModal({
  code,
  title,
  open,
  onClose,
  variant = 'json',
}) {
  let CodeComponent = null;
  switch (variant) {
    case 'text/plain':
    case 'text':
      CodeComponent = TextVariant;
      break;
    case 'application/xml':
    case 'xml':
      CodeComponent = XmlVariant;
      break;
    case 'application/json':
    case 'json':
      CodeComponent = JavascriptVariant;
      break;
    default:
      break;
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      {open && (
        <>
          <DialogTitle>{title || ''}</DialogTitle>
          <DialogContent>
            <CodeComponent code={code} />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default withUI(CodeModal);
