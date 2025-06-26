import GridListTileBar from '@material-ui/core/GridListTileBar';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

import ItemThumbnailMenu from './ItemThumbnailMenu';

export default function ItemPosterGrid({ uriListDocument }) {
  if (uriListDocument === undefined) {
    return null;
  }
  const { uri: uriList = [] } = uriListDocument;
  const splitUri = (thisUri) => {
    let [output] = thisUri.split('?');
    [, output] = output.split(';');
    return output;
  };
  return (
    <ImageList rowHeight="auto" cols={1}>
      {uriList.map((thisUri) => (
        <ImageListItem key={thisUri}>
          <img src={thisUri} alt={thisUri} />
          <GridListTileBar
            title={splitUri(thisUri)}
            actionIcon={<ItemThumbnailMenu uri={thisUri} />}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
