import TextGrid from '../../ui/TextGrid';
import TypeSection from '../../ui/TypeSection';
import TypeArray from '../../ui/TypeArray';

const JobPriorityConfigurationType = ({ value = {} }) => (
  <>
    <TypeArray
      title="Job Type"
      value={value.job}
      titleKey="type"
      component={({ value: v = {} }) => (
        <>
          <TextGrid
            title="Type"
            value={v.type}
            hover
          />
          <TextGrid
            title="Value"
            value={v.value}
            hover
          />
        </>
      )}
    />
  </>
);

export default function JobPriorityDisplay({
  jobPriorityConfigurationDocument,
}) {
  return (
    <>
      <TypeSection
        value={jobPriorityConfigurationDocument}
        component={JobPriorityConfigurationType}
      />
    </>
  );
}
