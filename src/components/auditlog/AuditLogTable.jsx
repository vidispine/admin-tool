import TableSortLabel from '@material-ui/core/TableSortLabel';

import withDialogProps from '../../hoc/withDialogProps';
import CodeModal from '../ui/CodeModal';
import Table from '../ui/Table';
import TableActions from '../ui/TableActions';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableFooter from '../ui/TableFooter';
import TableHead from '../ui/TableHead';
import TablePagination from '../ui/TablePagination';
import TableRow from '../ui/TableRow';

import AuditLogRow from './AuditLogRow';

const AUDIT_BODY_MODAL = 'AUDIT_BODY_MODAL';

function AuditLogTable({
  auditLogDocument,
  count = 0,
  page = 0,
  rowsPerPage = 100,
  onChangePage,
  onChangeRowsPerPage,
  onChangeOrder,
  orderDirection,
  dialogProps,
  onOpen,
}) {
  const { entry: entryList = [] } = auditLogDocument;
  const rowsPerPageOptions = [100, 250, 500];
  if (!rowsPerPageOptions.includes(rowsPerPage)) {
    rowsPerPageOptions.push(rowsPerPage);
  }
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderDirection !== undefined}
                direction={orderDirection}
                onClick={onChangeOrder}
              >
                Timestamp
              </TableSortLabel>
            </TableCell>
            <TableCell>username</TableCell>
            <TableCell>Method</TableCell>
            <TableCell>Path</TableCell>
            <TableCell>Query Parameters</TableCell>
            <TableCell>Response Code</TableCell>
            <TableCell>Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entryList.map((entry, index) => (
            <AuditLogRow
              key={index} // eslint-disable-line react/no-array-index-key
              entry={entry}
              onOpenBody={onOpen(AUDIT_BODY_MODAL)}
            />
          ))}
        </TableBody>
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
      </Table>
      <CodeModal {...dialogProps} dialogName={AUDIT_BODY_MODAL} />
    </>
  );
}

export default withDialogProps(AuditLogTable);
