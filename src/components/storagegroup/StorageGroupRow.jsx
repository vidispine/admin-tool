import TableCell from '@material-ui/core/TableCell';

import TableRowLink from '../ui/TableRowLink';

export default function StorageGroupRow({ storageGroup }) {
  const { name: groupName } = storageGroup;
  return (
    <TableRowLink hover to={`/storage-group/${groupName}/`}>
      <TableCell>{groupName}</TableCell>
    </TableRowLink>
  );
}
