import startCase from 'lodash.startcase';
import TableCell from '@material-ui/core/TableCell';

import TableRowLink from './TableRowLink';

export default function UriListRow({
  uri,
  linkTo,
  textTo,
  onClick,
  titleCase = false,
}) {
  const linkProps = { };
  let uriText = uri;
  if (textTo) { uriText = textTo(uri); }
  if (linkTo) { linkProps.to = linkTo(uri); }
  if (onClick) { linkProps.onClick = () => onClick(uri); }
  const cellText = titleCase ? startCase(uriText) : uriText;
  return (
    <TableRowLink hover {...linkProps}>
      <TableCell>
        {cellText}
      </TableCell>
      <TableCell />
    </TableRowLink>
  );
}
