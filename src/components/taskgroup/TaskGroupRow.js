import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRowLink from '../ui/TableRowLink';

export default function TaskGroupRow({
  group,
}) {
  return (
    <TableRowLink hover to={`/task-group/${group.name}/`}>
      <TableCell>
        {group.name}
      </TableCell>
      <TableCell />
    </TableRowLink>
  );
}
