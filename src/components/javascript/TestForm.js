import React from 'react';
import { reduxForm, Field } from 'redux-form';

import CodeField from '../ui/CodeField';

function TestForm({
  handleSubmit,
  className,
  style,
}) {
  return (
    <form onSubmit={handleSubmit} className={className} style={style}>
      <Field
        name="javascriptDocument"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'javascript',
          lineWrapping: true,
          lineNumbers: true,
          lint: true,
          highlightLines: true,
          gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          matchBrackets: true,
          autoCloseBrackets: true,
          foldGutter: true,
          autofocus: true,
          extraKeys: { 'Cmd-Enter': () => handleSubmit(), 'Ctrl-Enter': () => handleSubmit() },
        }}
      />
    </form>
  );
}

export default reduxForm()(TestForm);
