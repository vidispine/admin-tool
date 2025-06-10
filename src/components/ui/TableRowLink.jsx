import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';

const styles = () => ({
  TableRow: {
    textDecoration: 'none',
    cursor: ({ onClick }) => (onClick ? 'pointer' : undefined),
  },
});

function TableRowLink({ classes, to, ...props }) {
  const component = to ? Link : undefined;
  return <TableRow className={classes.TableRow} component={component} to={to} {...props} />;
}

export default withStyles(styles)(TableRowLink);
