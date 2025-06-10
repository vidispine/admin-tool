import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRowLink';

export default function ExportLocationRow({ exportLocationDocument = {} }) {
  return (
    <TableRow to={`/export-location/${exportLocationDocument.name}/`} hover>
      <TableCell>{exportLocationDocument.name}</TableCell>
    </TableRow>
  );
}
