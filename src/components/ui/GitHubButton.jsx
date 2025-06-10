import { forwardRef } from 'react';

import IconButton from '@material-ui/core/IconButton';

import GitHubIcon from './GitHubIcon';

const GitHubButton = forwardRef((props, ref) => (
  <IconButton
    color="inherit"
    href="https://github.com/vidispine/admin-tool"
    target="_blank"
    rel="noopener noreferrer"
    disableRipple
    ref={ref}
  >
    <GitHubIcon />
  </IconButton>
));

export default GitHubButton;
