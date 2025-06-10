import { forwardRef } from 'react';

import { Link } from 'react-router-dom';

const style = {
  textDecoration: 'none',
  color: 'inherit',
};

const UnstyledLink = forwardRef((props, ref) => (
  <Link ref={ref} style={style} {...props} onClick={(e) => e.stopPropagation()} />
));

export default UnstyledLink;
