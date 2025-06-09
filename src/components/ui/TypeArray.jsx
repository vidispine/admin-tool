import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import startCase from 'lodash.startcase';
import clsx from 'clsx';

import withErrorBoundary from '../../hoc/withErrorBoundary';

const hoverStyle = (theme) => ({
  onHover: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  withMargin: {
    marginLeft: 10,
  },
  withPadding: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});

const TypeArray = ({
  title,
  titleKey,
  value,
  classes,
  arrayTitle,
  arrayStartCase = false,
  component: Component,
  hover = true,
  dense = false,
  hideNoValue = false,
  titleStartCase = true,
  arrayKey,
  ...props
}) => {
  if (hideNoValue && value === undefined) { return null; }
  if (hideNoValue && value.length === 0) { return null; }
  if (!Array.isArray(value)) { return null; }
  return (
    <>
      {arrayTitle && (
        <Typography variant="subtitle2">
          {arrayStartCase ? startCase(arrayTitle) : arrayTitle}
        </Typography>
      )}
      {value.map((thisValue, index) => (
        <div
          className={clsx({
            [classes.onHover]: hover,
            [classes.withMargin]: dense === false,
          })}
          key={arrayKey ? thisValue[arrayKey] : index}
        >
          {title && !titleKey && (
            <Typography variant="subtitle2">
              {titleStartCase
                ? startCase(`${title} ${index + 1}`)
                : `${title} ${index + 1}`}
            </Typography>
          )}
          {titleKey && title && (
            <Typography variant="subtitle2">
              {titleStartCase
                ? startCase(`${title} ${thisValue[titleKey]}`)
                : `${title} ${thisValue[titleKey]}`}
            </Typography>
          )}
          {titleKey && !title && (
            <Typography variant="subtitle2">
              {titleStartCase
                ? startCase(thisValue[titleKey])
                : thisValue[titleKey]}
            </Typography>
          )}
          <div className={clsx({ [classes.withMargin]: dense === false })}>
            <Component value={thisValue} {...props} />
          </div>
        </div>
      ))}
    </>
  );
};

export default withErrorBoundary(withStyles(hoverStyle)(TypeArray));
