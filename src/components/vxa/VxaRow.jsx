import React from 'react';

import UnstyledLink from '../ui/UnstyledLink';
import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';
import { OnlineIcon, OfflineIcon } from '../ui/StatusIcon';

export default function VxaRow({
  vxaDocument = {},
}) {
  return (
    <TableRow to={`/vxa/${vxaDocument.uuid}/`} hover>
      <TableCell>
        <UnstyledLink to={`/vxa/${vxaDocument.uuid}/`}>
          {vxaDocument.uuid}
        </UnstyledLink>
      </TableCell>
      <TableCell>{vxaDocument.name}</TableCell>
      <TableCell>{vxaDocument.vxaVersion}</TableCell>
      <TableCell>
        {vxaDocument.status === 'ONLINE' ? <OnlineIcon /> : <OfflineIcon />}
      </TableCell>
    </TableRow>
  );
}
