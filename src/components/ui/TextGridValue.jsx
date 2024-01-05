import React from 'react';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import { bitRateToSize, freqToSize } from '../../utils/bitsToSize';
import { capitalizeString, bytesToSize, fromNow } from '../../utils';
import UnstyledLink from './UnstyledLink';
import UnstyledHashLink from './UnstyledHashLink';

const styles = () => ({
  overflowWrapAnywhere: { overflowWrap: 'anywhere' },
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

function TextGridValue({
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
    <StyledTypography
      className={classes.overflowWrapAnywhere}
      {...typographyProps}
    >
      {capitalize ? capitalizeString(value) : value.toString()}
    </StyledTypography>
  );
  switch (variant) {
    case 'checkbox':
      valueComponent = <Checkbox checked={value} disabled />;
      break;
    case 'component':
      valueComponent = value;
      break;
    case 'aspectratio':
      if (typeof value === 'object' && value.horizontal !== undefined) {
        valueComponent = (
          <StyledTypography>
            {`Horizontal:${value.horizontal} Vertical:${value.vertical}`}
          </StyledTypography>
        );
      }
      break;
    case 'duration':
      if (typeof value === 'object' && value.started !== undefined) {
        const startMoment = moment(value.started);
        const finishedMoment = moment(value.finished);
        const durationMoment = moment.duration(
          finishedMoment.diff(startMoment),
        );
        const durationHuman = durationMoment.humanize();
        valueComponent = <StyledTypography>{durationHuman}</StyledTypography>;
      }
      break;
    case 'metadataFieldValue':
      valueComponent = <StyledTypography>{value.value}</StyledTypography>;
      break;
    case 'fromnow':
      valueComponent = <StyledTypography>{fromNow(value)}</StyledTypography>;
      break;
    case 'timestring':
      valueComponent = (
        <StyledTypography>
          {value ? moment(value).toString() : ''}
        </StyledTypography>
      );
      break;
    case 'timestamp':
      valueComponent = <StyledTypography>{value}</StyledTypography>;
      break;
    case 'seconds':
      valueComponent = (
        <StyledTypography>
          {moment.duration(value, 'seconds').humanize()}
        </StyledTypography>
      );
      break;
    case 'rational':
      if (typeof value === 'object' && value.denominator !== undefined) {
        valueComponent = (
          <StyledTypography>
            {`${value.numerator}/${value.denominator}`}
          </StyledTypography>
        );
      }
      break;
    case 'resolution':
      if (typeof value === 'object' && value.width !== undefined) {
        valueComponent = (
          <StyledTypography>
            {`Width:${value.width} Height:${value.height}`}
          </StyledTypography>
        );
      }
      break;
    case 'timebase':
      if (typeof value === 'object' && value.denominator !== undefined) {
        valueComponent = (
          <StyledTypography>
            {`${value.denominator}/${value.numerator}`}
          </StyledTypography>
        );
      }
      break;
    case 'timecode':
      if (typeof value === 'object' && value.samples !== undefined) {
        valueComponent = (
          <StyledTypography>
            {`${value.samples}@${value.timeBase.denominator}/${value.timeBase.numerator}`}
          </StyledTypography>
        );
      }
      break;
    case 'fps':
      if (typeof value === 'object' && value.denominator !== undefined) {
        const videoSamplerate = +(value.denominator / value.numerator).toFixed(
          2,
        );
        valueComponent = (
          <StyledTypography>{`${videoSamplerate} fps`}</StyledTypography>
        );
      }
      break;
    case 'fps-reverse':
      if (typeof value === 'object' && value.denominator !== undefined) {
        const videoSamplerate = +(value.numerator / value.denominator).toFixed(
          2,
        );
        valueComponent = (
          <StyledTypography>{`${videoSamplerate} fps`}</StyledTypography>
        );
      }
      break;
    case 'bitrate':
      valueComponent = (
        <StyledTypography>{bitRateToSize(value)}</StyledTypography>
      );
      break;
    case 'percent':
      valueComponent = (
        <StyledTypography>{`${parseInt(value, 10) || 0}%`}</StyledTypography>
      );
      break;
    case 'frequency':
      valueComponent = <StyledTypography>{freqToSize(value)}</StyledTypography>;
      break;
    case 'bytes':
      valueComponent = (
        <StyledTypography>{bytesToSize(value)}</StyledTypography>
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
            <UnstyledLink to={`/item/${variantProps.itemId}/shape/${value}/`}>
              {value}
            </UnstyledLink>
          </StyledTypography>
        );
      }
      break;
    }
    case 'componentId': {
      if (variantProps?.itemId && variantProps?.shapeId) {
        valueComponent = (
          <StyledTypography>
            <UnstyledHashLink
              to={`/item/${variantProps.itemId}/shape/${variantProps.shapeId}#${value}`}
            >
              {value}
            </UnstyledHashLink>
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
      valueComponent = value.split(',').map((label) => (
        <StyledTypography>
          <UnstyledLink to={`/file/${label}/`}>{label}</UnstyledLink>
        </StyledTypography>
      ));
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
          <UnstyledLink to={`/task-definition/jobtype/${value}/`}>
            {value}
          </UnstyledLink>
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
        valueComponent = value.map((label) => (
          <Chip
            key={label}
            label={label}
            // eslint-disable-next-line react/jsx-no-bind
            onDelete={onDelete ? (e) => onDelete(e, label) : undefined}
          />
        ));
      }
      break;
    case 'commaseparatedlist':
      valueComponent = value.split(',').map((label) => (
        <StyledTypography
          className={classes.overflowWrapAnywhere}
          {...typographyProps}
        >
          {capitalize ? capitalizeString(label) : label.toString()}
        </StyledTypography>
      ));
      break;
    case 'row':
      if (Array.isArray(value)) {
        valueComponent = value.map((label) => (
          <StyledTypography
            className={classes.overflowWrapAnywhere}
            {...typographyProps}
            key={label}
          >
            {capitalize ? capitalizeString(label) : label.toString()}
          </StyledTypography>
        ));
      }
      break;
    default:
      if (variant) {
        // eslint-disable-next-line no-console
        console.warn(`TextGrid: Unknown variant=${variant}`);
      }
      break;
  }
  return valueComponent;
}

export default withStyles(styles)(TextGridValue);
