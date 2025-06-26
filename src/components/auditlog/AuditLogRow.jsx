import moment from 'moment';

import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';
import UnstyledLink from '../ui/UnstyledLink';

export default function AuditLogRow({ entry = {} }) {
  return (
    <TableRow hover>
      <TableCell>{entry.timestamp ? moment(entry.timestamp).toString() : ''}</TableCell>
      <TableCell>
        <UnstyledLink to={`/username/${entry.username}/`}>{entry.username}</UnstyledLink>
      </TableCell>
      <TableCell>{entry.method}</TableCell>
      <TableCell>{entry.path}</TableCell>
      <TableCell>{entry.queryParameters}</TableCell>
    </TableRow>
  );
}
