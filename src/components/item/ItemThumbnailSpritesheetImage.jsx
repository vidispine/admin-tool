import ImgExpandButton from '../ui/ImgExpandButton';

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
  const imgSrc = spritesheetPathToUrl({
    thumbnailSpriteSheetDocument,
    baseUrl,
  });
  if (imgSrc === undefined) return null;
  return (
    <ImgExpandButton src={imgSrc} />
  );
}

export default ItemThumbnailSpritesheetImage;
