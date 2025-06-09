import Check from '@material-ui/icons/Check';
import DeleteForever from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRowLink';

function MetadataFieldRow({
  metadataFieldDocument = {},
  onOpen,
}) {
  return (
    <>
      <TableRow to={`/metadata-field/${metadataFieldDocument.name}/`} hover>
        <TableCell>{metadataFieldDocument.name}</TableCell>
        <TableCell>{metadataFieldDocument.type}</TableCell>
        <TableCell>{metadataFieldDocument.system && <Check />}</TableCell>
        <TableCell>{metadataFieldDocument.inheritance === 'true' && <Check />}</TableCell>
        <TableCell disableOnClick>
          <IconButton onClick={() => onOpen({ fieldName: metadataFieldDocument.name })}>
            <DeleteForever />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

export default MetadataFieldRow;
