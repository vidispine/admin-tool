import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import SquareCard from '../ui/SquareCard';

import ShapeComponentMenu from './ShapeComponentMenu';
import ShapeComponentMetadataEditor from './ShapeComponentMetadataEditor';
import { DescriptorComponentType } from './ShapeDisplay';

export default function ShapeDescriptorComponentCard({
  descriptorComponent = {},
  itemId,
  shapeId,
  onRefresh,
  ShapeComponentMenuProps = {},
}) {
  if (descriptorComponent === undefined) {
    return null;
  }
  const { id: componentId, metadata } = descriptorComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={
          componentId ? (
            <Typography variant="subtitle1">{`Descriptor Component - ${componentId}`}</Typography>
          ) : (
            'Descriptor Component'
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
        <DescriptorComponentType value={descriptorComponent} />
        <ShapeComponentMetadataEditor
          title="Descriptor Component Metadata"
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
