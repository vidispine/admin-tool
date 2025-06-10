import { useMemo, forwardRef } from 'react';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';

export default function ListItemLink(props) {
  const { icon = false, primary, secondary, to, exact, ...listItemProps } = props;
  const avatarText = (primary && primary[0]) || (secondary && secondary[0]);

  const renderLink = useMemo(
    () =>
      // TODO Fix this nesting issue
      // eslint-disable-next-line react/no-unstable-nested-components
      forwardRef((itemProps, ref) => <NavLink to={to} exact={exact} ref={ref} {...itemProps} />),
    [to, exact],
  );

  return (
    <li>
      <ListItem button component={renderLink} activeClassName="Mui-selected" {...listItemProps}>
        {icon && avatarText !== undefined ? (
          <ListItemIcon>
            <Avatar style={{ height: 25, width: 25 }}>{avatarText}</Avatar>
          </ListItemIcon>
        ) : null}
        <ListItemText primary={primary} secondary={secondary} />
      </ListItem>
    </li>
  );
}
