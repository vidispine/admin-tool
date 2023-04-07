import React from 'react';

import SimpleMetadataEditor from '../ui/SimpleMetadataEditor';

export default function StorageMethodMetadataEditor({
  storageMethodDocument,
  storageMethodId,
  storageId,
  onRefresh,
  ...props
}) {
  const storageMethodType = storageMethodDocument?.method?.[0];
  const entityType = `storage/${storageId}/method`;
  return (
    <SimpleMetadataEditor
      entityType={entityType}
      entityId={storageMethodId}
      simpleMetadataDocument={storageMethodType.metadata}
      onSuccess={onRefresh}
      {...props}
    />
  );
}
