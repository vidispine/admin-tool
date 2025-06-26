import Check from '@material-ui/icons/Check';
import moment from 'moment';

import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';

export default function DeletionLockRow({ deletionLockType = {} }) {
  const {
    id: lockId,
    user,
    expiryTime,
    modified,
    entityType,
    entityId,
    isEffective,
    isInherited,
    isExpired,
  } = deletionLockType;
  return (
    <TableRow hover to={`/deletion-lock/${lockId}/`}>
      <TableCell>{lockId}</TableCell>
      <TableCell>{user}</TableCell>
      <TableCell>{expiryTime ? moment(expiryTime).toString() : ''}</TableCell>
      <TableCell>{modified ? moment(modified).toString() : ''}</TableCell>
      <TableCell>{entityType}</TableCell>
      <TableCell>{entityId}</TableCell>
      <TableCell>{isEffective && <Check />}</TableCell>
      <TableCell>{isInherited && <Check />}</TableCell>
      <TableCell>{isExpired && <Check />}</TableCell>
    </TableRow>
  );
}
