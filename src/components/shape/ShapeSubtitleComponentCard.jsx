import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import SquareCard from '../ui/SquareCard';

import ShapeComponentMenu from './ShapeComponentMenu';
import ShapeComponentMetadataEditor from './ShapeComponentMetadataEditor';
import { SubtitleComponentType } from './ShapeDisplay';

export default function ShapeSubtitleComponentCard({
  subtitleComponent = {},
  itemId,
  shapeId,
  onRefresh,
  ShapeComponentMenuProps = {},
}) {
  if (subtitleComponent === undefined) {
    return null;
  }
  const { id: componentId, metadata } = subtitleComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={
          componentId ? (
            <Typography variant="subtitle1">{`Subtitle Component - ${componentId}`}</Typography>
          ) : (
            'Subtitle Component'
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
        <SubtitleComponentType value={subtitleComponent} />
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
