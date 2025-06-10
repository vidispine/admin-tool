import bytesToSize from '../../utils/bytesToSize';
import TextGrid from '../ui/TextGrid';

export default function StorageGroupStorageDisplay({ storageDocument }) {
  const { freeCapacity, capacity } = storageDocument;
  const capacityAvailable = Math.round((freeCapacity / capacity) * 100);
  return (
    <>
      <TextGrid title="Type" value={storageDocument.type} />
      <TextGrid title="State" value={storageDocument.state} />
      <TextGrid
        title="Capacity"
        value={`${bytesToSize(storageDocument.capacity)} (${capacityAvailable}% Available)`}
      />
    </>
  );
}
