import withDialogProps from '../../hoc/withDialogProps';
import Table from '../ui/Table';
import TableActions from '../ui/TableActions';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableFooter from '../ui/TableFooter';
import TableHead from '../ui/TableHead';
import TablePagination from '../ui/TablePagination';
import TableRow from '../ui/TableRow';
import UserGroupRemove from '../user/UserGroupRemove';

import GroupChildRemove from './GroupChildRemove';
import GroupParentRemove from './GroupParentRemove';
import GroupRow from './GroupRow';

const REMOVE_GROUP_DIALOG = 'REMOVE_GROUP_DIALOG';

function GroupTable({
  groupListDocument = {},
  userName,
  parentGroupName,
  childGroupName,
  onSuccess,
  dialogProps,
  onOpen,
  showRemove,
  count,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
}) {
  const { group: groupList = [] } = groupListDocument;
  const rowsPerPageOptions = [100, 250, 500];
  if (!rowsPerPageOptions.includes(rowsPerPage)) {
    rowsPerPageOptions.push(rowsPerPage);
  }
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Group Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {groupList.map((groupDocument) => (
            <GroupRow
              key={groupDocument.groupName}
              groupDocument={groupDocument}
              onRemove={showRemove ? onOpen(REMOVE_GROUP_DIALOG) : undefined}
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
      {userName && (
        <UserGroupRemove
          {...dialogProps}
          dialogName={REMOVE_GROUP_DIALOG}
          userName={userName}
          onSuccess={onSuccess}
        />
      )}
      {parentGroupName && (
        <GroupChildRemove
          {...dialogProps}
          dialogName={REMOVE_GROUP_DIALOG}
          parentGroupName={parentGroupName}
          onSuccess={onSuccess}
        />
      )}
      {childGroupName && (
        <GroupParentRemove
          {...dialogProps}
          dialogName={REMOVE_GROUP_DIALOG}
          childGroupName={childGroupName}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
}

export default withDialogProps(GroupTable);
