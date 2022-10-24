import React from 'react';
import { HashLink } from './HashLink';

const style = {
  textDecoration: 'none',
  color: 'inherit',
};

const UnstyledHashLink = React.forwardRef((props, ref) => (
  <HashLink ref={ref} style={style} {...props} onClick={(e) => e.stopPropagation()} />
));

export default UnstyledHashLink;
