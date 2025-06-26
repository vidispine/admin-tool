import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';

import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';
import UnstyledLink from '../ui/UnstyledLink';

function MetadataDatasetRow({ datasetId, onOpen }) {
  return (
    <TableRow to={`/metadata-dataset/${datasetId}/`} hover>
      <TableCell>
        <UnstyledLink to={`/metadata-dataset/${datasetId}/`}>{datasetId}</UnstyledLink>
      </TableCell>
      <TableCell disableOnClick>
        <IconButton onClick={() => onOpen({ datasetId })}>
          <DeleteForever />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default MetadataDatasetRow;
