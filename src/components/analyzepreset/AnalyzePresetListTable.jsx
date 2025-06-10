import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TableRowLink from '../ui/TableRowLink';

export default function AnalyzePresetListTable({ analyzePresetListDocument = {} }) {
  const { preset: analyzePresetList = [] } = analyzePresetListDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Preset Name</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {analyzePresetList.map(({ name }) => (
          <TableRowLink hover to={`/analyze-preset/${name}/`} key={name}>
            <TableCell>{name}</TableCell>
            <TableCell />
          </TableRowLink>
        ))}
      </TableBody>
    </Table>
  );
}
