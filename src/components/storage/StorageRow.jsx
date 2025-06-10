import TableCell from '@material-ui/core/TableCell';

import TableRowLink from '../ui/TableRowLink';

export default function StorageRow({ storageDocument }) {
  const { id: storageId } = storageDocument;
  return (
    <TableRowLink hover to={`/storage/${storageId}/`}>
      <TableCell>{storageId}</TableCell>
    </TableRowLink>
  );
}
