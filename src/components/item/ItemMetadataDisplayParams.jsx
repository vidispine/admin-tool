import * as formActions from '../../formactions/item';
import MetadataDisplayParams from '../metadata/MetadataDisplayParams';

export default function ItemMetadataDisplayParams({ ...props }) {
  return <MetadataDisplayParams onSubmit={formActions.onGetMetadata} {...props} />;
}
