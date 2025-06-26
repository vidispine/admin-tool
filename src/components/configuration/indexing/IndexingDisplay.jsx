import TextGrid from '../../ui/TextGrid';
import TypeArray from '../../ui/TypeArray';
import TypeSection from '../../ui/TypeSection';

function IndexingConfigurationFieldType({ name, fullText } = {}) {
  return (
    <>
      <TextGrid title="name" value={name} hover />
      <TextGrid title="fullText" value={fullText} variant="boolean" hover />
    </>
  );
}

function IndexingConfigurationType({ value = {} }) {
  return (
    <>
      <TextGrid title="solrPath" value={value.solrPath} hover />
      <TextGrid title="solrCollection" value={value.solrCollection} hover />
      <TextGrid title="zookeeperHost" value={value.zookeeperHost} variant="list" hover />
      <TextGrid title="elasticsearchPath" value={value.elasticsearchPath} hover />
      <TextGrid title="commitInterval" value={value.concurrentJobs} hover />
      <TextGrid title="softCommitInterval" value={value.softCommitInterval} hover />
      <TextGrid title="autoSoftCommit" value={value.autoSoftCommit} variant="boolean" hover />
      <TextGrid title="pingAttempts" value={value.pingAttempts} hover />
      <TextGrid title="pingTimeout" value={value.pingTimeout} hover />
      <TextGrid title="queryTimeout" value={value.queryTimeout} hover />
      <TypeArray
        value={value.fieldDefault}
        component={IndexingConfigurationFieldType}
        arrayTitle="Pools"
        dense
      />
    </>
  );
}

export default function IndexingDisplay({ indexingConfigurationDocument }) {
  return (
    <TypeSection value={indexingConfigurationDocument} component={IndexingConfigurationType} />
  );
}
