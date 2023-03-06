import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import VidispineIcon from './VidispineIcon';

const VidispineButton = React.forwardRef(({ IconButtonProps = {}, IconProps = {} }, ref) => (
  <IconButton
    color="inherit"
    href="https://vidispine.com"
    target="_blank"
    rel="noopener noreferrer"
    disableRipple
    ref={ref}
    {...IconButtonProps}
  >
    <VidispineIcon {...IconProps} />
  </IconButton>
));

export default VidispineButton;
