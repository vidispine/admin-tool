import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import StorageMethodRow from './StorageMethodRow';

export default function StorageMethodListTable({ storageDocument, hidePermissions }) {
  const { method: storageMethodList, id: storageId } = storageDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>URI</TableCell>
          {hidePermissions !== true ? <TableCell padding="checkbox">Permissions</TableCell> : null}
          <TableCell padding="checkbox">Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {storageMethodList &&
          storageMethodList.map((storageMethod) => (
            <StorageMethodRow
              key={storageMethod.id}
              storageMethod={storageMethod}
              storageId={storageId}
              hidePermissions={hidePermissions}
            />
          ))}
      </TableBody>
    </Table>
  );
}
