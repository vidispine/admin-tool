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

function FieldGroupRow({ fieldGroupType }) {
  const { name, uuid } = fieldGroupType;
  return (
    <TableRowLink to={`/metadata/${uuid}/`} hover>
      <TableCell>{uuid}</TableCell>
      <TableCell>{name}</TableCell>
    </TableRowLink>
  );
}

function FieldGroupSearchListTable({
  metadataFieldResultDocument,
  onChangePage,
  onChangeRowsPerPage,
  rowsPerPageOptions,
  page,
  rowsPerPage,
}) {
  if (metadataFieldResultDocument === undefined) {
    return null;
  }
  const { group: groupList = [], hits: count = 0 } = metadataFieldResultDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell name="uuid" />
          <TableHeadCell name="name" />
        </TableRow>
      </TableHead>
      <TableBody>
        {groupList.map((fieldGroupType) => (
          <FieldGroupRow key={fieldGroupType.uuid} fieldGroupType={fieldGroupType} />
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

export default FieldGroupSearchListTable;
