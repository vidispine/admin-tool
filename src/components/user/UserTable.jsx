import withDialogProps from '../../hoc/withDialogProps';
import Table from '../ui/Table';
import TableActions from '../ui/TableActions';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableFooter from '../ui/TableFooter';
import TableHead from '../ui/TableHead';
import TablePagination from '../ui/TablePagination';
import TableRow from '../ui/TableRow';

import UserGroupRemove from './UserGroupRemove';
import UserRow from './UserRow';

const REMOVE_USER_DIALOG = 'REMOVE_USER_DIALOG';

function UserTable({
  userListDocument = {},
  count,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  groupName,
  onSuccess,
  onOpen,
  showRemove,
  dialogProps,
}) {
  const { user: userList = [] } = userListDocument;
  const rowsPerPageOptions = [100, 250, 500];
  if (!rowsPerPageOptions.includes(rowsPerPage)) {
    rowsPerPageOptions.push(rowsPerPage);
  }
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Real Name</TableCell>
            <TableCell>Disabled</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((userDocument) => (
            <UserRow
              key={userDocument.userName}
              userDocument={userDocument}
              onRemove={showRemove ? onOpen(REMOVE_USER_DIALOG) : undefined}
            />
          ))}
        </TableBody>
        {count && (
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
      {groupName && (
        <UserGroupRemove
          {...dialogProps}
          dialogName={REMOVE_USER_DIALOG}
          groupName={groupName}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
}

export default withDialogProps(UserTable);
