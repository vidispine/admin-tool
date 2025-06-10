import * as formActions from '../../formactions/item';
import MetadataEditor from '../metadata/MetadataEditor';

export default function ItemMetadataEditor({ metadataDocument, ...props }) {
  return (
    <MetadataEditor
      title="Item Metadata"
      onSubmit={formActions.onUpdateMetadata}
      metadataDocument={metadataDocument}
      {...props}
    />
  );
}
