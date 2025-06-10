import TextGrid from '../ui/TextGrid';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

const setVariant = (key) => {
  switch (key) {
    case 'batonTestPlan':
      return 'application/xml';
    default:
      return undefined;
  }
};

function KeyValueType({ value = {} }) {
  return <TextGrid title={value.key} value={value.value} variant={setVariant(value.key)} />;
}

function AnalyzePresetType({ value = {} }) {
  return (
    <>
      <TextGrid title="name" value={value.name} hover />
      <TypeArray arrayTitle="Data" value={value.data} component={KeyValueType} />
    </>
  );
}

export default function AnalyzePresetDisplay({ analyzePresetDocument }) {
  return <TypeSection component={AnalyzePresetType} value={analyzePresetDocument} />;
}
