import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { compose } from 'redux';

const styles = () => ({
  Button: {
    visibility: 'hidden',
  },
  TableRow: {
    '&:hover $Button': {
      visibility: 'visible',
    },
  },
});

function MetadataFieldAccessControlRow({ classes, metadataFieldAccessControl, onOpenRemove }) {
  return (
    <TableRow hover className={classes.TableRow}>
      <TableCell>{metadataFieldAccessControl?.id}</TableCell>
      <TableCell>{metadataFieldAccessControl?.field}</TableCell>
      <TableCell>{metadataFieldAccessControl?.fieldGroup}</TableCell>
      <TableCell>{metadataFieldAccessControl?.user}</TableCell>
      <TableCell>{metadataFieldAccessControl?.group}</TableCell>
      <TableCell>{metadataFieldAccessControl?.permission}</TableCell>
      {onOpenRemove ? (
        <TableCell>
          <Button
            className={classes.Button}
            variant="text"
            onClick={() => onOpenRemove({ accessId: metadataFieldAccessControl?.id })}
            color="secondary"
          >
            Remove
          </Button>
        </TableCell>
      ) : null}
    </TableRow>
  );
}

export default compose(withStyles(styles))(MetadataFieldAccessControlRow);
