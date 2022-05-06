import React from 'react';
import TableCell from '@material-ui/core/TableCell';

import TableRowLink from '../ui/TableRowLink';
import UnstyledLink from '../ui/UnstyledLink';

export default function EssenceVersionListRow({
  versionId,
  created,
  linkTo,
  textTo,
}) {
  const linkProps = {};
  let versionText = versionId;
  if (textTo) { versionText = textTo(versionId); }
  if (linkTo) { linkProps.to = linkTo(versionId); }
  return (
    <TableRowLink hover {...linkProps}>
      <TableCell>
        {linkTo ? (
          <UnstyledLink {...linkProps}>
            {versionText}
          </UnstyledLink>
        ) : (
          versionText
        )}
      </TableCell>
      <TableCell>
        {linkTo ? (
          <UnstyledLink {...linkProps}>
            {created}
          </UnstyledLink>
        ) : (
          created
        )}
      </TableCell>
      <TableCell />
    </TableRowLink>
  );
}
