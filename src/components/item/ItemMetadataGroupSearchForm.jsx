import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { loadFieldGroupOptions } from '../fieldgroup/FieldGroupSelect';
import { TextField, Select } from '../form';
import { loadMetadataFieldOptions } from '../metadatafield/MetadataFieldSelect';
import ChipInput from '../ui/ChipInput';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';

import {
  ItemSearchTextValueType,
  SearchFieldType,
  ItemCriterionType,
  SearchFilterType,
  SearchFacetType,
  SearchHighlightType,
} from './ItemSearchForm';

function SearchGroupType() {
  return (
    <>
      <Field
        name="name"
        label="Group Name"
        component={StatefulAsyncSelect}
        loadOptions={loadFieldGroupOptions}
        cacheOptions
        isClearable
        required
        fullWidth
        disableInitial
        creatable
      />
      <FieldTypeArray
        name="field"
        component={SearchFieldType}
        label="field"
        withHeader={false}
        arrayHeader
      />
      <FieldTypeArray
        name="group"
        component={SearchGroupType}
        label="group"
        withHeader={false}
        arrayHeader
      />
      <Field name="reference" component={TextField} fullWidth />
    </>
  );
}

function SearchOperatorType() {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel htmlFor="operation">Operation</InputLabel>
        <Field name="operation" component={Select}>
          <MenuItem value="AND">AND</MenuItem>
          <MenuItem value="OR">OR</MenuItem>
          <MenuItem value="NOT">NOT</MenuItem>
        </Field>
      </FormControl>
      <FieldTypeArray
        name="operator"
        component={SearchOperatorType}
        label="operator"
        withHeader={false}
        arrayHeader
      />
      <FieldTypeArray
        name="text"
        component={ItemSearchTextValueType}
        label="Text"
        withHeader={false}
        arrayHeader
      />
      <FieldTypeArray
        name="field"
        component={SearchFieldType}
        label="field"
        withHeader={false}
        arrayHeader
      />
      <FieldTypeArray
        name="group"
        component={SearchGroupType}
        label="group"
        withHeader={false}
        arrayHeader
      />
      <Field name="reference" component={ChipInput} simple fullWidth />
    </>
  );
}

export function CriterionType() {
  return (
    <>
      <FormSection
        name="operator"
        label="operator"
        component={SearchOperatorType}
        button
        initialDisplay={false}
      />
      <FieldTypeArray
        name="field"
        component={SearchFieldType}
        label="field"
        withHeader={false}
        arrayHeader
      />
      <FieldTypeArray
        name="group"
        component={SearchGroupType}
        label="group"
        withHeader={false}
        arrayHeader
      />
    </>
  );
}

export function ShapeCriterionType() {
  return (
    <>
      <CriterionType />
      <FormSection
        name="file"
        component={CriterionType}
        label="File Join"
        button
        initialDisplay={false}
      />
    </>
  );
}

export function CollectionCriterionType() {
  return (
    <>
      <CriterionType />
      <FieldTypeArray
        name="collection"
        component={CollectionCriterionType}
        label="Collection Join"
        withHeader={false}
        arrayHeader
      />
      <FormSection
        name="item"
        component={ItemCriterionType}
        label="Item Join"
        button
        initialDisplay={false}
      />
      <FormControl fullWidth>
        <InputLabel htmlFor="relation">Relation</InputLabel>
        <Field name="relation" component={Select}>
          <MenuItem value="" />
          <MenuItem value="child">Child</MenuItem>
          <MenuItem value="parent">Parent</MenuItem>
          <MenuItem value="descendant">Descendant</MenuItem>
          <MenuItem value="ancestor">Ancestor</MenuItem>
        </Field>
      </FormControl>
    </>
  );
}

export function FacetRangeType() {
  return (
    <>
      <Field name="start" component={TextField} fullWidth />
      <Field name="end" component={TextField} fullWidth />
    </>
  );
}

export function SearchFacetFilterType() {
  return (
    <>
      <Field
        name="field"
        label="Field"
        component={StatefulAsyncSelect}
        loadOptions={loadMetadataFieldOptions}
        cacheOptions
        isClearable
        required
        fullWidth
        disableInitial
        creatable
      />
      <Field name="value" component={TextField} fullWidth />
      <FormSection name="range" label="Range" component={FacetRangeType} />
    </>
  );
}

export function SearchSortType() {
  return (
    <>
      <Field
        name="field"
        label="Field"
        component={StatefulAsyncSelect}
        loadOptions={loadMetadataFieldOptions}
        cacheOptions
        isClearable
        required
        fullWidth
        disableInitial
        creatable
      />
      <FormControl fullWidth>
        <InputLabel htmlFor="order">order</InputLabel>
        <Field name="order" component={Select}>
          <MenuItem value="ascending">Ascending</MenuItem>
          <MenuItem value="descending">Descending</MenuItem>
        </Field>
      </FormControl>
    </>
  );
}

export function SuggestionSearchType() {
  return (
    <>
      <Field name="maximumSuggestions" component={TextField} type="number" fullWidth />
      <Field name="accuracy" component={TextField} type="number" fullWidth />
    </>
  );
}

export function AutocompleteRequestType() {
  return (
    <>
      <Field name="text" component={TextField} fullWidth />
      <Field
        name="field"
        label="Field"
        component={StatefulAsyncSelect}
        loadOptions={loadMetadataFieldOptions}
        cacheOptions
        isClearable
        required
        fullWidth
        disableInitial
        creatable
      />
      <Field name="accuracy" component={TextField} type="number" fullWidth />
    </>
  );
}

export function MetadataGroupSearchType() {
  return (
    <>
      <FieldTypeArray
        name="text"
        component={ItemSearchTextValueType}
        label="Text"
        withHeader={false}
        arrayHeader
      />
      <FieldTypeArray
        name="field"
        component={SearchFieldType}
        label="field"
        withHeader={false}
        arrayHeader
      />
      <FormSection
        name="operator"
        label="operator"
        component={SearchOperatorType}
        button
        initialDisplay={false}
      />
      <FormSection
        name="item"
        label="item join"
        component={ItemCriterionType}
        button
        initialDisplay={false}
      />
      <FieldTypeArray
        name="filter"
        component={SearchFilterType}
        label="filter"
        withHeader={false}
        arrayHeader
      />
      <FieldTypeArray
        name="facetFilter"
        component={SearchFacetFilterType}
        label="facetFilter"
        withHeader={false}
        arrayHeader
      />
      <FieldTypeArray
        name="facet"
        component={SearchFacetType}
        label="facet"
        withHeader={false}
        arrayHeader
      />
      <FormSection
        name="highlight"
        label="highlight"
        component={SearchHighlightType}
        button
        initialDisplay={false}
      />
      <FieldTypeArray
        name="sort"
        component={SearchSortType}
        label="sort"
        withHeader={false}
        arrayHeader
      />
    </>
  );
}

function ItemMetadataGroupSearchForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="metadataGroupSearchDocument" component={MetadataGroupSearchType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ItemMetadataGroupSearchForm);
