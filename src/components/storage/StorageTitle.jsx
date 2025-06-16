import { withModalNoRouter } from '../../hoc/withModal';
import TitleHeader from '../ui/TitleHeader';

import StorageStatus from './StorageStatus';

function StorageTitle({ onOpen, storageId, removeModal, code, title, ...props }) {
  return (
    <TitleHeader
      removeModal={removeModal}
      title={title}
      parentTitle={storageId}
      grandParentTitle="Storage"
      grandParentTo="/storage/"
      helpTo="/ref/storage/storage.html"
      entityId={storageId}
      entityType="storage"
      code={code}
      iconList={<StorageStatus storageDocument={code} />}
      {...props}
    />
  );
}

export default withModalNoRouter(StorageTitle);
