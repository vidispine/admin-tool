import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withRouter } from 'react-router-dom';

import PlaceholderThumbnail from '../ui/PlaceholderThumbnail';
import SquareCard from '../ui/SquareCard';

function ItemGridListTile({ itemType = {}, history }) {
  const { thumbnails = {}, id: itemId } = itemType;
  const { uri: uriList = [] } = thumbnails;
  const [thumbnailUri] = uriList;
  const onClick = history ? () => history.push(`/item/${itemId}/`) : undefined;
  return (
    <GridListTile style={{ padding: '10px', minWidth: '350px' }} onClick={onClick}>
      {thumbnailUri ? (
        <img src={thumbnailUri} alt={thumbnailUri} />
      ) : (
        <SquareCard>
          <PlaceholderThumbnail />
        </SquareCard>
      )}
      <GridListTileBar title={itemId} />
    </GridListTile>
  );
}

export default withRouter(ItemGridListTile);
