import CardList from '../ui/CardList';

import ShapeAudioComponentList from './ShapeAudioComponentList';
import ShapeBinaryComponentList from './ShapeBinaryComponentList';
import ShapeCard from './ShapeCard';
import ShapeContainerComponentCard from './ShapeContainerComponentCard';
import ShapeDescriptorComponentList from './ShapeDescriptorComponentList';
import ShapeSubtitleComponentList from './ShapeSubtitleComponentList';
import ShapeVideoComponentList from './ShapeVideoComponentList';

export default function ShapeOverview(props) {
  const { shapeDocument } = props;
  if (shapeDocument === undefined) {
    return null;
  }
  return (
    <CardList>
      <ShapeCard {...props} />
      <ShapeContainerComponentCard {...props} />
      <ShapeVideoComponentList {...props} />
      <ShapeAudioComponentList {...props} />
      <ShapeBinaryComponentList {...props} />
      <ShapeDescriptorComponentList {...props} />
      <ShapeSubtitleComponentList {...props} />
    </CardList>
  );
}
