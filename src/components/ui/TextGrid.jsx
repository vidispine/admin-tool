import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import startCase from 'lodash.startcase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import clsx from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import withErrorBoundary from '../../hoc/withErrorBoundary';
import TextGridValue from './TextGridValue';
import TextGridCode from './TextGridCode';

const styles = (theme) => ({
  FormControlLabel: {
    height: theme.typography.subtitle1.lineHeight,
  },
  onHover: {
    minHeight: '32px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  default: {
    minHeight: '32px',
  },
  TitleGridItem: {},
  TitleTypography: {},
  ValueGridItem: {},
  IconButton: {
    visibility: 'hidden',
  },
  EditIcon: {},
  root: {
    '&:hover $IconButton': {
      visibility: 'visible',
    },
    alignItems: 'center',
  },
  EditGridItem: {
    marginLeft: theme.spacing(0.5),
  },
});

function TextGrid({
  className: propsClassName,
  title,
  value,
  variant,
  variantProps,
  capitalize = false,
  titleGridProps,
  valueGridProps,
  titleTypographyProps = {},
  valueTypographyProps = {},
  classes,
  hover = false,
  hideNoValue = false,
  titleStartCase = true,
  codeProps = {},
  onClick,
  onDelete,
  disableOnClick = true,
  noWrap = false,
  noWrapTitle = true,
  hideCode = false,
  initialHideValue = true,
  to,
  onEdit,
}) {
  const onEditCallback = React.useCallback(
    () => (onEdit ? onEdit(value) : null),
    [onEdit, value],
  );
  const className = clsx(propsClassName, classes.root, {
    [classes.onHover]: hover,
    [classes.default]: !hover,
  });

  const onTextClick = disableOnClick
    ? (event) => event.stopPropagation()
    : onClick;
  if (hideNoValue) {
    if (value === undefined) {
      return null;
    }
    if (Array.isArray(value) && value.length === 0) {
      return null;
    }
  }
  const [isValueHidden, setIsValueHidden] = React.useState(initialHideValue);
  const toggleHideValue = () => setIsValueHidden((prevState) => !prevState);

  switch (variant) {
    case 'code':
    case 'text/plain':
    case 'json':
    case 'application/json':
    case 'application/ld+json':
    case 'xml':
    case 'application/xml':
      return (
        <TextGridCode
          title={title}
          value={value}
          variant={variant}
          titleGridProps={titleGridProps}
          titleStartCase={titleStartCase}
          codeProps={codeProps}
          noWrapTitle={noWrapTitle}
          hideCode={hideCode}
          onTextClick={onTextClick}
          toggleHideValue={toggleHideValue}
          isValueHidden={isValueHidden}
        />
      );
    case 'boolean':
      return (
        <div className={className}>
          <FormControlLabel
            classes={{ root: classes.FormControlLabel }}
            control={(
              <Checkbox
                checked={value === 'true' || value === true}
                indeterminate={value === '' || value === undefined}
                disabled
              />
            )}
            label={(
              <Typography variant="subtitle2" color="textSecondary">
                {titleStartCase ? startCase(title) : title}
              </Typography>
            )}
          />
        </div>
      );
    default:
      return (
        <Grid
          container
          direction="row"
          wrap="nowrap"
          className={className}
          alignItems="flex-start"
        >
          <Grid
            md={3}
            sm={4}
            xs={6}
            className={classes.TitleGridItem}
            {...titleGridProps}
            item
          >
            <Typography
              color="textSecondary"
              variant="subtitle2"
              onClick={onTextClick}
              noWrap={noWrapTitle}
              className={classes.TitleTypography}
              {...titleTypographyProps}
            >
              {titleStartCase ? startCase(title) : title}
            </Typography>
          </Grid>
          <Grid
            xs="auto"
            className={classes.ValueGridItem}
            {...valueGridProps}
            item
          >
            <TextGridValue
              value={value}
              variant={variant}
              variantProps={variantProps}
              capitalize={capitalize}
              onClick={onTextClick}
              noWrap={noWrap}
              to={to}
              onDelete={onDelete}
              {...valueTypographyProps}
            />
          </Grid>
          {onEdit && (
            <Grid item className={classes.EditGridItem}>
              <IconButton
                className={classes.IconButton}
                size="small"
                onClick={onEditCallback}
              >
                <EditIcon className={classes.EditIcon} />
              </IconButton>
            </Grid>
          )}
        </Grid>
      );
  }
}

export default withErrorBoundary(withStyles(styles)(TextGrid));
