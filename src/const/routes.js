import { generatePath } from 'react-router-dom';

const itemParams = new URLSearchParams({
  content: 'metadata',
  field: ['title', 'originalFilename'],
  terse: true,
});

export default {
  itemList: (params) => generatePath(`/item/?${itemParams.toString()}`, params),
  item: (params) => generatePath('/item/:itemId', params),
  itemVersionList: (params) => generatePath('/item/:itemId/version/', params),
  itemBulkyMetadataList: (params) => generatePath('/item/:itemId/bulky-metadata/', params),
  fileList: (params) => generatePath('/file/', params),
  file: (params) => generatePath('/file/:fileId', params),
};
