import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import MetadataFieldPermissionRow from './MetadataFieldPermissionRow';

export default function MetadataFieldPermissionTable({ metadataFieldPermissionList = [] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Permission</TableCell>
          <TableCell>Username</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {metadataFieldPermissionList.map((metadataFieldPermission) => (
          <MetadataFieldPermissionRow
            key={metadataFieldPermission.username}
            metadataFieldPermission={metadataFieldPermission}
          />
        ))}
      </TableBody>
    </Table>
  );
}
