import TextGrid from '../ui/TextGrid';
import TextGridArray from '../ui/TextGridArray';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

function ItemSearchTextValueType({ value }) {
  return (
    <>
      <TextGrid title="value" value={value.value} hideNoValue />
      <TextGrid title="No Escape" value={value.noescape} variant="boolean" hideNoValue />
    </>
  );
}

function ItemSearchValueType({ value }) {
  return (
    <>
      <TextGrid title="value" value={value.value} hideNoValue />
      <TextGrid title="minimum" value={value.minimum} variant="boolean" hideNoValue />
      <TextGrid title="maximum" value={value.maximum} variant="boolean" hideNoValue />
      <TextGrid title="No Escape" value={value.noescape} variant="boolean" hideNoValue />
    </>
  );
}

function ItemSearchRangeType({ value }) {
  return (
    <>
      <TypeSection value={value.value[0]} title="start" component={ItemSearchValueType} />
      <TypeSection value={value.value[1]} title="end" component={ItemSearchValueType} />
      <TextGrid
        title="Exclusive Minimum"
        value={value.exclusiveMinimum}
        variant="boolean"
        hideNoValue
      />
      <TextGrid
        title="Exclusive Maximum"
        value={value.exclusiveMaximum}
        variant="boolean"
        hideNoValue
      />
    </>
  );
}

function SearchFieldType({ value }) {
  return (
    <>
      <TextGrid title="Field Name" value={value.name} hideNoValue />
      <TypeArray value={value.value} arrayTitle="Field Value" component={ItemSearchValueType} />
      <TypeArray value={value.range} arrayTitle="Field Range" component={ItemSearchRangeType} />
      <TextGrid title="Field Target" value={value.target} hideNoValue />
    </>
  );
}

function SearchGroupType({ value }) {
  return (
    <>
      <TextGrid title="Group Name" value={value.name} hideNoValue />
      <TypeArray value={value.field} arrayTitle="Field" component={SearchFieldType} />
      <TypeArray value={value.group} arrayTitle="Group" component={SearchGroupType} />
      <TextGrid title="reference" value={value.reference} hideNoValue />
    </>
  );
}

function SearchOperatorType({ value }) {
  return (
    <>
      <TextGrid title="Operation" value={value.operation} hideNoValue />
      <TypeArray value={value.operator} arrayTitle="Operator" component={SearchOperatorType} />
      <TypeArray value={value.text} arrayTitle="Text" component={ItemSearchTextValueType} />
      <TypeArray value={value.field} arrayTitle="Field" component={SearchFieldType} />
      <TypeArray value={value.group} arrayTitle="Group" component={SearchGroupType} />
      <TextGridArray title="reference" value={value.reference} hideNoValue />
    </>
  );
}

export function SearchFilterType({ value }) {
  return (
    <>
      <TextGrid title="Filter Name" value={value.name} hideNoValue />
      <TextGrid title="Operation" value={value.operation} hideNoValue />
      <TypeArray value={value.operator} arrayTitle="Operator" component={SearchOperatorType} />
      <TypeArray value={value.field} arrayTitle="Field" component={SearchFieldType} />
      <TypeArray value={value.group} arrayTitle="Group" component={SearchGroupType} />
      <TextGridArray title="reference" value={value.reference} hideNoValue />
    </>
  );
}

function CriterionType({ value }) {
  return (
    <>
      <TypeArray value={value.field} arrayTitle="Field" component={SearchFieldType} />
      <TypeArray value={value.group} arrayTitle="Group" component={SearchGroupType} />
      <TypeSection value={value.operator} component={SearchOperatorType} />
    </>
  );
}

function ShapeCriterionType({ value }) {
  return (
    <>
      <CriterionType value={value} />
      <TypeSection value={value.file} component={CriterionType} title="File" />
    </>
  );
}

function ItemCriterionType({ value }) {
  return (
    <>
      <CriterionType value={value} />
      <TypeSection value={value.shape} component={ShapeCriterionType} title="Shape" />
      <TypeSection value={value.file} component={CriterionType} title="File" />
    </>
  );
}

