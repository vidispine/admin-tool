import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm, Field } from 'redux-form';

import CodeField from '../ui/CodeField';

const styles = {
  scriptFieldRoot: {
  },
  scriptFieldInput: {
  },
};

function TestForm({
  classes,
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
          mode: 'application/javascript',
          lineWrapping: true,
          lineNumbers: true,
        }}
        className={{ root: classes.scriptFieldRoot, input: classes.scriptFieldInput }}
      />
    </form>
  );
}

export default reduxForm()(withStyles(styles)(TestForm));
