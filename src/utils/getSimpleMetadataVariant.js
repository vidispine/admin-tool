export default function getSimpleMetadataVariant(key) {
  if (key.startsWith('imf/essenceDescriptors')) return 'xml';
  switch (key) {
    case 'item':
      return 'itemId';
    default:
      return undefined;
  }
}
