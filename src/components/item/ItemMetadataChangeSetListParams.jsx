import * as formActions from '../../formactions/item';
import MetadataChangeSetListParams from '../metadata/MetadataChangeSetListParams';

export default function ItemMetadataChangeSetListParams({ ...props }) {
  return (
    <MetadataChangeSetListParams onSubmit={formActions.onListEntityMetadataChange} {...props} />
  );
}
