import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';

function TableRowLink({
  to,
  style = {},
  ...props
}) {
  const component = to ? Link : undefined;
  return (
    <TableRow
      component={component}
      to={to}
      style={{ textDecoration: 'none', ...style }}
      {...props}
    />
  );
}

export default TableRowLink;
