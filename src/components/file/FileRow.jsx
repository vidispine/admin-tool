import React from 'react';
import moment from 'moment';

import TableCell from '../ui/TableCell';
import TableRowLink from '../ui/TableRowLink';
import FileStatus from './FileStatus';
import { bytesToSize } from '../../utils';

export default function FileRow({
  fileDocument = {},
}) {
  return (
    <TableRowLink to={`/file/${fileDocument.id}/`} hover>
      <TableCell>{fileDocument.path}</TableCell>
      <TableCell>
        {fileDocument.id}
      </TableCell>
      <TableCell><FileStatus fileDocument={fileDocument} /></TableCell>
      <TableCell>
        {fileDocument.storage}
      </TableCell>
      <TableCell>{bytesToSize(fileDocument.size)}</TableCell>
      <TableCell>
        {fileDocument.timestamp ? moment(fileDocument.timestamp).toString() : ''}
      </TableCell>
    </TableRowLink>
  );
}
