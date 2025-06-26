import TextGrid from '../../ui/TextGrid';
import TypeArray from '../../ui/TypeArray';
import TypeSection from '../../ui/TypeSection';

function JobPriorityConfigurationTypeType({ value }) {
  return (
    <>
      <TextGrid title="Type" value={value?.type} hover />
      <TextGrid title="Value" value={value?.value} hover />
    </>
  );
}

function JobPriorityConfigurationType({ value = {} }) {
  return (
    <TypeArray
      title="Job Type"
      value={value.job}
      titleKey="type"
      component={JobPriorityConfigurationTypeType}
    />
  );
}

export default function JobPriorityDisplay({ jobPriorityConfigurationDocument }) {
  return (
    <TypeSection
      value={jobPriorityConfigurationDocument}
      component={JobPriorityConfigurationType}
    />
  );
}
