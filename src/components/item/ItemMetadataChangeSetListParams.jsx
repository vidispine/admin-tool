import React from 'react';
import MetadataChangeSetListParams from '../metadata/MetadataChangeSetListParams';
import * as formActions from '../../formactions/item';

export default function ItemMetadataChangeSetListParams({ ...props }) {
  return (
    <MetadataChangeSetListParams
      onSubmit={formActions.onListEntityMetadataChange}
      {...props}
    />
  );
}
