import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

import routes from '../../const/routes';
import { withModalNoRouter } from '../../hoc/withModal';
import Menu, { MenuItem } from '../ui/Menu';
import TitleHeader from '../ui/TitleHeader';

export function ShapeHeading({ shapeId, title }) {
  return (
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
        <Typography variant="h5">{shapeId}</Typography>
      </Grid>
      {title && (
        <>
          <Grid item>
            <IconButton disabled>
              <ArrowForwardIos />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h5">{title}</Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}

function ShapeTitle({
  title,
  itemId,
  shapeId,
  onOpen,
  transcodeModal,
  removeModal,
  addTagModal,
  removeTagModal,
  addMimeTypeModal,
  removeMimeTypeModal,
  analyzeTagModal,
  addComponentModal,
  exportModal,
  exportImpModal,
  deductionModal,
  placeholderUpdateModal,
  createShapeModal,
  createPlaceholderComponentModal,
  breadcrumbList = [],
  ...props
}) {
  return (
    <TitleHeader
      breadcrumbList={
        Array.isArray(breadcrumbList)
          ? [
              { title: 'Item', to: routes.itemList() },
              { title: itemId, to: routes.item({ itemId }) },
              { title: 'Shape', to: routes.shapeList({ itemId }) },
              { title: shapeId, to: routes.shape({ itemId, shapeId }) },
              ...breadcrumbList,
            ]
          : undefined
      }
      actionComponent={
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
            <Typography>Import Component</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: addTagModal })}>
            <Typography>Add Tag</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: addMimeTypeModal })}>
            <Typography>Add Mime-Type</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: placeholderUpdateModal })}>
            <Typography>Update Placeholder</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: exportModal })}>
            <Typography>Export</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: exportImpModal })}>
            <Typography>Export IMF Package</Typography>
          </MenuItem>
          {createPlaceholderComponentModal ? (
            <MenuItem onClick={() => onOpen({ modalName: createPlaceholderComponentModal })}>
              <Typography>Create Placeholder Component</Typography>
            </MenuItem>
          ) : null}
          {createShapeModal ? (
            <MenuItem onClick={() => onOpen({ modalName: createShapeModal })}>
              <Typography>Create Shape</Typography>
            </MenuItem>
          ) : null}
          <MenuItem onClick={() => onOpen({ modalName: removeTagModal })}>
            <Typography color="secondary">Remove Tag</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: MimeType })}>
            <Typography color="secondary">Remove Mime-Type</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: removeModal })}>
            <Typography color="secondary">Delete</Typography>
          </MenuItem>
        </Menu>
      }
      {...props}
    />
  );
}

export default withModalNoRouter(ShapeTitle);
