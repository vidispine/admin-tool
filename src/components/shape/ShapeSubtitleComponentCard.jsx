import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { SubtitleComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';
import ShapeComponentMetadataEditor from './ShapeComponentMetadataEditor';
import ShapeComponentMenu from './ShapeComponentMenu';

export default function ShapeSubtitleComponentCard({
  subtitleComponent = {}, itemId, shapeId, onRefresh, ShapeComponentMenuProps = {},
}) {
  if (subtitleComponent === undefined) { return null; }
  const { id: componentId, metadata } = subtitleComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={componentId ? <Typography variant="subtitle1">{`Subtitle Component - ${componentId}`}</Typography> : 'Subtitle Component'}
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
        <SubtitleComponentType
          value={subtitleComponent}
        />
        <ShapeComponentMetadataEditor
          title="Subtitle Component Metadata"
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
