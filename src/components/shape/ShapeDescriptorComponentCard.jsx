import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { DescriptorComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';
import ShapeComponentMetadataEditor from './ShapeComponentMetadataEditor';
import ShapeComponentMenu from './ShapeComponentMenu';

export default function ShapeDescriptorComponentCard({
  descriptorComponent = {}, itemId, shapeId, onRefresh, ShapeComponentMenuProps = {},
}) {
  if (descriptorComponent === undefined) { return null; }
  const { id: componentId, metadata } = descriptorComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={componentId ? <Typography variant="subtitle1">{`Descriptor Component - ${componentId}`}</Typography> : 'Descriptor Component'}
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
        <DescriptorComponentType
          value={descriptorComponent}
        />
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
