import SquareCard from '../ui/SquareCard';

import {
  ShapeTagContainerDisplay,
  ShapeTagAudioDisplay,
  ShapeTagVideoDisplay,
  ShapeTagThumbnailDisplay,
  ShapeTagAdvancedDisplay,
  ShapeTagOverlayDisplay,
} from './ShapeTagDisplay';
import ShapeTagEditor from './ShapeTagEditor';
import {
  ShapeTagContainerForm,
  ShapeTagAudioForm,
  ShapeTagVideoForm,
  ShapeTagThumbnailForm,
  ShapeTagAdvancedForm,
  ShapeTagOverlayForm,
} from './ShapeTagForm';

export default function ShapeTagCard(props) {
  return (
    <>
      <SquareCard>
        <ShapeTagEditor
          title="Container"
          formComponent={ShapeTagContainerForm}
          displayComponent={ShapeTagContainerDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <ShapeTagEditor
          title="Video"
          formComponent={ShapeTagVideoForm}
          displayComponent={ShapeTagVideoDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <ShapeTagEditor
          title="Audio"
          formComponent={ShapeTagAudioForm}
          displayComponent={ShapeTagAudioDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <ShapeTagEditor
          title="Thumbnail"
          formComponent={ShapeTagThumbnailForm}
          displayComponent={ShapeTagThumbnailDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <ShapeTagEditor
          title="Overlay"
          formComponent={ShapeTagOverlayForm}
          displayComponent={ShapeTagOverlayDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <ShapeTagEditor
          title="Advanced"
          formComponent={ShapeTagAdvancedForm}
          displayComponent={ShapeTagAdvancedDisplay}
          {...props}
        />
      </SquareCard>
    </>
  );
}
