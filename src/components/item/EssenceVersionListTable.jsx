import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import EssenceVersionListRow from './EssenceVersionListRow';

export default function EssenceVersionListTable({ essenceVersionListDocument = {}, ...props }) {
  const { version: versionList = [] } = essenceVersionListDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Version</TableCell>
          <TableCell>Created</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {versionList.map(({ id: versionId, uri, created }) => (
          <EssenceVersionListRow
            key={versionId}
            versionId={versionId}
            uri={uri}
            created={created}
            {...props}
          />
        ))}
      </TableBody>
    </Table>
  );
}
