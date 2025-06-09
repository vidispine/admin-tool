import startCase from 'lodash.startcase';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

function TableHeadCell({
  orderBy, orderDirection, onChangeOrder, name,
}) {
  return (
    onChangeOrder ? (
      <TableCell>
        <TableSortLabel
          active={orderBy === name}
          direction={orderDirection || undefined}
          onClick={onChangeOrder(name)}
        >
          {startCase(name)}
        </TableSortLabel>
      </TableCell>
    ) : (
      <TableCell>{startCase(name)}</TableCell>
    )
  );
}

export default TableHeadCell;
