import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';

const setVariant = (key) => {
  switch (key) {
    case 'batonTestPlan':
      return 'application/xml';
    default:
      return undefined;
  }
};

const KeyValueType = ({ value = {} }) => (
  <>
    <TextGrid
      title={value.key}
      value={value.value}
      variant={setVariant(value.key)}
    />
  </>
);

const AnalyzePresetType = ({ value = {} }) => (
  <>
    <TextGrid
      title="name"
      value={value.name}
      hover
    />
    <TypeArray
      arrayTitle="Data"
      value={value.data}
      component={KeyValueType}
    />
  </>
);

export default function AnalyzePresetDisplay({
  analyzePresetDocument,
}) {
  return (
    <>
      <TypeSection
        component={AnalyzePresetType}
        value={analyzePresetDocument}
      />
    </>
  );
}
