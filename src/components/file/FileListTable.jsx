import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import TableActions from '../ui/TableActions';
import TableHeadCell from '../ui/TableHeadCell';

import FileRow from './FileRow';

function FileListTable({
  fileListDocument,
  onChangePage,
  onChangeRowsPerPage,
  rowsPerPageOptions,
  page,
  rowsPerPage,
  onChangeOrder,
  orderBy,
  orderDirection,
  storageId,
}) {
  if (fileListDocument === undefined) {
    return null;
  }
  const { file: fileList = [], hits: count = 0 } = fileListDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell
            name="filename"
            onChangeOrder={onChangeOrder}
            orderBy={orderBy}
            orderDirection={orderDirection}
          />
          <TableHeadCell
            name="fileId"
            onChangeOrder={onChangeOrder}
            orderBy={orderBy}
            orderDirection={orderDirection}
          />
          <TableHeadCell
            name="state"
            onChangeOrder={onChangeOrder}
            orderBy={orderBy}
            orderDirection={orderDirection}
          />
          {storageId === undefined ? <TableHeadCell name="Storage" /> : null}
          <TableHeadCell
            name="size"
            onChangeOrder={onChangeOrder}
            orderBy={orderBy}
            orderDirection={orderDirection}
          />
          <TableHeadCell
            name="timestamp"
            onChangeOrder={onChangeOrder}
            orderBy={orderBy}
            orderDirection={orderDirection}
          />
        </TableRow>
      </TableHead>
      <TableBody>
        {fileList.map((fileDocument) => (
          <FileRow key={fileDocument.id} fileDocument={fileDocument} storageId={storageId} />
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

export default FileListTable;
