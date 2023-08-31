import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const styles = (theme) => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
});

function TableActions({
  classes,
  count,
  page,
  rowsPerPage,
  onChangePage,
  onPageChange,
}) {
  const onClick = onPageChange || onChangePage;
  return (
    <div className={classes.root}>
      <IconButton
        onClick={() => onClick({ page: 0 })}
        disabled={page === 0}
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={() => onClick({ page: page - 1 })}
        disabled={page === 0}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={() => onClick({ page: page + 1 })}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={() => onClick({ page: Math.max(0, Math.ceil(count / rowsPerPage) - 1) })}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

export default withStyles(styles)(TableActions);
