import moment from 'moment';

import { bytesToSize } from '../../utils';
import TableCell from '../ui/TableCell';
import TableRowLink from '../ui/TableRowLink';

import FileStatus from './FileStatus';

export default function FileRow({ fileDocument = {}, storageId }) {
  return (
    <TableRowLink
      to={
        storageId ? `/storage/${storageId}/file/${fileDocument.id}/` : `/file/${fileDocument.id}/`
      }
      hover
    >
      <TableCell>{fileDocument.path}</TableCell>
      <TableCell>{fileDocument.id}</TableCell>
      <TableCell>
        <FileStatus fileDocument={fileDocument} />
      </TableCell>
      {storageId === undefined ? <TableCell>{fileDocument.storage}</TableCell> : null}
      <TableCell>{bytesToSize(fileDocument.size)}</TableCell>
      <TableCell>
        {fileDocument.timestamp ? moment(fileDocument.timestamp).toString() : ''}
      </TableCell>
    </TableRowLink>
  );
}
