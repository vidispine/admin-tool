import * as formActions from '../../formactions/collection';
import MetadataEditor from '../metadata/MetadataEditor';

export default function CollectionMetadataEditor({ ...props }) {
  return <MetadataEditor onSubmit={formActions.onUpdateMetadata} {...props} />;
}
