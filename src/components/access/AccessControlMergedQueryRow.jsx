import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function AccessControlMergedQueryRow({ query }) {
  return (
    <TableRow hover>
      <TableCell>{query?.username}</TableCell>
      <TableCell>{query?.permission}</TableCell>
      <TableCell>{query?.type}</TableCell>
      <TableCell>{query?.extradata}</TableCell>
      <TableCell>{query?.item}</TableCell>
      <TableCell />
    </TableRow>
  );
}
