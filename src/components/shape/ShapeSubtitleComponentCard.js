import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { SubtitleComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';
import ShapeComponentMetadataEditor from './ShapeComponentMetadataEditor';

export default function ShapeSubtitleComponentCard({
  subtitleComponent = {}, itemId, shapeId, onRefresh,
}) {
  if (subtitleComponent === undefined) { return null; }
  const { id: subtitleComponentId, metadata } = subtitleComponent;
  return (
    <SquareCard id={subtitleComponentId}>
      <CardHeader
        disableTypography
        title={subtitleComponentId ? <Typography variant="subtitle1">{`Subtitle Component - ${subtitleComponentId}`}</Typography> : 'Subtitle Component'}
      />
      <CardContent>
        <SubtitleComponentType
          value={subtitleComponent}
        />
        <ShapeComponentMetadataEditor
          title="Subtitle Component Metadata"
          metadata={metadata}
          onRefresh={onRefresh}
          itemId={itemId}
          shapeId={shapeId}
          componentId={subtitleComponentId}
        />

      </CardContent>
    </SquareCard>
  );
}
