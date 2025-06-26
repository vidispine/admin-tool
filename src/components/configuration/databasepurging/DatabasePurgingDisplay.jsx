import TextGrid from '../../ui/TextGrid';
import TypeSection from '../../ui/TypeSection';

function DatabasePurgingConfigurationAgeType({ value: { age, forceAge } = {} }) {
  return (
    <>
      <TextGrid title="Age" value={age} hover />
      <TextGrid title="Force Age" value={forceAge} hover />
    </>
  );
}

function DatabasePurgingConfigurationAuditType({
  value: { age, uri, compress, batch, body } = {},
}) {
  return (
    <>
      <TextGrid title="Age" value={age} hover />
      <TextGrid title="URI" value={uri} hover />
      <TextGrid title="Compress" value={compress} variant="boolean" hover />
      <TextGrid title="Batch" value={batch} hover />
      <TextGrid title="Body" value={body} variant="boolean" hover />
    </>
  );
}
function DatabasePurgingConfigurationJobType({ value: { age, uri, compress } = {} }) {
  return (
    <>
      <TextGrid title="Age" value={age} hover />
      <TextGrid title="URI" value={uri} hover />
      <TextGrid title="Compress" value={compress} variant="boolean" hover />
    </>
  );
}
function DatabasePurgingConfigurationTransferLogType({
  value: { age, uri, compress, batch, forceAge } = {},
}) {
  return (
    <>
      <TextGrid title="Age" value={age} hover />
      <TextGrid title="Force Age" value={forceAge} hover />
      <TextGrid title="URI" value={uri} hover />
      <TextGrid title="Compress" value={compress} variant="boolean" hover />
      <TextGrid title="batch" value={batch} hover />
    </>
  );
}

function DatabasePurgingConfigurationType({ value = {} }) {
  return (
    <>
      <TypeSection
        title="Change Log"
        value={value.changeLog}
        component={DatabasePurgingConfigurationAgeType}
      />
      <TypeSection
        title="Audit Trail"
        value={value.auditTrail}
        component={DatabasePurgingConfigurationAuditType}
      />
      <TypeSection title="job" value={value.job} component={DatabasePurgingConfigurationJobType} />
      <TypeSection
        title="Transfer Log"
        value={value.transferLog}
        component={DatabasePurgingConfigurationTransferLogType}
      />
    </>
  );
}

export default function DatabasePurgingDisplay({ databasePurgingConfigurationDocument }) {
  return (
    <TypeSection
      value={databasePurgingConfigurationDocument}
      component={DatabasePurgingConfigurationType}
    />
  );
}
