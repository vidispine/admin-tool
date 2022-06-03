import React from 'react';
import Check from '@material-ui/icons/Check';
import DeleteForever from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRowLink';

export default function UserRow({
  userDocument = {},
  onRemove,
}) {
  return (
    <TableRow to={`/user/${userDocument.userName}/`} hover>
      <TableCell>
        {userDocument.userName}
      </TableCell>
      <TableCell>{userDocument.realName}</TableCell>
      <TableCell>{userDocument.disabled && <Check />}</TableCell>
      <TableCell disableOnClick>
        {onRemove
        && (
        <IconButton onClick={() => onRemove({ userName: userDocument.userName })}>
          <DeleteForever />
        </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}
