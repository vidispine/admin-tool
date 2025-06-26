import withDialogProps from '../../hoc/withDialogProps';
import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';

import FieldGroupChildRemove from './FieldGroupChildRemove';
import FieldGroupRemove from './FieldGroupRemove';
import FieldGroupRow from './FieldGroupRow';

const REMOVE_FIELDGROUP_DIALOG = 'REMOVE_FIELDGROUP_DIALOG';

function FieldGroupListTable({
  metadataFieldGroupListDocument = [],
  groupName,
  onRefresh,
  dialogProps,
  onOpen,
}) {
  const { group: fieldGroupList = [] } = metadataFieldGroupListDocument;
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Field Group Name</TableCell>
            <TableCell>Inheritance</TableCell>
            <TableCell padding="checkbox" />
          </TableRow>
        </TableHead>
        <TableBody>
          {fieldGroupList.map((metadataFieldGroupDocument) => (
            <FieldGroupRow
              key={metadataFieldGroupDocument.name}
              metadataFieldGroupDocument={metadataFieldGroupDocument}
              onOpen={onOpen(REMOVE_FIELDGROUP_DIALOG)}
            />
          ))}
        </TableBody>
      </Table>
      {groupName ? (
        <FieldGroupChildRemove
          {...dialogProps}
          dialogName={REMOVE_FIELDGROUP_DIALOG}
          groupName={groupName}
          onSuccess={onRefresh}
        />
      ) : (
        <FieldGroupRemove
          {...dialogProps}
          dialogName={REMOVE_FIELDGROUP_DIALOG}
          onSuccess={onRefresh}
        />
      )}
    </>
  );
}

export default withDialogProps(FieldGroupListTable);
