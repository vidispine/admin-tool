import TableCell from '@material-ui/core/TableCell';

import TableRowLink from '../ui/TableRowLink';

export default function DocumentMetadataListRow({ documentMetadata }) {
  return (
    <TableRowLink hover to={`/document/${documentMetadata.name}/`}>
      <TableCell>{documentMetadata.name}</TableCell>
      <TableCell />
    </TableRowLink>
  );
}
