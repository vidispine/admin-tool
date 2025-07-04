import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import startCase from 'lodash.startcase';

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

const terseToValue = (collectionType, fieldName) => {
  const terseField = collectionType?.terse?.[fieldName];
  if (Array.isArray(terseField)) {
    const terseFieldValueList = terseField
      .map(({ value }) => value)
      .filter((value) => value !== undefined);
    return terseFieldValueList.join(', ');
  }
  return terseField?.value;
};

export function CollectionTypeRow({ collectionType, terse, fieldList, withName = true, children }) {
  return (
    <TableRowLink to={`/collection/${collectionType.id}/`} hover>
      {children}
      <TableCell>{collectionType.id}</TableCell>
      {withName && <TableCell>{collectionType.name}</TableCell>}
      {terse &&
        collectionType.terse &&
        fieldList.map((fieldName) => (
          <TableCell key={fieldName}>{terseToValue(collectionType, fieldName)}</TableCell>
        ))}
    </TableRowLink>
  );
}

function CollectionListTable({
  collectionListDocument,
  queryParams = {},
  onChangePage,
  onChangeRowsPerPage,
  rowsPerPageOptions,
  page,
  rowsPerPage,
  onChangeOrder,
  orderBy,
  orderDirection,
}) {
  if (collectionListDocument === undefined) {
    return null;
  }
  const { collection: collectionContentList = [], hits: count = 0 } = collectionListDocument;
  const { terse, field = [] } = queryParams;
  let fieldList = field;
  if (!Array.isArray(field)) {
    fieldList = field.split(',');
  }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell
            name="collectionId"
            onChangeOrder={onChangeOrder}
            orderBy={orderBy}
            orderDirection={orderDirection}
          />
          <TableHeadCell
            name="name"
            onChangeOrder={onChangeOrder}
            orderBy={orderBy}
            orderDirection={orderDirection}
          />
          {terse &&
            fieldList.map((fieldName) => (
              <TableHeadCell
                key={fieldName}
                name={fieldName}
                onChangeOrder={onChangeOrder}
                orderBy={orderBy}
                orderDirection={orderDirection}
              />
            ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {collectionContentList.map((collectionType) => (
          <CollectionTypeRow
            key={collectionType.id}
            collectionType={collectionType}
            fieldList={fieldList}
            terse={terse}
          />
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

export default CollectionListTable;