function FacetRangeType({ value }) {
  return (
    <>
      <TextGrid title="start" value={value.start} hideNoValue />
      <TextGrid title="End" value={value.end} hideNoValue />
    </>
  );
}

function SearchFacetFilterType({ value }) {
  return (
    <>
      <TextGrid title="Field Name" value={value.name} hideNoValue />
      <TextGrid title="Field Value" value={value.value} hideNoValue />
      <TypeSection value={value.range} arrayTitle="Field Range" component={FacetRangeType} />
    </>
  );
}

function SearchFacetType({ value }) {
  return (
    <>
      <TextGrid title="Field" value={value.field} hideNoValue />
      <TypeArray value={value.range} arrayTitle="Range" component={FacetRangeType} />
      <TextGridArray title="exclude" value={value.exclude} hideNoValue />
      <TextGrid title="count" value={value.count} variant="boolean" hideNoValue />
      <TextGrid title="minCount" value={value.minCount} hideNoValue />
      <TextGrid title="maxResults" value={value.maxResults} hideNoValue />
      <TextGrid title="name" value={value.name} hideNoValue />
    </>
  );
}

function SearchSortType({ value }) {
  return (
    <>
      <TextGrid title="field" value={value.field} hideNoValue />
      <TextGrid title="order" value={value.order} hideNoValue />
    </>
  );
}

function SearchHighlightType({ value }) {
  return (
    <>
      <TextGrid title="field" value={value.field} hideNoValue />
      <TextGrid title="matchingOnly" value={value.matchingOnly} variant="boolean" hideNoValue />
      <TextGrid title="prefix" value={value.prefix} hideNoValue />
      <TextGrid title="suffix" value={value.suffix} hideNoValue />
    </>
  );
}

function SuggestionSearchType({ value }) {
  return (
    <>
      <TextGrid title="maximumSuggestions" value={value.maximumSuggestions} hideNoValue />
      <TextGrid title="accuracy" value={value.accuracy} hideNoValue />
    </>
  );
}

function AutocompleteRequestType({ value }) {
  return (
    <>
      <TextGrid title="text" value={value.text} hideNoValue />
      <TextGrid title="field" value={value.field} hideNoValue />
      <TextGrid title="accuracy" value={value.accuracy} hideNoValue />
    </>
  );
}

export function ItemSearchType({ value }) {
  return (
    <>
      <TypeSection value={value.operator} component={SearchOperatorType} />
      <TypeArray value={value.text} arrayTitle="Text" component={ItemSearchTextValueType} />
      <TypeArray value={value.field} arrayTitle="Field" component={SearchFieldType} />
      <TypeArray value={value.group} arrayTitle="Group" component={SearchGroupType} />
      <TextGrid title="Intervals" value={value.intervals} hideNoValue />
      <TextGridArray title="reference" value={value.reference} hideNoValue />
      <TypeArray
        value={value.filter}
        arrayTitle="Filter"
        component={SearchFilterType}
        hideNoValue
      />
      <TypeArray
        value={value.facetFilter}
        arrayTitle="Facet Filter"
        component={SearchFacetFilterType}
        hideNoValue
      />
      <TypeArray value={value.facet} arrayTitle="Facet" component={SearchFacetType} hideNoValue />
      <TypeArray value={value.sort} arrayTitle="Sort" component={SearchSortType} hideNoValue />
      <TypeSection
        value={value.highlight}
        component={SearchHighlightType}
        title="Highlight"
        hideNoValue
      />
      <TypeSection
        value={value.suggestion}
        component={SuggestionSearchType}
        title="Suggestion"
        hideNoValue
      />
      <TypeArray
        value={value.autocomplete}
        arrayTitle="autocomplete"
        component={AutocompleteRequestType}
        hideNoValue
      />
      <TypeSection value={value.item} component={ItemCriterionType} title="Item" hideNoValue />
      <TypeSection value={value.shape} component={ShapeCriterionType} title="Shape" hideNoValue />
      <TypeSection value={value.file} component={CriterionType} title="File" hideNoValue />
      <TextGrid title="Version" value={value.version} hideNoValue />
    </>
  );
}

export default function ItemSearchDisplay({ itemSearchDocument }) {
  return <TypeSection value={itemSearchDocument} component={ItemSearchType} />;
}
