import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import ReactCodeMirror from 'react-codemirror';
import CodeMirrorInstance from 'codemirror';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';

import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldgutter.css';
import { JSHINT } from 'jshint';

import 'codemirror/theme/material.css';
import 'codemirror/lib/codemirror.css';

const styles = {
  root: {},
  label: {},
  input: {},
  helper: {},
  CodeMirror: {
    '& .CodeMirror': {
      height: '100%',
      width: '100%',
      maxWidth: '90vw',
    },
  },
};

function CodeField({
  classes,
  className,
  style,
  error,
  warning,
  options = {},
  label,
  cmRef,
  input = {},
  meta = {},
}) {
  // eslint-disable-next-line max-len
  if (options.mode === 'javascript' && options.lint !== false && options.lint !== undefined) window.JSHINT = JSHINT;
  return (
    <div className={clsx([className, classes.root])} style={style}>
      {label && (
      <InputLabel
        error={Boolean(error || warning)}
        className={classes.label}
      >
        {label}
      </InputLabel>
      )}
      <ReactCodeMirror
        codeMirrorInstance={CodeMirrorInstance}
        options={{ theme: 'material', ...options }}
        className={clsx([classes.input, classes.CodeMirror])}
        ref={cmRef}
        {...input}
      />
      {Boolean(meta.touched && meta.error) && (
        <FormHelperText error className={classes.helper}>
          {meta.error}
        </FormHelperText>
      )}
    </div>
  );
}

export default withStyles(styles)(CodeField);
