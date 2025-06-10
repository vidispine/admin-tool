import moment from 'moment';

import { bytesToSize } from '../../utils';
import TableCell from '../ui/TableCell';
import TableRowLink from '../ui/TableRowLink';

import FileStatus from './FileStatus';

export default function FileRow({ fileDocument = {} }) {
  return (
    <TableRowLink to={`/file/${fileDocument.id}/`} hover>
      <TableCell>{fileDocument.path}</TableCell>
      <TableCell>{fileDocument.id}</TableCell>
      <TableCell>
        <FileStatus fileDocument={fileDocument} />
      </TableCell>
      <TableCell>{fileDocument.storage}</TableCell>
      <TableCell>{bytesToSize(fileDocument.size)}</TableCell>
      <TableCell>
        {fileDocument.timestamp ? moment(fileDocument.timestamp).toString() : ''}
      </TableCell>
    </TableRowLink>
  );
}
