import { withStyles } from '@material-ui/core/styles';
import GraphViz from '../ui/GraphViz';
import ImgExpandButton from '../ui/ImgExpandButton';

const styles = () => ({
  ImgContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
});

function AccessGraphDisplay({
  classes, useGraphViz, graphDot, graphImage,
}) {
  return (
    <>
      {useGraphViz && graphDot ? (
        <GraphViz dot={graphDot} width="100%" height="80vh" />
      ) : null}
      {useGraphViz === false && graphImage ? (
        <div className={classes.ImgContainer}>
          <ImgExpandButton src={URL.createObjectURL(graphImage)} initialAuto={false} />
        </div>
      ) : null}
    </>
  );
}

export default withStyles(styles)(AccessGraphDisplay);
