import { useRef, useState, useCallback, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import startCase from 'lodash.startcase';
import clsx from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import withErrorBoundary from '../../hoc/withErrorBoundary';
import TextGridValue from './TextGridValue';
import TextGridCode from './TextGridCode';
import TextGridBoolean from './TextGridBoolean';

const styles = (theme) => ({
  onHover: {
    minHeight: theme.spacing(4),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  default: {
    minHeight: theme.spacing(4),
  },
  TitleGridItem: {},
  TitleTypography: {},
  ValueGridItem: {
    flexGrow: 1,
  },
  EditIconButton: {
    visibility: 'hidden',
  },
  EditIcon: {},
  root: {
    alignItems: 'center',
    '&:hover $EditIconButton': {
      visibility: 'visible',
    },
  },
  EditGridItem: {
    marginLeft: theme.spacing(0.5),
  },
  CheckIcon: {
    color: theme.palette.success.main,
  },
  CancelIcon: {
    color: theme.palette.error.main,
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
  const inputRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [hasError, setHasError] = useState(false);
  const onEditCallback = useCallback(
    async () => {
      if (!onEdit || !inputRef) return;
      const newValue = inputRef.current.value;
      try {
        await onEdit(newValue, value);
        setHasError(false);
        setIsEdit(false);
      } catch (error) {
        setHasError(true);
      }
    },
    [onEdit, value],
  );
  const onToggleEdit = () => setIsEdit((prevValue) => !prevValue);
  const onCloseEdit = () => {
    setIsEdit(false);
    setHasError(false);
  };
  useEffect(() => { // set input focus when toggling edit
    if (isEdit && inputRef) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  const className = clsx(propsClassName, classes.root, {
    [classes.onHover]: hover,
    [classes.default]: !hover,
  });

  const onTextClick = disableOnClick ? (event) => event.stopPropagation() : onClick;

  const [isValueHidden, setIsValueHidden] = useState(initialHideValue);
  const toggleHideValue = () => setIsValueHidden((prevState) => !prevState);

  if (hideNoValue) {
    if (value === undefined) {
      return null;
    }
    if (Array.isArray(value) && value.length === 0) {
      return null;
    }
  }

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
        <TextGridBoolean
          className={className}
          title={title}
          value={value}
          titleStartCase={titleStartCase}
        />
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
              {...valueTypographyProps}
              value={value}
              variant={variant}
              variantProps={variantProps}
              capitalize={capitalize}
              onClick={onTextClick}
              noWrap={noWrap}
              to={to}
              onDelete={onDelete}
              isEdit={isEdit}
              inputRef={inputRef}
              error={hasError}
            />
          </Grid>
          {onEdit && (
            <Grid item className={classes.EditGridItem}>
              {isEdit === true ? (
                <>
                  <Tooltip title="Save" arrow>
                    <IconButton
                      className={classes.CheckIconButton}
                      size="small"
                      onClick={onEditCallback}
                    >
                      <CheckIcon className={classes.CheckIcon} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cancel" arrow>
                    <IconButton
                      className={classes.CancelIconButton}
                      size="small"
                      onClick={onCloseEdit}
                    >
                      <CancelIcon className={classes.CancelIcon} />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title="Edit" arrow>
                  <IconButton
                    className={classes.EditIconButton}
                    size="small"
                    onClick={onToggleEdit}
                    disableRipple
                  >
                    <EditIcon className={classes.EditIcon} />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
          )}
        </Grid>
      );
  }
}

export default withErrorBoundary(withStyles(styles)(TextGrid));
