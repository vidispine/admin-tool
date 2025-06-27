import Splitter, { SplitDirection, GutterTheme } from '@devbookhq/splitter';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useTheme, withStyles } from '@material-ui/core/styles';

import TextGrid from '../ui/TextGrid';

import ShapeTagScriptEditor from './ShapeTagScriptEditor';

const styles = () => ({
  SplitterContainer: {
    height: '100%',
  },
});

function ShapeTagScriptTestCard({
  classes,
  tagName,
  shapeTagScript,
  transcodePresetDocument,
  onSuccess,
}) {
  const theme = useTheme();
  const gutterTheme = theme?.palette?.type === 'light' ? GutterTheme.Light : GutterTheme.Dark;
  return (
    <div className={classes.SplitterContainer}>
      <Splitter direction={SplitDirection.Horizontal} gutterTheme={gutterTheme}>
        <Card>
          <CardContent>
            <ShapeTagScriptEditor
              tagName={tagName}
              shapeTagScript={shapeTagScript}
              onSuccess={onSuccess}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <TextGrid value={transcodePresetDocument} variant="json" />
          </CardContent>
        </Card>
      </Splitter>
    </div>
  );
}

export default withStyles(styles)(ShapeTagScriptTestCard);
