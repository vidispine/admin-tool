import * as formActions from '../../formactions/item';
import MetadataEditor from '../metadata/MetadataEditor';

export default function ItemMetadataListEditor({ metadataListDocument, ...props }) {
  if (metadataListDocument === undefined) {
    return null;
  }
  const { item: itemList = [] } = metadataListDocument;
  if (itemList.length !== 1) {
    return null;
  }
  const thisItem = itemList[0] || {};
  const { metadata: metadataDocument = {} } = thisItem;
  return (
    <MetadataEditor
      onSubmit={formActions.onUpdateMetadata}
      metadataDocument={metadataDocument}
      {...props}
    />
  );
}
