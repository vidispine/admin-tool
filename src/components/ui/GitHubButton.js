import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from './GitHubIcon';

const GitHubButton = React.forwardRef((props, ref) => (
  <IconButton
    color="inherit"
    href="https://github.com/vidispine/admin-tool"
    target="_blank"
    rel="noopener noreferrer"
    disableRipple
    ref={ref}
    {...props}
  >
    <GitHubIcon />
  </IconButton>
));

export default GitHubButton;
