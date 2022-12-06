import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field } from 'redux-form';

import CodeField from '../ui/CodeField';

const styles = {};

function EchoForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="xmlDocument"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/xml',
          lineWrapping: true,
          lineNumbers: true,
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          autofocus: true,
          extraKeys: { 'Cmd-Enter': () => handleSubmit(), 'Ctrl-Enter': () => handleSubmit() },

        }}
      />
    </form>
  );
}

export default reduxForm()(withStyles(styles)(EchoForm));
