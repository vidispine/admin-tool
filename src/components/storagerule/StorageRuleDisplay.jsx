import TextGrid from '../ui/TextGrid';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

function StorageRulePriorityType({ value }) {
  return (
    <>
      <TextGrid title="value" value={value?.value} hover />
      <TextGrid title="level" value={value?.value} hover />
    </>
  );
}
function StorageRuleNotType({ value }) {
  return (
    <>
      <TextGrid title="storage" value={value.storage} variant="storageId" hover />
      <TextGrid title="Storage Group" value={value.group} hover />
    </>
  );
}
function StorageRulePoolType({ value }) {
  return (
    <>
      <TextGrid title="storage" value={value.storage} variant="storageId" hover />
      <TextGrid title="Storage Group" value={value.group} hover />
    </>
  );
}
function StorageRuleAppliesToType({ value }) {
  return (
    <>
      <TextGrid title="id" value={value?.id} hover />
      <TextGrid title="type" value={value?.type} hover />
    </>
  );
}

function StorageRuleType({ value = {} }) {
  return (
    <>
      <TextGrid title="storageCount" value={value.storageCount} hover hideNoValue />
      <TypeArray
        title="priority"
        value={value.priority}
        component={StorageRulePriorityType}
        hideNoValue
      />
      <TextGrid title="inherited" value={value.inherited} variant="boolean" hover hideNoValue />
      <TextGrid title="storage" value={value.storage} variant="storageId" hover hideNoValue />
      <TextGrid title="Storage Group" value={value.group} hover hideNoValue />
      <TypeSection title="not" value={value.not} component={StorageRuleNotType} hideNoValue />
      <TypeSection title="pool" value={value.pool} component={StorageRulePoolType} hideNoValue />
      <TypeSection
        title="appliesTo"
        value={value.appliesTo}
        component={StorageRuleAppliesToType}
        hideNoValue
      />
      <TextGrid title="precedence" value={value.precedence} hover hideNoValue />
    </>
  );
}

export default function StorageRuleDisplay({ storageRuleDocument }) {
  return <TypeSection component={StorageRuleType} value={storageRuleDocument} />;
}
