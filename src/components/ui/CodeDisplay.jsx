import ReactJson from 'react-json-view';

import withErrorBoundary from '../../hoc/withErrorBoundary';
import formatXML from '../../utils/formatXML';

import CodeMirror from './CodeMirror';

function JavascriptVariant({ code, ...props }) {
  return (
    <ReactJson
      src={code}
      theme="solarized"
      displayDataTypes={false}
      collapsed={false}
      displayObjectSize={false}
      name={false}
      enableClipboard={(copy) =>
        navigator.clipboard.writeText(JSON.stringify(copy.src, null, '\t'))
      }
      {...props}
    />
  );
}

function XmlVariant({ code, options = {}, ...props }) {
  return (
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
}

function TextVariant({ code, options = {}, ...props }) {
  return (
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
}

function CodeDisplay({ code, variant = 'json' }) {
  let CodeComponent = null;
  switch (variant) {
    case 'text/plain':
    case 'text/vtt':
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
  return <CodeComponent code={code} />;
}

export default withErrorBoundary(CodeDisplay);
