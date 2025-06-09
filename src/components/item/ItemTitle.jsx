import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import TitleHeader from '../ui/TitleHeader';
import Menu, { MenuItem } from '../ui/Menu';
import UnstyledLink from '../ui/UnstyledLink';
import { withModalNoRouter } from '../../hoc/withModal';
import routes from '../../const/routes';

export const ItemHeading = ({ itemId }) => (
  <Grid container alignItems="center">
    <Grid item>
      <Typography variant="h5" color="textSecondary">
        Item
      </Typography>
    </Grid>
    <Grid item>
      <IconButton disabled>
        <ArrowForwardIos />
      </IconButton>
    </Grid>
    <Grid item>
      <Typography
        variant="h5"
        component={Link}
        to={routes.itemList({ itemId })}
        style={{ textDecoration: 'none' }}
      >
        {itemId}
      </Typography>
    </Grid>
  </Grid>
);

function ItemTitle({
  itemId,
  onOpen,
  removeModal,
  transcodeModal,
  relationModal,
  thumbnailModal,
  posterModal,
  exportModal,
  exportImpModal,
  addToCollectionModal,
  startJobModal,
  title,
  createModal,
  createTooltip = 'New',
  removeAllShapesModal,
  importImpModal,
  breadcrumbList,
  createShapeModal,
  createSequenceModal,
  analyzeModal,
  ...props
}) {
  return (
    <TitleHeader
      grandParentTitle="Item"
      grandParentTo={routes.itemList()}
      parentTitle={itemId}
      title={title}
      helpTo="/ref/item/item.html"
      entityId={itemId}
      entityType="item"
      removeModal={removeModal}
      breadcrumbList={
        Array.isArray(breadcrumbList)
          ? [
            { title: 'Item', to: routes.itemList() },
            { title: itemId, to: routes.item({ itemId }) },
            ...breadcrumbList,
          ]
          : undefined
      }
      actionComponent={(
        <>
          {createModal && (
            <Tooltip title={createTooltip}>
              <IconButton onClick={() => onOpen({ modalName: createModal })}>
                <PlaylistAdd />
              </IconButton>
            </Tooltip>
          )}
          <Menu>
            <MenuItem>
              <UnstyledLink to={`/import/item/component/?itemId=${itemId}`}>
                <Typography>Import Component</Typography>
              </UnstyledLink>
            </MenuItem>
            <MenuItem>
              <UnstyledLink to={`/import/item/shape/?itemId=${itemId}`}>
                <Typography>Import Shape</Typography>
              </UnstyledLink>
            </MenuItem>
            <UnstyledLink to={`/import/sidecar/?itemId=${itemId}`}>
              <MenuItem>
                <Typography color="inherit">Import Sidecar</Typography>
              </MenuItem>
            </UnstyledLink>
            <UnstyledLink to={`/import/sidecar/upload/?itemId=${itemId}`}>
              <MenuItem>
                <Typography color="inherit">Upload Sidecar</Typography>
              </MenuItem>
            </UnstyledLink>
            {importImpModal ? (
              <MenuItem onClick={() => onOpen({ modalName: importImpModal })}>
                <Typography color="inherit">Import IMF Package</Typography>
              </MenuItem>
            ) : null}
            {createShapeModal ? (
              <MenuItem onClick={() => onOpen({ modalName: createShapeModal })}>
                <Typography color="inherit">Create Shape</Typography>
              </MenuItem>
            ) : null}
            <UnstyledLink
              to={`/import/item/shape/placeholder/?itemId=${itemId}`}
            >
              <MenuItem>
                <Typography color="inherit">
                  Create Shape Placeholder
                </Typography>
              </MenuItem>
            </UnstyledLink>
            <MenuItem
              onClick={() => onOpen({ modalName: addToCollectionModal })}
            >
              <Typography>Add To Collection</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: relationModal })}>
              <Typography>Add Relation</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: startJobModal })}>
              <Typography>Start Job</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: analyzeModal })}>
              <Typography>Analyze</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: transcodeModal })}>
              <Typography>Transcode</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: thumbnailModal })}>
              <Typography>Create Thumbnail</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: posterModal })}>
              <Typography>Create Poster</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => onOpen({ modalName: createSequenceModal })}
            >
              <Typography>Create Sequence</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: exportModal })}>
              <Typography>Export</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: exportImpModal })}>
              <Typography>Export IMF Package</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: removeModal })}>
              <Typography color="secondary">Delete Item</Typography>
            </MenuItem>
            {removeAllShapesModal ? (
              <MenuItem
                onClick={() => onOpen({ modalName: removeAllShapesModal })}
              >
                <Typography color="secondary">Delete All Shapes</Typography>
              </MenuItem>
            ) : null}
          </Menu>
        </>
      )}
      {...props}
    />
  );
}

export default withModalNoRouter(ItemTitle);
