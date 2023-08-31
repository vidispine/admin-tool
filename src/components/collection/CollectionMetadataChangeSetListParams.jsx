import React from 'react';
import MetadataChangeSetListParams from '../metadata/MetadataChangeSetListParams';
import * as formActions from '../../formactions/collection';

export default function CollectionMetadataChangeSetListParams({ ...props }) {
  return (
    <MetadataChangeSetListParams
      onSubmit={formActions.onListEntityMetadataChange}
      {...props}
    />
  );
}
