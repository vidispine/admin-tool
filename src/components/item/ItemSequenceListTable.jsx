import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '../ui/TableRowLink';

function ItemSequenceListTable({ sequenceListDocument, itemId }) {
  const sequenceList = sequenceListDocument?.sequence || [];
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sequenceList.map((sequence) => (
            <TableRow
              key={sequence.id}
              to={`/item/${itemId}/sequence/${sequence.type}/`}
              hover
            >
              <TableCell>{sequence.id}</TableCell>
              <TableCell>{sequence.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ItemSequenceListTable;
