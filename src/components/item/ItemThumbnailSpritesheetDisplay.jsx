import TextGrid from '../ui/TextGrid';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

function ComplexType({ value = {} }) {
  return (
    <>
      <TextGrid title="width" value={value.width} hover />
      <TextGrid title="height" value={value.height} hover />
      <TextGrid title="x" value={value.x} hover />
      <TextGrid title="y" value={value.y} hover />
      <TextGrid title="timecode" value={value.timecode} variant="timecode" hover />
      <TextGrid title="endTimecode" value={value.endTimecode} variant="timecode" hover />
    </>
  );
}
function ThumbnailSpriteSheetType({ value = {} }) {
  return (
    <>
      <TextGrid title="etag" value={value.etag} hover />
      <TextGrid title="url" value={value.url} hover variant="row" />
      <TextGrid title="path" value={value.path} hover variant="row" />
      <TypeArray
        arrayTitle="Thumbnail"
        title="thumbnail"
        value={value.thumbnail}
        component={ComplexType}
      />
    </>
  );
}

function ItemThumbnailSpritesheetDisplay({ thumbnailSpriteSheetDocument }) {
  return <TypeSection component={ThumbnailSpriteSheetType} value={thumbnailSpriteSheetDocument} />;
}

export default ItemThumbnailSpritesheetDisplay;
