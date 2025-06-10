import { SimpleMetadataType } from '../ui/SimpleMetadataDisplay';
import TextGrid from '../ui/TextGrid';
import TextGridArray from '../ui/TextGridArray';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

function FileItemShapeComponent({ value, itemId, shapeId }) {
  return (
    <TextGrid
      title="component"
      value={value?.id}
      hideNoValue
      variant="componentId"
      variantProps={{ itemId, shapeId }}
    />
  );
}

function FileItemShape({ itemId, value }) {
  return (
    <>
      <TextGrid title="shape" variant="shapeId" value={value?.id} variantProps={{ itemId }} />
      <TypeArray
        value={value?.component}
        itemId={itemId}
        shapeId={value?.id}
        component={FileItemShapeComponent}
        hideNoValue
      />
    </>
  );
}

function FileItem({ value }) {
  return (
    <>
      <TextGrid title="item" value={value?.id} variant="itemId" />
      <TypeArray value={value?.shape} component={FileItemShape} itemId={value?.id} hideNoValue />
    </>
  );
}

function FileRange({ value }) {
  return (
    <>
      <TextGrid title="start" value={value?.start} />
      <TextGrid title="count" value={value?.count} />
    </>
  );
}

function BasicSection({ value = {} }) {
  return (
    <>
      <TextGrid title="id" value={value.id} hover />
      <TextGrid title="path" value={value.path} hideNoValue hover />
      <TextGridArray title="uri" value={value.uri} hideNoValue hover />
      <TextGrid title="state" value={value.state} hideNoValue hover />
      <TextGrid title="size" value={value.size} variant="bytes" hideNoValue hover />
      <TextGrid title="hash" value={value.hash} hideNoValue hover />
      <TextGrid title="timestamp" value={value.timestamp} variant="timestamp" hideNoValue hover />
      <TextGrid title="refreshFlag" value={value.refreshFlag} hideNoValue hover />
      <TextGrid title="sequence" value={value.sequence} hideNoValue hover />
      <TextGrid title="storage" value={value.storage} variant="storageId" hideNoValue hover />
      <TypeArray value={value.item} component={FileItem} hideNoValue hover dense />
      <TypeArray title="range" value={value.range} component={FileRange} hideNoValue hover />
      <TextGrid title="type" value={value.type} hideNoValue hover />
    </>
  );
}

function FileType({ value = {} }) {
  return (
    <>
      <TypeSection component={BasicSection} value={value} />
      <TypeSection
        title="metadata"
        value={value.metadata}
        component={SimpleMetadataType}
        hideNoValue
      />
    </>
  );
}

export function FileBasicDisplay({ fileDocument }) {
  return <TypeSection component={BasicSection} value={fileDocument} />;
}

export default function FileDisplay({ fileDocument }) {
  return <TypeSection component={FileType} value={fileDocument} />;
}
