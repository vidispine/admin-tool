import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import SquareCard from '../ui/SquareCard';

import ShapeComponentMenu from './ShapeComponentMenu';
import ShapeComponentMetadataEditor from './ShapeComponentMetadataEditor';
import { ContainerComponentType } from './ShapeDisplay';

export default function ShapeContainerComponentCard({
  shapeDocument = {},
  itemId,
  shapeId,
  onRefresh,
  ShapeComponentMenuProps = {},
}) {
  const { containerComponent } = shapeDocument;
  if (containerComponent === undefined) {
    return null;
  }
  const { id: componentId, metadata } = containerComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={
          componentId ? (
            <Typography variant="subtitle1">{`Container Component - ${componentId}`}</Typography>
          ) : (
            'Container Component'
          )
        }
        action={
          componentId ? (
            <ShapeComponentMenu
              componentId={componentId}
              itemId={itemId}
              shapeId={shapeId}
              {...ShapeComponentMenuProps}
            />
          ) : undefined
        }
      />
      <CardContent>
        <ContainerComponentType value={containerComponent} />
        <ShapeComponentMetadataEditor
          title="Container Component Metadata"
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
