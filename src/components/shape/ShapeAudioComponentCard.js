import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { AudioComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';
import ShapeComponentMetadataEditor from './ShapeComponentMetadataEditor';
import ShapeComponentMenu from './ShapeComponentMenu';

export default function ShapeAudioComponentCard({
  audioComponent = {}, itemId, shapeId, onRefresh, ShapeComponentMenuProps = {},
}) {
  if (audioComponent === undefined) { return null; }
  const { id: componentId, metadata } = audioComponent;
  return (
    <SquareCard id={componentId}>
      <CardHeader
        disableTypography
        title={componentId ? <Typography variant="subtitle1">{`Audio Component - ${componentId}`}</Typography> : 'Audio Component'}
        action={componentId ? (
          <ShapeComponentMenu
            componentId={componentId}
            itemId={itemId}
            shapeId={shapeId}
            {...ShapeComponentMenuProps}
          />
        ) : undefined}
      />
      <CardContent>
        <AudioComponentType
          value={audioComponent}
        />
        <ShapeComponentMetadataEditor
          title="Audio Component Metadata"
          metadata={metadata}
          onRefresh={onRefresh}
          itemId={itemId}
          shapeId={shapeId}
          componentId={componentId}
        />
      </CardContent>
    </SquareCard>
  );
}
