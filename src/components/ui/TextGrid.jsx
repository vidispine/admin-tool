import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import startCase from 'lodash.startcase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import clsx from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import CodeMirror from './CodeMirror';
import { bitRateToSize, freqToSize } from '../../utils/bitsToSize';
import formatXML from '../../utils/formatXML';
import formatJSON from '../../utils/formatJSON';
import { capitalizeString, bytesToSize, fromNow } from '../../utils';
import UnstyledLink from './UnstyledLink';
import UnstyledHashLink from './UnstyledHashLink';
import withErrorBoundary from '../../hoc/withErrorBoundary';

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
  ValueComponent: { overflowWrap: 'anywhere' },
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

const StyledTypography = ({
  color = 'textPrimary',
  variant = 'subtitle2',
  ...props
}) => (
  <Typography
    color={color}
    variant={variant}
    {...props}
  />
);

function SetValueComponent({
  value,
  variant,
  variantProps,
  capitalize,
  classes = {},
  to,
  onDelete,
  ...typographyProps
}) {
  if (value === undefined || null) {
    return null;
  }
  let valueComponent = (
    <StyledTypography className={classes.ValueComponent} {...typographyProps}>
      {capitalize ? capitalizeString(value) : value.toString()}
    </StyledTypography>
  );
  switch (variant) {
    case 'checkbox':
      valueComponent = (
        <Checkbox
          checked={value}
          disabled
        />
      );
      break;
    case 'component':
      valueComponent = value;
      break;
    case 'aspectratio':
      if (typeof value === 'object' && value.horizontal) {
        valueComponent = (
          <StyledTypography>
            {`Horizontal:${value.horizontal} Vertical:${value.vertical}`}
          </StyledTypography>
        );
      }
      break;
    case 'duration':
      if (typeof value === 'object' && value.started) {
        const startMoment = moment(value.started);
        const finishedMoment = moment(value.finished);
        const durationMoment = moment.duration(finishedMoment.diff(startMoment));
        const durationHuman = durationMoment.humanize();
        valueComponent = (
          <StyledTypography>
            {durationHuman}
          </StyledTypography>
        );
      }
      break;
    case 'fromnow':
      valueComponent = (
        <StyledTypography>
          {fromNow(value)}
        </StyledTypography>
      );
      break;
    case 'timestring':
      valueComponent = (
        <StyledTypography>
          {value ? moment(value).toString() : ''}
        </StyledTypography>
      );
      break;
    case 'timestamp':
      valueComponent = (
        <StyledTypography>
          {value}
        </StyledTypography>
      );
      break;
    case 'seconds':
      valueComponent = (
        <StyledTypography>
          {moment.duration(value, 'seconds').humanize()}
        </StyledTypography>
      );
      break;
    case 'rational':
      if (typeof value === 'object' && value.denominator) {
        valueComponent = (
          <StyledTypography>
            {`${value.numerator}/${value.denominator}`}
          </StyledTypography>
        );
      }
      break;
    case 'resolution':
      if (typeof value === 'object' && value.width) {
        valueComponent = (
          <StyledTypography>
            {`Width:${value.width} Height:${value.height}`}
          </StyledTypography>
        );
      }
      break;
    case 'timebase':
      if (typeof value === 'object' && value.denominator) {
        valueComponent = (
          <StyledTypography>
            {`${value.denominator}/${value.numerator}`}
          </StyledTypography>
        );
      }
      break;
    case 'timecode':
      if (typeof value === 'object' && value.samples) {
        valueComponent = (
          <StyledTypography>
            {`${value.samples}@${value.timeBase.denominator}/${value.timeBase.numerator}`}
          </StyledTypography>
        );
      }
      break;
    case 'fps':
      if (typeof value === 'object' && value.denominator) {
        const videoSamplerate = +(value.denominator / value.numerator).toFixed(2);
        valueComponent = (
          <StyledTypography>
            {`${videoSamplerate} fps`}
          </StyledTypography>
        );
      }
      break;
    case 'fps-reverse':
      if (typeof value === 'object' && value.denominator) {
        const videoSamplerate = +(value.numerator / value.denominator).toFixed(2);
        valueComponent = (
          <StyledTypography>
            {`${videoSamplerate} fps`}
          </StyledTypography>
        );
      }
      break;
    case 'bitrate':
      valueComponent = (
        <StyledTypography>
          {bitRateToSize(value)}
        </StyledTypography>
      );
      break;
    case 'percent':
      valueComponent = (
        <StyledTypography>
          {`${parseInt(value, 10) || 0}%`}
        </StyledTypography>
      );
      break;
    case 'frequency':
      valueComponent = (
        <StyledTypography>
          {freqToSize(value)}
        </StyledTypography>
      );
      break;
    case 'bytes':
      valueComponent = (
        <StyledTypography>
          {bytesToSize(value)}
        </StyledTypography>
      );
      break;
    case 'link':
      valueComponent = (
        <StyledTypography>
          {to ? <UnstyledLink to={to}>{value}</UnstyledLink> : value}
        </StyledTypography>
      );
      break;
    case 'username':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/user/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'group':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/group/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'shape-tag':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/shape-tag/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'metadata-field':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/metadata-field/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'item':
    case 'itemId':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/item/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'shapeId':
    case 'shape': {
      if (variantProps?.itemId) {
        valueComponent = (
          <StyledTypography>
            <UnstyledLink to={`/item/${variantProps.itemId}/shape/${value}/`}>{value}</UnstyledLink>
          </StyledTypography>
        );
      }
      break;
    }
    case 'componentId': {
      if (variantProps?.itemId && variantProps?.shapeId) {
        valueComponent = (
          <StyledTypography>
            <UnstyledHashLink to={`/item/${variantProps.itemId}/shape/${variantProps.shapeId}#${value}`}>{value}</UnstyledHashLink>
          </StyledTypography>
        );
      }
      break;
    }
    case 'collectionId':
    case 'collection':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/collection/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'library':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/library/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'documentMetadataName':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/document/${value}`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'document':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/document/${value}`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'fileId':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/file/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'fileIdList':
      valueComponent = (
        value.split(',').map((label) => (
          <StyledTypography>
            <UnstyledLink to={`/file/${label}/`}>{label}</UnstyledLink>
          </StyledTypography>
        ))
      );
      break;
    case 'storageId':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/storage/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'jobtype':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/task-definition/jobtype/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'boolean':
      valueComponent = (
        <StyledTypography>
          {(value === 'true' || value === true) && 'True'}
          {(value === 'false' || value === false) && 'False'}
        </StyledTypography>
      );
      break;
    case 'list':
      if (Array.isArray(value)) {
        valueComponent = (
          value.map((label) => (
            <Chip
              key={label}
              label={label}
              // eslint-disable-next-line react/jsx-no-bind
              onDelete={onDelete ? (e) => onDelete(e, label) : undefined}
            />
          ))
        );
      }
      break;
    case 'commaseparatedlist':
      valueComponent = (
        value.split(',').map((label) => (
          <StyledTypography className={classes.ValueComponent} {...typographyProps}>
            {capitalize ? capitalizeString(label) : label.toString()}
          </StyledTypography>
        ))
      );
      break;
    case 'row':
      if (Array.isArray(value)) {
        valueComponent = (
          value.map((label) => (
            <StyledTypography className={classes.ValueComponent} {...typographyProps}>
              {capitalize ? capitalizeString(label) : label.toString()}
            </StyledTypography>
          ))
        );
      }
      break;
    default:
      if (variant) { console.warn(`TextGrid: Unknown variant=${variant}`); } // eslint-disable-line no-console
      break;
  }
  return valueComponent;
}

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
  initialHideCode = true,
  to,
  onEdit,
}) {
  const className = clsx(propsClassName, classes.root, {
    [classes.onHover]: hover,
    [classes.default]: !hover,
  });

  const [isCodeHidden, setIsCodeHidden] = React.useState(initialHideCode);
  const toggleCode = () => setIsCodeHidden((prevState) => !prevState);
  const onTextClick = disableOnClick ? (event) => event.stopPropagation() : onClick;
  if (hideNoValue) {
    if (value === undefined) {
      return null;
    }
    if (Array.isArray(value) && value.length === 0) {
      return null;
    }
  }
  if (variant === 'code' || variant === 'text/plain') {
    return (
      <div>
        {title !== undefined
          && (
            <Grid
              container
              direction="row"
              alignItems="center"
              className={className}
              wrap="nowrap"
            >
              <Grid md={3} sm={4} xs={6} {...titleGridProps} item>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  onClick={onTextClick}
                  noWrap={noWrapTitle}
                >
                  {titleStartCase ? startCase(title) : title}
                </Typography>
              </Grid>
              {hideCode === true && (
                <Button onClick={toggleCode} size="small" variant="outlined">
                  {`${isCodeHidden ? 'Show' : 'Hide'} ${titleStartCase ? startCase(title) : title}`}
                </Button>
              )}
            </Grid>
          )}
        {(hideCode === false || isCodeHidden === false) && (
          <CodeMirror
            value={value || ''}
            onClick={onTextClick}
            options={{
              readOnly: true,
              theme: 'material',
              lineWrapping: true,
              lineNumbers: true,
              foldGutter: true,
              gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
              ...codeProps,
            }}
          />
        )}
      </div>
    );
  }
  if (variant === 'json' || variant === 'application/json') {
    return (
      <>
        {title !== undefined
          && (
            <Grid
              container
              direction="row"
              alignItems="center"
              className={className}
              wrap="nowrap"
            >
              <Grid md={3} sm={4} xs={6} {...titleGridProps} item>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  onClick={onTextClick}
                  noWrap={noWrapTitle}
                >
                  {titleStartCase ? startCase(title) : title}
                </Typography>
              </Grid>
              {hideCode === true && (
                <Button onClick={toggleCode} size="small" variant="outlined">
                  {`${isCodeHidden ? 'Show' : 'Hide'} ${titleStartCase ? startCase(title) : title}`}
                </Button>
              )}
            </Grid>
          )}
        {(hideCode === false || isCodeHidden === false) && (
          <CodeMirror
            value={formatJSON(value) || ''}
            onClick={onTextClick}
            options={{
              readOnly: true,
              theme: 'material',
              mode: 'application/json',
              lineWrapping: true,
              lineNumbers: true,
              foldGutter: true,
              gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
              ...codeProps,
            }}
          />
        )}
      </>
    );
  }
  if (variant === 'application/ld+json') {
    return (
      <div>
        {title !== undefined
          && (
            <Grid
              container
              direction="row"
              alignItems="center"
              className={className}
              wrap="nowrap"
            >
              <Grid md={3} sm={4} xs={6} {...titleGridProps} item>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  onClick={onTextClick}
                  noWrap={noWrapTitle}
                >
                  {titleStartCase ? startCase(title) : title}
                </Typography>
              </Grid>
              {hideCode === true && (
                <Button onClick={toggleCode} size="small" variant="outlined">
                  {`${isCodeHidden ? 'Show' : 'Hide'} ${titleStartCase ? startCase(title) : title}`}
                </Button>
              )}
            </Grid>
          )}
        {(hideCode === false || isCodeHidden === false) && (
          <CodeMirror
            value={value || ''}
            onClick={onTextClick}
            options={{
              readOnly: true,
              theme: 'material',
              mode: 'application/ld+json',
              lineWrapping: true,
              lineNumbers: true,
              foldGutter: true,
              gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
              ...codeProps,
            }}
          />
        )}
      </div>
    );
  }
  if (variant === 'xml' || variant === 'application/xml') {
    return (
      <div>
        {title !== undefined
        && (
          <Grid
            container
            direction="row"
            alignItems="center"
            className={className}
            wrap="nowrap"
          >
            <Grid md={3} sm={4} xs={6} {...titleGridProps} item>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                onClick={onTextClick}
                noWrap={noWrapTitle}
              >
                {titleStartCase ? startCase(title) : title}
              </Typography>
            </Grid>
            {hideCode === true && (
              <Button onClick={toggleCode} size="small" variant="outlined">
                {`${isCodeHidden ? 'Show' : 'Hide'} ${titleStartCase ? startCase(title) : title}`}
              </Button>
            )}
          </Grid>
        )}
        {(hideCode === false || isCodeHidden === false) && (
          <CodeMirror
            value={formatXML(value) || ''}
            onClick={onTextClick}
            options={{
              readOnly: true,
              theme: 'material',
              mode: 'xml',
              lineWrapping: true,
              lineNumbers: true,
              foldGutter: true,
              gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
              ...codeProps,
            }}
          />
        )}
      </div>
    );
  }
  if (variant === 'boolean') {
    return (
      <div
        className={className}
      >
        <FormControlLabel
          classes={{ root: classes.FormControlLabel }}
          control={(
            <Checkbox
              checked={(value === 'true' || value === true)}
              indeterminate={(value === '' || value === undefined)}
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
  }
  const valueComponent = SetValueComponent({
    value,
    variant,
    variantProps,
    capitalize,
    onClick: onTextClick,
    classes,
    noWrap,
    to,
    onDelete,
    ...valueTypographyProps,
  });
  return (
    <Grid
      container
      direction="row"
      wrap="nowrap"
      className={className}
      alignItems="flex-start"
    >
      <Grid md={3} sm={4} xs={6} className={classes.TitleGridItem} {...titleGridProps} item>
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
      <Grid xs="auto" className={classes.ValueGridItem} {...valueGridProps} item>
        {valueComponent}
      </Grid>
      {onEdit && (
        <Grid item className={classes.EditGridItem}>
          <IconButton className={classes.IconButton} size="small" onClick={onEdit}>
            <EditIcon className={classes.EditIcon} />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
}

export default withErrorBoundary(withStyles(styles)(TextGrid));