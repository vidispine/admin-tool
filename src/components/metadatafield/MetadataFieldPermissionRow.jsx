import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function MetadataFieldPermissionRow({ metadataFieldPermission }) {
  return (
    <TableRow hover>
      <TableCell>{metadataFieldPermission?.name}</TableCell>
      <TableCell>{metadataFieldPermission?.permission}</TableCell>
      <TableCell>{metadataFieldPermission?.username}</TableCell>
      <TableCell />
    </TableRow>
  );
}
