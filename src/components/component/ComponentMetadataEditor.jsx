import SimpleMetadataEditor from '../ui/SimpleMetadataEditor';

export default function ComponentMetadataEditor({
  metadata, componentId, itemId, shapeId, onRefresh, ...props
}) {
  const entityId = itemId !== undefined || shapeId !== undefined || componentId !== undefined ? `${itemId}/shape/${shapeId}/component/${componentId}` : undefined;
  return (
    <SimpleMetadataEditor
      simpleMetadataDocument={{ field: metadata }}
      titleProps={{ variant: 'subtitle2' }}
      onSuccess={onRefresh}
      entityType="item"
      entityId={entityId}
      {...props}
    />
  );
}
