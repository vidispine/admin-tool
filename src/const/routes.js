import { generatePath } from 'react-router-dom';

const itemParams = new URLSearchParams({
  content: 'metadata',
  field: ['title', 'originalFilename'],
  terse: true,
});

export default {
  itemList: (params) => generatePath(`/item/?${itemParams.toString()}`, params),
  item: (params) => generatePath('/item/:itemId', params),
  shapeList: (params) => generatePath('/item/:itemId/shape/', params),
  shape: (params) => generatePath('/item/:itemId/shape/:shapeId', params),
  componentList: (params) => generatePath('/item/:itemId/shape/:shapeId/component/', params),
  component: (params) =>
    generatePath('/item/:itemId/shape/:shapeId/component/:componentId/', params),
  itemVersionList: (params) => generatePath('/item/:itemId/version/', params),
  itemBulkyMetadataList: (params) => generatePath('/item/:itemId/bulky-metadata/', params),
  itemSequenceList: (params) => generatePath('/item/:itemId/sequence/', params),
  itemSequence: (params) => generatePath('/item/:itemId/sequence/:format/', params),
  fileList: (params) => generatePath('/file/', params),
  file: (params) => generatePath('/file/:fileId', params),
  storageList: (params) => generatePath('/storage/', params),
  storage: (params) => generatePath('/storage/:storageId', params),
  storageFile: (params) => generatePath('/storage/:storageId/file/', params),
  secretList: (params) => generatePath('/secret/', params),
  secret: (params) => generatePath('/secret/:alias', params),
};
