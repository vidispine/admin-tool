import { useState } from 'react';
import { FormSection } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import startCase from 'lodash.startcase';

import TextButton from './TextButton';

const hoverStyle = (theme) => ({
  onHover: {
    paddingTop: '10px',
    paddingBottom: '10px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  noHover: {
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  withLabel: {
    borderLeft: `1px solid ${theme.palette.divider}`,
    paddingLeft: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  header: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
  },
});

const WrappedFormSection = ({
  label,
  hover = false,
  classes,
  labelStartCase = true,
  button = false,
  initialDisplay = true,
  ...props
}) => {
  const [isDisplayed, setIsDisplayed] = useState(initialDisplay);
  const toggleText = isDisplayed === true ? 'Hide' : 'Show';
  return (
    <div>
      <div
        className={hover ? classes.onHover : classes.noHover}
      >
        <div className={classes.header}>
          { label && (
            <Typography variant="subtitle2">{labelStartCase ? startCase(label) : label}</Typography>
          )}
          { button === true && (
            <TextButton onClick={() => setIsDisplayed((prevValue) => !prevValue)} color="primary">
              {toggleText}
            </TextButton>
          )}
        </div>
        {isDisplayed === true && (
        <div className={label ? classes.withLabel : undefined}>
          <FormSection {...props} />
        </div>
        )}
      </div>

    </div>
  );
};

export default withStyles(hoverStyle)(WrappedFormSection);
