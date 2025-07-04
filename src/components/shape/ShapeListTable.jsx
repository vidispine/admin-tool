import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import startCase from 'lodash.startcase';

import ChipArray from '../ui/ChipArray';
import TableActions from '../ui/TableActions';
import TableRowLink from '../ui/TableRowLink';

function TableHeadCell({ orderBy, orderDirection, onChangeOrder, name }) {
  return onChangeOrder ? (
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
  );
}

export function ShapeTypeRow({ shapeType }) {
  const { id: shapeId, item: itemList = [], mimeType = [], essenceVersion, tag = [] } = shapeType;
  const itemIds = itemList.map((thisItem) => thisItem.id);
  const [itemId] = itemIds;
  const linkTo = itemId ? `/item/${itemId}/shape/${shapeId}/` : undefined;
  return (
    <TableRowLink to={linkTo} hover>
      <TableCell>{shapeId}</TableCell>
      <TableCell>
        <ChipArray labels={itemIds} />
      </TableCell>
      <TableCell>{essenceVersion}</TableCell>
      <TableCell>
        <ChipArray labels={mimeType} />
      </TableCell>
      <TableCell>
        <ChipArray labels={tag} />
      </TableCell>
    </TableRowLink>
  );
}

function ShapeListTable({
  shapeListDocument,
  onChangePage,
  onChangeRowsPerPage,
  rowsPerPageOptions,
  page,
  rowsPerPage,
  onChangeOrder,
  orderBy,
  orderDirection,
}) {
  if (shapeListDocument === undefined) {
    return null;
  }
  const { shape: shapeList = [], hits: count = 0 } = shapeListDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell name="shapeId" />
          <TableHeadCell
            name="itemId"
            onChangeOrder={onChangeOrder}
            orderBy={orderBy}
            orderDirection={orderDirection}
          />
          <TableHeadCell name="essenceVersion" />
          <TableHeadCell
            name="mimeType"
            onChangeOrder={onChangeOrder}
            orderBy={orderBy}
            orderDirection={orderDirection}
          />
          <TableHeadCell
            name="shapeTag"
            onChangeOrder={onChangeOrder}
            orderBy={orderBy}
            orderDirection={orderDirection}
          />
        </TableRow>
      </TableHead>
      <TableBody>
        {shapeList.map((shapeType) => (
          <ShapeTypeRow key={shapeType.id} shapeType={shapeType} />
        ))}
      </TableBody>
      {onChangePage && onChangeRowsPerPage && (
        <TableFooter>
          <TableRow>
            <TablePagination
              count={count}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
              ActionsComponent={TableActions}
              rowsPerPageOptions={rowsPerPageOptions}
            />
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}

export default ShapeListTable;
