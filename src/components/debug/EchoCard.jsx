import Splitter, { SplitDirection, GutterTheme } from '@devbookhq/splitter';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import red from '@material-ui/core/colors/red';
import { useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PlayIcon from '@material-ui/icons/PlayArrow';
import { compose } from 'redux';

import * as formActions from '../../formactions/debug';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';
import formatJSON from '../../utils/formatJSON';
import CodeMirror from '../ui/CodeMirror';
import SquareCard from '../ui/SquareCard';

import EchoForm from './EchoForm';

const ECHO_FORM = 'ECHO_FORM';

const xmlDocument = `<ItemSearchDocument xmlns="http://xml.vidispine.com/schema/vidispine">
  <field>
    <name>title</name>
    <value>example.mp4</value>
  </field>
</ItemSearchDocument>`;

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
  EchoForm: {
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
      backgroundColor: ({ error }) => (error !== undefined ? red.A700 : 'unset'),
      text: ({ error }) => (error !== undefined ? theme.palette.common.white : 'unset'),
    },
  },
});

function EchoCard({ classes, submitForm, openSnackBar, onSuccess, onFail, result, error }) {
  const theme = useTheme();
  const gutterTheme = theme?.palette?.type === 'light' ? GutterTheme.Light : GutterTheme.Dark;
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Convert Success';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (errors, dispatch, submitError, props) => {
    const messageContent = 'Error Converting XML';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(errors, dispatch, submitError, props);
    }
  };
  return (
    <>
      <CardHeader
        title="XML Echo"
        action={
          <Button
            variant="outlined"
            color="primary"
            onClick={() => submitForm(ECHO_FORM)}
            startIcon={<PlayIcon />}
          >
            Convert (ctrl-enter)
          </Button>
        }
      />
      <div className={classes.SplitterContainer}>
        <Splitter direction={SplitDirection.Horizontal} gutterTheme={gutterTheme}>
          <SquareCard className={classes.SquareCard}>
            <CardContent className={classes.CardContent}>
              <Typography
                color="textSecondary"
                variant="subtitle2"
                className={classes.ResultTypography}
              >
                Input XML
              </Typography>

              <EchoForm
                form={ECHO_FORM}
                onSubmit={formActions.onEcho}
                onSubmitSuccess={onSubmitSuccess}
                onSubmitFail={onSubmitFail}
                className={classes.EchoForm}
                initialValues={{ xmlDocument }}
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
                  {error === undefined ? 'Converted JSON' : 'Error'}
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

export default compose(withSnackbar, withFormActions)(withStyles(styles)(EchoCard));
