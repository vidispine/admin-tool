import ShapeAudioComponentList from '../shape/ShapeAudioComponentList';
import ShapeBinaryComponentList from '../shape/ShapeBinaryComponentList';
import ShapeContainerComponentCard from '../shape/ShapeContainerComponentCard';
import ShapeDescriptorComponentList from '../shape/ShapeDescriptorComponentList';
import ShapeSubtitleComponentList from '../shape/ShapeSubtitleComponentList';
import ShapeVideoComponentList from '../shape/ShapeVideoComponentList';
import CardList from '../ui/CardList';

export default function FileShapeOverview(props) {
  const { shapeDocument } = props;
  if (shapeDocument === undefined) {
    return null;
  }
  return (
    <CardList>
      <ShapeContainerComponentCard {...props} />
      <ShapeVideoComponentList {...props} />
      <ShapeAudioComponentList {...props} />
      <ShapeBinaryComponentList {...props} />
      <ShapeDescriptorComponentList {...props} />
      <ShapeSubtitleComponentList {...props} />
    </CardList>
  );
}
