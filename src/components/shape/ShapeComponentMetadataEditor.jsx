import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import SimpleMetadataEditor from '../ui/SimpleMetadataEditor';

const styles = (theme) => ({
  CardHeader: {
    paddingTop: 0,
    paddingLeft: 0,
  },
  CardContent: {
    padding: theme.spacing(1),
  },
});

function ShapeComponentMetadataEditor({
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
export default withStyles(styles)(ShapeComponentMetadataEditor);
