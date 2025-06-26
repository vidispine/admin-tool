import { useState } from 'react';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/Check';

import CopyIcon from './CopyIcon';

const StyledButton = withStyles((theme) => ({
  label: {
    color: theme.palette.common.white,
  },
}))(Button);

function CopyTooltip({ value, ...props }) {
  const [isCopied, setIsCopied] = useState(false);
  const onClick = () => {
    navigator.clipboard.writeText(typeof value === 'object' ? JSON.stringify(value) : value);
    setIsCopied(true);
  };
  const onOpen = () => setIsCopied(false);
  return (
    <Tooltip
      placement="right"
      enterDelay={1000}
      enterNextDelay={500}
      leaveDelay={0}
      arrow
      onOpen={onOpen}
      title={
        <StyledButton
          variant="text"
          size="small"
          endIcon={isCopied ? <CheckIcon /> : <CopyIcon />}
          onClick={onClick}
        >
          {isCopied ? 'Copied' : 'Copy to clipboard'}
        </StyledButton>
      }
      interactive
      {...props}
    />
  );
}

export default CopyTooltip;
