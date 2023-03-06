import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TitleHeader from '../ui/TitleHeader';
import Menu, { MenuItem } from '../ui/Menu';
import { withModalNoRouter } from '../../hoc/withModal';
import routes from '../../const/routes';

export const ShapeHeading = ({ shapeId, title }) => (
  <Grid container alignItems="center">
    <Grid item>
      <Typography variant="h5" color="textSecondary">
        Shape
      </Typography>
    </Grid>
    <Grid item>
      <IconButton disabled>
        <ArrowForwardIos />
      </IconButton>
    </Grid>
    <Grid item>
      <Typography variant="h5">
        {shapeId}
      </Typography>
    </Grid>
    {title && (
      <>
        <Grid item>
          <IconButton disabled>
            <ArrowForwardIos />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h5">
            {title}
          </Typography>
        </Grid>
      </>
    )}
  </Grid>
);

function ShapeTitle({
  title,
  itemId,
  shapeId,
  onOpen,
  transcodeModal,
  removeModal,
  addTagModal,
  removeTagModal,
  analyzeTagModal,
  addComponentModal,
  exportModal,
  exportImpModal,
  deductionModal,
  placeholderUpdateModal,
  breadcrumbList = [],
  ...props
}) {
  return (
    <TitleHeader
      breadcrumbList={Array.isArray(breadcrumbList) ? [
        { title: 'Item', to: routes.itemList() },
        { title: itemId, to: routes.item({ itemId }) },
        { title: 'Shape', to: routes.shapeList({ itemId }) },
        { title: shapeId, to: routes.shape({ itemId, shapeId }) },
        ...breadcrumbList]
        : undefined}
      actionComponent={(
        <Menu>
          <MenuItem onClick={() => onOpen({ modalName: transcodeModal })}>
            <Typography>Transcode</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: deductionModal })}>
            <Typography>Deduction Update</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: analyzeTagModal })}>
            <Typography>Analyze</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: addComponentModal })}>
            <Typography>Add Component</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: addTagModal })}>
            <Typography>Add Tag</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: placeholderUpdateModal })}>
            <Typography>Placeholder Update</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: exportImpModal })}>
            <Typography>Export</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: exportImpModal })}>
            <Typography>Export IMF Package</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: removeTagModal })}>
            <Typography color="secondary">Remove Tag</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: removeModal })}>
            <Typography color="secondary">Delete</Typography>
          </MenuItem>
        </Menu>
      )}
      {...props}
    />
  );
}

export default withModalNoRouter(ShapeTitle);
