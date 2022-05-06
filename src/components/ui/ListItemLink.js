import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import { NavLink } from 'react-router-dom';

export default function ListItemLink(props) {
  const {
    icon = true, primary, secondary, to, ...listItemProps
  } = props;
  const avatarText = (primary && primary[0]) || (secondary && secondary[0]);

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <NavLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem
        button
        component={renderLink}
        activeClassName="Mui-selected"
        {...listItemProps}
      >
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
