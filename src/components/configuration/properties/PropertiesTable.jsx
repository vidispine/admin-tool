import withDialogProps from '../../../hoc/withDialogProps';
import sortKeyCaseInsensitive from '../../../utils/sortKeyCaseInsensitive';
import FixedTable from '../../ui/FixedTable';
import TableBody from '../../ui/TableBody';
import TableCell from '../../ui/TableCell';
import TableHead from '../../ui/TableHead';
import TableRow from '../../ui/TableRow';

import PropertiesDialog from './PropertiesDialog';
import PropertiesRemove from './PropertiesRemove';
import PropertiesRow from './PropertiesRow';

const REMOVE_CONFIGURATIONPROPERTIES_DIALOG = 'REMOVE_CONFIGURATIONPROPERTIES_DIALOG';
const CONFIGURATIONPROPERTIES_EDIT_MODAL = 'CONFIGURATIONPROPERTIES_EDIT_MODAL';

function PropertiesTable({
  configurationPropertyListDocument = [],
  onRefresh,
  dialogProps,
  onOpen,
}) {
  const { property: propertyList = [] } = configurationPropertyListDocument;
  return (
    <>
      <FixedTable>
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Last Changed</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {propertyList.sort(sortKeyCaseInsensitive('key')).map((configurationPropertyDocument) => (
            <PropertiesRow
              key={configurationPropertyDocument.key}
              configurationPropertyDocument={configurationPropertyDocument}
              onRemove={onOpen(REMOVE_CONFIGURATIONPROPERTIES_DIALOG)}
              onEdit={onOpen(CONFIGURATIONPROPERTIES_EDIT_MODAL)}
            />
          ))}
        </TableBody>
      </FixedTable>
      <PropertiesRemove
        {...dialogProps}
        dialogName={REMOVE_CONFIGURATIONPROPERTIES_DIALOG}
        onSuccess={onRefresh}
      />
      <PropertiesDialog
        {...dialogProps}
        dialogName={CONFIGURATIONPROPERTIES_EDIT_MODAL}
        onSuccess={onRefresh}
      />
    </>
  );
}

export default withDialogProps(PropertiesTable);
