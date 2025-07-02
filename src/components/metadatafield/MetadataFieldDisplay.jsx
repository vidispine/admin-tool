import { SimpleMetadataType, KeyValuePairType } from '../ui/DisplayType';
import TextGrid from '../ui/TextGrid';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

export function MetadataFieldFloatType({ value = {} }) {
  return (
    <>
      <TextGrid title="minInclusive" value={value.minInclusive} />
      <TextGrid title="maxInclusive" value={value.maxInclusive} />
    </>
  );
}

export function MetadataFieldIntegerType({ value = {} }) {
  return (
    <>
      <TextGrid title="minInclusive" value={value.minInclusive} />
      <TextGrid title="maxInclusive" value={value.maxInclusive} />
    </>
  );
}

export function MetadataFieldLongType({ value = {} }) {
  return (
    <>
      <TextGrid title="minInclusive" value={value.minInclusive} />
      <TextGrid title="maxInclusive" value={value.maxInclusive} />
    </>
  );
}

export function MetadataFieldStringType({ value = {} }) {
  return (
    <>
      <TextGrid title="pattern" value={value.pattern} />
      <TextGrid title="minLength" value={value.minLength} />
      <TextGrid title="maxLength" value={value.maxLength} />
    </>
  );
}

export function MetadataSchemaElementType({ value = {} }) {
  return (
    <>
      <TextGrid title="name" value={value.name} hover />
      <TextGrid title="reference" value={value.reference} hover />
      <TextGrid title="min" value={value.min} hover />
      <TextGrid title="max" value={value.max} hover />
    </>
  );
}

function MetadataFieldConstraintType({ value = {} }) {
  return (
    <>
      <TextGrid title="dataset" value={value.dataset} />
      <TextGrid title="levelProperty" value={value.levelProperty} />
      <TextGrid title="levelValue" value={value.levelValue} />
      <TextGrid title="value" value={value.value} />
      <TextGrid title="parent" value={value.parent} />
      <TextGrid title="validationGroup" value={value.validationGroup} />
    </>
  );
}

export function MetadataFieldType({ value }) {
  return (
    <>
      <TextGrid title="name" value={value.name} hover />
      <TextGrid title="type" value={value.type} hover />
      <TextGrid title="defaultValue" value={value.defaultValue} hover />
      <TextGrid title="system" value={value.system} variant="boolean" hover />
      <TextGrid title="sortable" value={value.sortable} variant="boolean" hover />
      <TextGrid title="inheritance" value={value.inheritance} variant="boolean" hover />
      <TextGrid title="fullText" value={value.fullText} variant="boolean" hover />
      <TextGrid title="index" value={value.index} hover />
      <TypeSection
        title="schema"
        component={MetadataSchemaElementType}
        value={value.schema}
        hideNoValue
      />
      <TypeSection title="values" component={SimpleMetadataType} value={value.values} hideNoValue />
      <TypeArray title="data" component={KeyValuePairType} value={value.data} hideNoValue />
      <TypeSection
        title="floatRestriction"
        value={value.floatRestriction}
        component={MetadataFieldFloatType}
        hideNoValue
      />
      <TypeSection
        title="integerRestriction"
        value={value.integerRestriction}
        component={MetadataFieldIntegerType}
        hideNoValue
      />
      <TypeSection
        title="longRestriction"
        value={value.longRestriction}
        component={MetadataFieldLongType}
        hideNoValue
      />
      <TypeSection
        title="stringRestriction"
        value={value.stringRestriction}
        component={MetadataFieldStringType}
        hideNoValue
      />
      <TypeSection value={value.constraint} component={MetadataFieldConstraintType} />
    </>
  );
}

export default MetadataFieldType;
