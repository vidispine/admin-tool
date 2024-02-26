import React from 'react';
import { reduxForm } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { TextField, Select } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import BoolCheckbox from '../ui/BoolCheckbox';
import ChipInput from '../ui/ChipInput';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadMetadataFieldOptions } from '../metadatafield/MetadataFieldSelect';
import { loadFieldGroupOptions } from '../fieldgroup/FieldGroupSelect';

export const ItemSearchTextValueType = () => (
  <Grid container>
    <Grid item sm={10}>
      <Field
        name="value"
        component={TextField}
        fullWidth
      />
    </Grid>
    <Grid item sm={2}>
      <FormControlLabel
        control={(
          <Field
            name="noescape"
            component={BoolCheckbox}
          />
        )}
        label="No Escape"
      />
    </Grid>
  </Grid>
);

export const ItemSearchValueType = () => (
  <Grid container>
    <Grid item sm={6}>
      <Field name="value" component={TextField} fullWidth />
    </Grid>
    <Grid item sm={2}>
      <FormControlLabel
        control={<Field name="noescape" component={BoolCheckbox} />}
        label="No Escape"
      />
    </Grid>
    <Grid item sm={2}>
      <FormControlLabel
        control={<Field name="minimum" component={BoolCheckbox} />}
        label="Minimum"
      />
    </Grid>
    <Grid item sm={2}>
      <FormControlLabel
        control={<Field name="maximum" component={BoolCheckbox} />}
        label="Maximum"
      />
    </Grid>
  </Grid>
);

export const ItemSearchRangeType = () => (
  <>
    <FormSection
      name="value[0]"
      component={ItemSearchValueType}
      label="Start"
      button
      initialDisplay={false}
    />
    <FormSection name="value[1]" component={ItemSearchValueType} label="End" />
    <FormControlLabel
      control={<Field name="exclusiveMinimum" component={BoolCheckbox} />}
      label="Exclusive Minimum"
    />
    <FormControlLabel
      control={<Field name="exclusiveMaximum" component={BoolCheckbox} />}
      label="Exclusive Maximum"
    />
  </>
);

export const SearchFieldType = () => (
  <>
    <Field
      name="name"
      label="Field Name"
      component={StatefulAsyncSelect}
      loadOptions={loadMetadataFieldOptions}
      cacheOptions
      isClearable
      required
      fullWidth
      disableInitial
      creatable
    />
    <FieldTypeArray
      name="value"
      component={ItemSearchValueType}
      label="Field Value"
      withHeader={false}
      arrayHeader
    />
    <FieldTypeArray
      name="range"
      component={ItemSearchRangeType}
      label="Range"
      withHeader={false}
      arrayHeader
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="target">Target</InputLabel>
      <Field name="target" component={Select}>
        <MenuItem value="item">Item</MenuItem>
        <MenuItem value="shape">Shape</MenuItem>
        <MenuItem value="file">File</MenuItem>
      </Field>
    </FormControl>
  </>
);

export const SearchGroupType = () => (
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

export const SearchOperatorType = () => (
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
    <Field
      name="reference"
      component={ChipInput}
      simple
      fullWidth
    />
  </>
);

export const SearchFilterType = () => (
  <>
    <Field name="name" component={TextField} fullWidth />
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

export const CriterionType = () => (
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

export const ShapeCriterionType = () => (
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

export const ItemCriterionType = () => (
  <>
    <CriterionType />
    <FormSection
      name="shape"
      label="Shape Join"
      component={ShapeCriterionType}
      button
      initialDisplay={false}
    />
    <FormSection
      name="file"
      component={CriterionType}
      label="File Join"
      button
      initialDisplay={false}
    />
  </>
);

export const CollectionCriterionType = () => (
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

export const FacetRangeType = () => (
  <>
    <Field
      name="start"
      component={TextField}
      fullWidth
    />
    <Field
      name="end"
      component={TextField}
      fullWidth
    />
  </>
);

export const FacetFilterType = () => (
  <>
    <Field name="field" label="Field" component={TextField} fullWidth />
    <Field name="value" component={TextField} fullWidth />
    <FormSection name="range" label="Range" component={FacetRangeType} />
  </>
);

export const SearchFacetFilterType = () => (
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
    <Field
      name="value"
      component={TextField}
      fullWidth
    />
    <FormSection
      name="range"
      label="Range"
      component={FacetRangeType}
    />
  </>
);

export const SearchFacetType = () => (
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
    <FieldTypeArray
      name="range"
      component={FacetRangeType}
      label="range"
      withHeader={false}
      arrayHeader
    />
    <Field
      name="exclude"
      component={ChipInput}
      simple
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="count"
          component={BoolCheckbox}
        />
      )}
      label="Count"
    />
    <Field
      name="minCount"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="maxResults"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="name"
      component={TextField}
      fullWidth
    />
  </>
);

export const SearchSortType = () => (
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

export const SearchHighlightType = () => (
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
      isMulti
      creatable
    />
    <FormControlLabel
      control={(
        <Field
          name="matchingOnly"
          component={BoolCheckbox}
        />
      )}
      label="Matching Only"
    />
    <Field
      name="prefix"
      component={TextField}
      fullWidth
    />
    <Field
      name="suffix"
      component={TextField}
      fullWidth
    />
  </>
);

export const SuggestionSearchType = () => (
  <>
    <Field
      name="maximumSuggestions"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="accuracy"
      component={TextField}
      type="number"
      fullWidth
    />
  </>
);

export const AutocompleteRequestType = () => (
  <>
    <Field
      name="text"
      component={TextField}
      fullWidth
    />
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
    <Field
      name="accuracy"
      component={TextField}
      type="number"
      fullWidth
    />
  </>
);

export const ItemSearchType = () => (
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
    <FieldTypeArray
      name="group"
      component={SearchGroupType}
      label="group"
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
    <FormControl fullWidth>
      <InputLabel htmlFor="intervals">Intervals</InputLabel>
      <Field name="intervals" component={Select}>
        <MenuItem value="generic">Generic</MenuItem>
        <MenuItem value="timed">Timed</MenuItem>
        <MenuItem value="all">All</MenuItem>
      </Field>
    </FormControl>
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
    <FieldTypeArray
      name="sort"
      component={SearchSortType}
      label="sort"
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
    <FormSection
      name="suggestion"
      label="suggestion"
      component={SuggestionSearchType}
      button
      initialDisplay={false}
    />
    <FieldTypeArray
      name="autocomplete"
      component={AutocompleteRequestType}
      label="autocomplete"
      withHeader={false}
      arrayHeader
    />
    <Field
      name="version"
      component={TextField}
      fullWidth
      type="number"
    />
    <Field
      name="reference"
      component={TextField}
      fullWidth
      type="string"
    />
    <FieldTypeArray
      name="collection"
      label="collection join"
      component={CollectionCriterionType}
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
    <FormSection
      name="shape"
      label="shape join"
      component={ShapeCriterionType}
      button
      initialDisplay={false}
    />
    <FormSection
      name="file"
      label="file join"
      component={CriterionType}
      button
      initialDisplay={false}
    />
  </>
);

function ItemSearchForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="itemSearchDocument"
        component={ItemSearchType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ItemSearchForm);
