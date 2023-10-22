const parseThumbnailUri = (uri) => {
  if (uri === undefined) return {};
  const { pathname } = new URL(uri);
  const [, , thumbnailOrPoster, resourceId, itemId, time] = pathname.split('/');
  const isPoster = thumbnailOrPoster === 'poster';
  return {
    resourceId,
    itemId,
    time,
    isPoster,
  };
};

export default parseThumbnailUri;
