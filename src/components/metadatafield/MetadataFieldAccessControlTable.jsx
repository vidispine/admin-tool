import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import MetadataFieldAccessControlRow from './MetadataFieldAccessControlRow';

function MetadataFieldAccessControlTable({ metadataFieldAccessControlList = [], onOpenRemove }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Field</TableCell>
          <TableCell>Field Group</TableCell>
          <TableCell>User</TableCell>
          <TableCell>Group</TableCell>
          <TableCell>Permission</TableCell>
          {onOpenRemove ? <TableCell /> : null}
        </TableRow>
      </TableHead>
      <TableBody>
        {metadataFieldAccessControlList.map((metadataFieldAccessControl) => (
          <MetadataFieldAccessControlRow
            key={metadataFieldAccessControl.id}
            metadataFieldAccessControl={metadataFieldAccessControl}
            onOpenRemove={onOpenRemove}
          />
        ))}
      </TableBody>
    </Table>
  );
}

export default MetadataFieldAccessControlTable;
