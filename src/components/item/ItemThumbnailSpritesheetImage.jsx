import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';

const spritesheetPathToUrl = ({ thumbnailSpriteSheetDocument, baseUrl }) => {
  let imgUrl = thumbnailSpriteSheetDocument?.url?.[0];
  if (imgUrl === undefined) return undefined;
  imgUrl = imgUrl.replaceAll('/API/', '/APInoauth/');
  if (baseUrl) {
    const url = new URL(imgUrl);
    imgUrl = [baseUrl, url.pathname, url.search].join('');
  }
  return imgUrl;
};

function ItemThumbnailSpritesheetImage({
  thumbnailSpriteSheetDocument,
  baseUrl,
}) {
  const [width, setWidth] = React.useState('100%');
  const onClick = () => setWidth((prevWidth) => (prevWidth === '100%' ? 'auto' : '100%'));
  const imgSrc = spritesheetPathToUrl({
    thumbnailSpriteSheetDocument,
    baseUrl,
  });
  if (imgSrc === undefined) return null;
  return (
    <ButtonBase onClick={onClick} disableRipple>
      <img alt={imgSrc} src={imgSrc} style={{ width }} />
    </ButtonBase>
  );
}

export default ItemThumbnailSpritesheetImage;
