import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import FieldGroupPermissionRow from './FieldGroupPermissionRow';

export default function FieldGroupPermissionTable({ metadataFieldGroupPermissionList = [] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Permission</TableCell>
          <TableCell>Field Group</TableCell>
          <TableCell>Field</TableCell>
          <TableCell>Username</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {metadataFieldGroupPermissionList.map((metadataFieldGroupPermission) => (
          <FieldGroupPermissionRow
            key={metadataFieldGroupPermission.username}
            metadataFieldGroupPermission={metadataFieldGroupPermission}
          />
        ))}
      </TableBody>
    </Table>
  );
}
