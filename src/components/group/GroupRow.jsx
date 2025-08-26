import IconButton from '@material-ui/core/IconButton';
import Check from '@material-ui/icons/Check';
import DeleteForever from '@material-ui/icons/DeleteForever';

import routes from '../../const/routes';
import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';
import UnstyledLink from '../ui/UnstyledLink';

export default function GroupRow({ groupDocument = {}, onRemove }) {
  const to = routes.group({ groupName: groupDocument.groupName });
  return (
    <TableRow to={to} hover>
      <TableCell>
        <UnstyledLink to={to}>{groupDocument.groupName}</UnstyledLink>
      </TableCell>
      <TableCell>{groupDocument.role && <Check />}</TableCell>
      <TableCell disableOnClick>
        {onRemove && (
          <IconButton onClick={() => onRemove({ groupName: groupDocument.groupName })}>
            <DeleteForever />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}
