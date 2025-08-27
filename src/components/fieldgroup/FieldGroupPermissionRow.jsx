import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function FieldGroupPermissionRow({ metadataFieldGroupPermission }) {
  return (
    <TableRow hover>
      <TableCell>{metadataFieldGroupPermission?.name}</TableCell>
      <TableCell>{metadataFieldGroupPermission?.permission}</TableCell>
      <TableCell>{metadataFieldGroupPermission?.fieldGroup}</TableCell>
      <TableCell>{metadataFieldGroupPermission?.field}</TableCell>
      <TableCell>{metadataFieldGroupPermission?.username}</TableCell>
      <TableCell />
    </TableRow>
  );
}
