import TableCell from '@material-ui/core/TableCell';

import TableRowLink from '../ui/TableRowLink';

export default function ProjectionListRow({ projection }) {
  return (
    <TableRowLink hover to={`/projection/${projection}/`}>
      <TableCell>{projection}</TableCell>
      <TableCell />
    </TableRowLink>
  );
}
