import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';

function ReindexRequestType({ value = {} }) {
  return (
    <>
      <TextGrid title="index" value={value.index} hover />
      <TextGrid title="priority" value={value.priority} hover />
      <TextGrid title="status" value={value.status} hover />
      <TextGrid title="start" value={value.start} variant="timestamp" hover />
      <TextGrid title="finish" value={value.finish} variant="timestamp" hover />
      <TextGrid title="indexesDone" value={value.indexesDone} hover />
      <TextGrid title="indexesTotal" value={value.indexesTotal} hover />
    </>
  );
}

export default function ReindexDisplay({ reindexRequestDocument }) {
  return <TypeSection value={reindexRequestDocument} component={ReindexRequestType} />;
}
