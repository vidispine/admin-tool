import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import SquareCard from '../ui/SquareCard';
import ComponentMetadataEditor from './ComponentMetadataEditor';
import FileTypeTable from '../file/FileTypeTable';

export default function ComponentCard({
  componentDocument,
  itemId,
  shapeId,
  componentId,
  onRefresh,
}) {
  if (componentDocument === undefined) { return null; }
  const { metadata, file } = componentDocument;
  return (
    <SquareCard>
      <CardContent>
        <FileTypeTable
          title="Files"
          value={file}
        />
        <ComponentMetadataEditor
          title="Metadata"
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
