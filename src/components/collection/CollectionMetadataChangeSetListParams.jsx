import * as formActions from '../../formactions/collection';
import MetadataChangeSetListParams from '../metadata/MetadataChangeSetListParams';

export default function CollectionMetadataChangeSetListParams({ ...props }) {
  return (
    <MetadataChangeSetListParams onSubmit={formActions.onListEntityMetadataChange} {...props} />
  );
}
