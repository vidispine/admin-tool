import ImgExpandButton from '../ui/ImgExpandButton';

const spritesheetPathToUrl = ({ thumbnailSpriteSheetDocument, baseURL }) => {
  let imgUrl = thumbnailSpriteSheetDocument?.url?.[0];
  if (imgUrl === undefined) return undefined;
  imgUrl = imgUrl.replaceAll('/API/', '/APInoauth/');
  if (baseURL) {
    const url = new URL(imgUrl);
    imgUrl = [baseURL, url.pathname, url.search].join('');
  }
  return imgUrl;
};

function ItemThumbnailSpritesheetImage({ thumbnailSpriteSheetDocument, baseURL }) {
  const imgSrc = spritesheetPathToUrl({
    thumbnailSpriteSheetDocument,
    baseURL,
  });
  if (imgSrc === undefined) return null;
  return <ImgExpandButton src={imgSrc} />;
}

export default ItemThumbnailSpritesheetImage;
