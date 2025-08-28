import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import AccessControlMergedQueryRow from './AccessControlMergedQueryRow';

export default function AccessControlMergedQueryTable({ queryList = [] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Username</TableCell>
          <TableCell>Permission</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Extra Data</TableCell>
          <TableCell>Item</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {queryList.map((query) => (
          <AccessControlMergedQueryRow key={query.username} query={query} />
        ))}
      </TableBody>
    </Table>
  );
}
