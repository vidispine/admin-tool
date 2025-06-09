import { useEffect, useMemo } from 'react';
import { graphviz } from 'd3-graphviz';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const styles = (theme) => ({
  root: {
    '& .edge:hover': {
      '& path': {
        stroke: theme.palette.error.main,
      },
      '& text': {
        fill: theme.palette.error.main,
      },
      '& polygon': {
        stroke: theme.palette.error.main,
      },
    },
    '& polygon': {
      fill: theme.palette.background.paper,
      stroke: theme.palette.text.primary,
    },
    '& path': {
      stroke: theme.palette.text.primary,
    },
    '& text': {
      fill: theme.palette.text.primary,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.body2.fontSize,
    },
  },
});

let counter = 0;
// eslint-disable-next-line no-plusplus
const getId = () => `graphviz${counter++}`;

function Graphviz({
  classes, className, dot, ...props
}) {
  const id = useMemo(getId, []);
  useEffect(() => {
    graphviz(`#${id}`, {
      fit: true,
      zoom: true,
      useWorker: false,
      ...props,
    }).renderDot(dot);
  }, [dot, props]);

  return <div className={clsx([className, classes.root])} id={id} />;
}

export default withStyles(styles)(Graphviz);
