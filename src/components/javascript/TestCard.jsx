import Splitter, { SplitDirection, GutterTheme } from '@devbookhq/splitter';
import CardContent from '@material-ui/core/CardContent';
import red from '@material-ui/core/colors/red';
import { useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

import * as formActions from '../../formactions/javascript';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';
import formatJSON from '../../utils/formatJSON';
import CodeMirror from '../ui/CodeMirror';
import SquareCard from '../ui/SquareCard';

import TestForm from './TestForm';

const javascriptDocument = `/* global api */
const requestBody = {
  sort: []
};

api.path('item/')
  .queryParam('number', '10')
  .input(requestBody)
  .put();
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
    display: 'flex',
    flexDirection: 'column',
  },
  ResultTypography: {
    minHeight: 32,
  },
  CodeMirror: {
    flexGrow: 1,
    overflow: 'auto',
    '& .CodeMirror-gutters': {
      backgroundColor: ({ error }) => (error !== undefined ? red.A700 : 'unset'),
      text: ({ error }) => (error !== undefined ? theme.palette.common.white : 'unset'),
    },
  },
});

const TEST_FORM = 'TEST_FORM';

function TestCard({
  classes,
  openSnackBar,
  onSuccess,
  onFail,
  result,
  error,
  initialValues = { javascriptDocument },
  form = TEST_FORM,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Script Success';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (errors, dispatch, submitError, props) => {
    const messageContent = 'Error Running Script';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(errors, dispatch, submitError, props);
    }
  };
  const theme = useTheme();
  const gutterTheme = theme?.palette?.type === 'light' ? GutterTheme.Light : GutterTheme.Dark;
  return (
    <div className={classes.SplitterContainer}>
      <Splitter direction={SplitDirection.Horizontal} gutterTheme={gutterTheme}>
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
              form={form}
              className={classes.TestForm}
              initialValues={initialValues}
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
  );
}

export default compose(withSnackbar, withFormActions)(withStyles(styles)(TestCard));
