import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import SquareCard from './SquareCard';
import SimpleMetadataEditor from './SimpleMetadataEditor';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    '&:last-child': {
      paddingBottom: theme.spacing(3),
    },
  },
});

function SimpleMetadataCard({ classes, ...props }) {
  return (
    <SquareCard classes={classes}>
      <SimpleMetadataEditor
        {...props}
      />
    </SquareCard>
  );
}

export default withStyles(styles)(SimpleMetadataCard);
