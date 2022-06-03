import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import startCase from 'lodash.startcase';

import TableRowLink from '../ui/TableRowLink';

export default function ResourceTypeListRow({
  resourceType,
}) {
  return (
    <TableRowLink hover to={`/resource/${resourceType}/`}>
      <TableCell>{startCase(resourceType)}</TableCell>
    </TableRowLink>
  );
}
