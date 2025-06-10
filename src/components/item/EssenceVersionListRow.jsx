import TableCell from '@material-ui/core/TableCell';

import TableRowLink from '../ui/TableRowLink';

export default function EssenceVersionListRow({ versionId, created, linkTo, textTo }) {
  const linkProps = {};
  let versionText = versionId;
  if (textTo) {
    versionText = textTo(versionId);
  }
  if (linkTo) {
    linkProps.to = linkTo(versionId);
  }
  return (
    <TableRowLink hover {...linkProps}>
      <TableCell>{versionText}</TableCell>
      <TableCell>{created}</TableCell>
      <TableCell />
    </TableRowLink>
  );
}
