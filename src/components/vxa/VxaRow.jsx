import { OnlineIcon, OfflineIcon } from '../ui/StatusIcon';
import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';
import UnstyledLink from '../ui/UnstyledLink';

export default function VxaRow({ vxaDocument = {} }) {
  return (
    <TableRow to={`/vxa/${vxaDocument.uuid}/`} hover>
      <TableCell>
        <UnstyledLink to={`/vxa/${vxaDocument.uuid}/`}>{vxaDocument.uuid}</UnstyledLink>
      </TableCell>
      <TableCell>{vxaDocument.name}</TableCell>
      <TableCell>{vxaDocument.vxaVersion}</TableCell>
      <TableCell>{vxaDocument.status === 'ONLINE' ? <OnlineIcon /> : <OfflineIcon />}</TableCell>
    </TableRow>
  );
}
