import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TableRowLink from '../ui/TableRowLink';
import UnstyledLink from '../ui/UnstyledLink';

export default function EssenceVersionCard({ essenceVersionDocument, linkTo, linkProps }) {
  if (essenceVersionDocument === undefined) { return null; }
  const { shape: shapeList = [] } = essenceVersionDocument;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Shape ID</TableCell>
          <TableCell>Created</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {shapeList.map(({ id: shapeId, created }) => (
          <TableRowLink key={shapeId} hover {...linkProps} to={linkTo(shapeId)}>
            <TableCell>
              {linkTo ? (
                <UnstyledLink {...linkProps} to={linkTo(shapeId)}>
                  {shapeId}
                </UnstyledLink>
              ) : (
                shapeId
              )}
            </TableCell>
            <TableCell>
              {linkTo ? (
                <UnstyledLink {...linkProps} to={linkTo(shapeId)}>
                  {created}
                </UnstyledLink>
              ) : (
                created
              )}
            </TableCell>
            <TableCell />
          </TableRowLink>
        ))}
      </TableBody>
    </Table>
  );
}
