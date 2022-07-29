export default function getSimpleMetadataVariant(key) {
  if (key.startsWith('imf/essenceDescriptors')) return 'xml';
  switch (key) {
    case 'item':
      return 'itemId';
    case 'imf_locale':
      return 'xml';
    case 'imf_opl':
      return 'xml';
    default:
      return undefined;
  }
}
