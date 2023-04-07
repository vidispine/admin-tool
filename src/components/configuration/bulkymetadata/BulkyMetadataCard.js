import React from 'react';

import SquareCard from '../../ui/SquareCard';
import BulkyMetadataEditor from './BulkyMetadataEditor';

export default function BulkyMetadataCard(props) {
  return (
    <SquareCard>
      <BulkyMetadataEditor
        {...props}
      />
    </SquareCard>
  );
}
