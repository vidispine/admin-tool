export default function getSimpleMetadataVariant(key) {
  if (key.startsWith('transcodeShapeDocument')) return 'xml';
  if (key.startsWith('assetMapShapeDocument')) return 'xml';
  if (key.startsWith('batonTestPlan')) return 'xml';
  if (key.endsWith('transcodePreset')) return 'xml';
  if (key.match(/shapeDocument\d+$/g)) return 'xml';
  if (key.startsWith('imf/essenceDescriptors')) return 'xml';
  if (key.match(/imf_opl_\d+$/g)) return 'xml';
  switch (key) {
    case 'item':
      return 'itemId';
    case 'itemId':
      return 'itemId';
    case 'fileId':
      return 'fileIdList';
    case 'sourceFileId':
      return 'fileId';
    case 'destinationFileId':
      return 'fileId';
    case 'originalFileId':
      return 'fileId';
    case 'fileIds':
      return 'fileIdList';
    case 'username':
      return 'username';
    case 'destinationStorageId':
      return 'storageId';
    case 'sourceStorageId':
      return 'storageId';
    case 'storageId':
      return 'storageId';
    case 'shapeDocument':
      return 'xml';
    case 'result':
      return 'xml';
    case 'jobDocument':
      return 'xml';
    case 'jobStatusDocument':
      return 'xml';
    case 'conformXML':
      return 'xml';
    case 'metadata':
      return 'xml';
    case 'importCompositionPlaylists':
      return 'xml';
    case 'shapeListDocument':
      return 'xml';
    case 'importAssetMap':
      return 'xml';
    case 'importPackingList':
      return 'xml';
    case 'cognitive':
      return 'xml';
    case 'fabricXML':
      return 'xml';
    case 'originalShapeIdsStruct':
      return 'json';
    case 'filePathMap':
      return 'commaseparatedlist';
    case 'sourceUris':
      return 'commaseparatedlist';
    case 'sourceFileIds':
      return 'fileIdList';
    case 'fileItemMapping':
      return 'commaseparatedlist';
    case 'shapeIds':
      return 'commaseparatedlist';
    case 'filenameScript':
      return 'javascript';
    case 'imf_locale':
      return 'xml';
    case 'imf_opl':
      return 'xml';
    default:
      return undefined;
  }
}
