import TextGrid from '../../ui/TextGrid';
import TypeArray from '../../ui/TypeArray';
import TypeSection from '../../ui/TypeSection';

function JobPoolType({ value = {} }) {
  return (
    <>
      <TextGrid title="priorityThreshold" value={value.priorityThreshold} hover />
      <TextGrid title="size" value={value.size} hover />
    </>
  );
}

function JobPoolListType({ value = {} }) {
  return (
    <>
      <TextGrid title="concurrentJobs" value={value.concurrentJobs} hover />
      <TypeArray value={value.pool} component={JobPoolType} arrayTitle="Pools" dense />
    </>
  );
}

export default function JobPoolDisplay({ jobPoolListDocument }) {
  return <TypeSection value={jobPoolListDocument} component={JobPoolListType} />;
}
