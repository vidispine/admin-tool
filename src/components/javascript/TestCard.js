import React from 'react';
import { compose } from 'redux';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Splitter, { SplitDirection, GutterTheme } from '@devbookhq/splitter';
import { useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PlayIcon from '@material-ui/icons/PlayArrow';
import red from '@material-ui/core/colors/red';

import withSnackbar from '../../hoc/withSnackbar';
import withFormActions from '../../hoc/withFormActions';
import * as formActions from '../../formactions/javascript';
import SquareCard from '../ui/SquareCard';

import TestForm from './TestForm';
import formatJSON from '../../utils/formatJSON';
import CodeMirror from '../ui/CodeMirror';

const javascriptDocument = `// https://apidoc.vidispine.com/latest/system/integration/javascript.html

api.path('item')
   .get();
`;

const styles = (theme) => ({
  SplitterContainer: {
    height: '80vh',
  },
  SquareCard: {
    height: '100%',
  },
  CardContent: {
    height: '100%',
  },
  TestForm: {
    height: '100%',
    overflow: 'auto',
  },
  ResultContainer: {
    height: '100%',
    overflow: 'auto',
  },
  ResultTypography: {
    minHeight: 32,
  },
  CodeMirror: {
    '& .CodeMirror-gutters': {
      backgroundColor:
        ({ error }) => (error !== undefined ? red.A700 : 'unset'),
      text:
        ({ error }) => (error !== undefined ? theme.palette.common.white : 'unset'),
    },
  },
});

export const TEST_FORM = 'TEST_FORM';

function TestCard({
  classes,
  submitForm,
  openSnackBar,
  onSuccess,
  onFail,
  result,
  error,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Script Success';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (errors, dispatch, submitError, props) => {
    const messageContent = 'Error Running Script';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(errors, dispatch, submitError, props); }
  };
  const theme = useTheme();
  const gutterTheme = theme?.palette?.type === 'light' ? GutterTheme.Light : GutterTheme.Dark;
  return (
    <>
      <CardHeader
        title="Javascript Test"
        action={(
          <Button
            variant="outlined"
            color="primary"
            onClick={() => submitForm(TEST_FORM)}
            startIcon={<PlayIcon />}
          >
            RUN
          </Button>
        )}
      />
      <div className={classes.SplitterContainer}>
        <Splitter
          direction={SplitDirection.Horizontal}
          gutterTheme={gutterTheme}
        >
          <SquareCard className={classes.SquareCard}>
            <CardContent className={classes.CardContent}>
              <Typography
                color="textSecondary"
                variant="subtitle2"
                className={classes.ResultTypography}
              >
                Input
              </Typography>
              <TestForm
                onSubmit={formActions.onTest}
                onSubmitSuccess={onSubmitSuccess}
                onSubmitFail={onSubmitFail}
                form={TEST_FORM}
                className={classes.TestForm}
                initialValues={{ javascriptDocument }}
              />
            </CardContent>
          </SquareCard>
          <SquareCard className={classes.SquareCard}>
            <CardContent className={classes.CardContent}>
              <div className={classes.ResultContainer}>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  className={classes.ResultTypography}
                >
                  {error === undefined ? 'Result' : 'Error'}
                </Typography>
                {result !== undefined || error !== undefined ? (
                  <CodeMirror
                    value={formatJSON(result) || formatJSON(error) || ''}
                    className={classes.CodeMirror}
                    options={{
                      readOnly: true,
                      theme: 'material',
                      mode: 'application/json',
                      lineWrapping: true,
                      lineNumbers: true,
                      foldGutter: true,
                      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                    }}
                  />
                ) : null}
              </div>
            </CardContent>
          </SquareCard>
        </Splitter>
      </div>
    </>
  );
}

export default compose(withSnackbar, withFormActions)(withStyles(styles)(TestCard));
