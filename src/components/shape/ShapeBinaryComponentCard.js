import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { BinaryComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';
import ShapeComponentMetadataEditor from './ShapeComponentMetadataEditor';
import ShapeComponentMenu from './ShapeComponentMenu';

export default function ShapeBinaryComponentCard({
  binaryComponent = {}, itemId, shapeId, onRefresh, ShapeComponentMenuProps = {},
}) {
  if (binaryComponent === undefined) { return null; }
  const { id: componentId, metadata } = binaryComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={componentId ? <Typography variant="subtitle1">{`Binary Component - ${componentId}`}</Typography> : 'Binary Component'}
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
        <BinaryComponentType
          value={binaryComponent}
        />
        <ShapeComponentMetadataEditor
          title="Binary Component Metadata"
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
