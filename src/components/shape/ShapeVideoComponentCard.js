import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { VideoComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';
import ShapeComponentMetadataEditor from './ShapeComponentMetadataEditor';
import ShapeComponentMenu from './ShapeComponentMenu';

export default function ShapeVideoComponentCard({
  videoComponent = {}, itemId, shapeId, onRefresh, ShapeComponentMenuProps = {},
}) {
  if (videoComponent === undefined) { return null; }
  const { id: componentId, metadata } = videoComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={componentId ? <Typography variant="subtitle1">{`Video Component - ${componentId}`}</Typography> : 'Video Component'}
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
        <VideoComponentType
          value={videoComponent}
        />
        <ShapeComponentMetadataEditor
          title="Video Component Metadata"
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
