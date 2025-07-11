import SimpleMetadataGrid from '../ui/SimpleMetadataGrid';
import SquareCard from '../ui/SquareCard';

import StorageGroupStorageCard from './StorageGroupStorageCard';

export default function StorageGroupCard({ groupName, storageGroupDocument, onRefresh }) {
  const { data: simpleMetadataList, storage: storageList = [] } = storageGroupDocument;
  return (
    <>
      {storageList.map((storageDocument) => (
        <StorageGroupStorageCard
          key={storageDocument.id}
          storageId={storageDocument.id}
          groupName={groupName}
          storageDocument={storageDocument}
          onRefresh={onRefresh}
        />
      ))}
      <SquareCard>
        <SimpleMetadataGrid
          simpleMetadataList={simpleMetadataList}
          entityType="storage/storage-group"
          entityId={groupName}
          onSuccess={onRefresh}
          editable
        />
      </SquareCard>
    </>
  );
}
