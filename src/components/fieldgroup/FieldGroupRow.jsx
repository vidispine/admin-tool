import IconButton from '@material-ui/core/IconButton';
import Check from '@material-ui/icons/Check';
import DeleteForever from '@material-ui/icons/DeleteForever';

import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';
import UnstyledLink from '../ui/UnstyledLink';

export default function FieldGroupRow({ metadataFieldGroupDocument = {}, onOpen }) {
  return (
    <TableRow to={`/field-group/${metadataFieldGroupDocument.name}/`} hover>
      <TableCell>
        <UnstyledLink to={`/field-group/${metadataFieldGroupDocument.name}/`}>
          {metadataFieldGroupDocument.name}
        </UnstyledLink>
      </TableCell>
      <TableCell>{metadataFieldGroupDocument.inheritance === 'true' && <Check />}</TableCell>
      <TableCell disableOnClick>
        <IconButton
          onClick={() =>
            onOpen({
              childGroupName: metadataFieldGroupDocument.name,
              groupName: metadataFieldGroupDocument.name,
            })
          }
        >
          <DeleteForever />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
