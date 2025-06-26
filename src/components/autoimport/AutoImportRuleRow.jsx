import TableCell from '@material-ui/core/TableCell';

import TableRowLink from '../ui/TableRowLink';

export default function AutoImportRuleRow({ autoImportRule }) {
  const { storage: storageId } = autoImportRule;
  return (
    <TableRowLink hover to={`/auto-import/${storageId}/`}>
      <TableCell>{storageId}</TableCell>
      <TableCell />
    </TableRowLink>
  );
}
