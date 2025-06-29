import { useMemo } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import TableActions from './TableActions';
import UriListRow from './UriListRow';

export default function UriListTable({
  uriListDocument = {},
  sort = false,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  header = true,
  ...props
}) {
  const { hits: count = 0 } = uriListDocument;
  const uriList = useMemo(() => {
    if (!Array.isArray(uriListDocument?.uri)) return [];
    if (sort === true) return uriListDocument.uri.sort();
    if (typeof sort === 'function') return uriListDocument.uri.sort(sort);
    return uriListDocument.uri;
  }, [sort, uriListDocument]);
  const rowsPerPageOptions = [10, 100, 250];
  if (!rowsPerPageOptions.includes(rowsPerPage)) {
    rowsPerPageOptions.push(rowsPerPage);
  }
  return (
    <Table>
      {header === true && (
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
      )}
      <TableBody>
        {uriList.map((uri) => (
          <UriListRow key={uri} uri={uri} {...props} />
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
