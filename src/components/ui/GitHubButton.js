import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from './GitHubIcon';

export default function GitHubButton() {
  return (
    <IconButton
      color="inherit"
      href="https://github.com/vidispine/admin-tool"
      target="_blank"
      rel="noopener noreferrer"
      disableRipple
    >
      <GitHubIcon />
    </IconButton>
  );
}
