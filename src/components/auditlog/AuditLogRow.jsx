import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import moment from 'moment';

import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';
import UnstyledLink from '../ui/UnstyledLink';

const styles = () => ({
  wordBreak: { wordBreak: 'break-all' },
  noBreak: { whiteSpace: 'nowrap' },
});

function AuditLogRow({ classes, entry = {}, onOpenBody }) {
  return (
    <TableRow hover>
      <TableCell>{entry.timestamp ? moment(entry.timestamp).toString() : ''}</TableCell>
      <TableCell>
        <UnstyledLink to={`/username/${entry.username}/`}>{entry.username}</UnstyledLink>
      </TableCell>
      <TableCell>{entry.method}</TableCell>
      <TableCell className={classes.wordBreak}>{entry.path}</TableCell>
      <TableCell className={classes.wordBreak}>{entry.queryParameters}</TableCell>
      <TableCell>{entry.responseCode}</TableCell>
      <TableCell>
        {entry.body ? (
          <Button
            onClick={() =>
              onOpenBody({
                code: entry.body,
                variant: entry.contentType ? entry.contentType.split(';')[0] : 'text',
              })
            }
            variant="outlined"
          >
            Body
          </Button>
        ) : null}
      </TableCell>
    </TableRow>
  );
}

export default withStyles(styles)(AuditLogRow);
