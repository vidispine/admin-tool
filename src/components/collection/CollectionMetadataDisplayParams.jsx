import * as formActions from '../../formactions/collection';
import MetadataDisplayParams from '../metadata/MetadataDisplayParams';

export default function CollectionMetadataDisplayParams({ ...props }) {
  return <MetadataDisplayParams onSubmit={formActions.onGetMetadata} {...props} />;
}
