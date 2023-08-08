import React from 'react';

import TextGrid from '../ui/TextGrid';
import TextGridArray from '../ui/TextGridArray';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';
import formatTimeRepresentation from '../../utils/formatTimeRepresentation';
import { TEXT_TIME } from '../../const/Time';

export const MetadataFieldValueType = ({ value = {} }) => {
  const { value: valueList = [] } = value;
  const valueListValues = valueList.map((thisValue) => thisValue.value);
  return (
    <TextGridArray
      title={value.name}
      value={valueListValues}
      titleStartCase={false}
      titleGridProps={{
        xl: 2,
      }}
      titleTypographyProps={{
        style: {
          wordWrap: 'break-word',
        },
        noWrap: false,
      }}
      valueTypographyProps={{
        style: {
          wordWrap: 'break-word',
        },
        noWrap: false,
      }}
      hover
      // onEdit={() => console.log(value)}
    />
  );
};

export const MetadataGroupValueType = ({ value = {} }) => (
  <>
    <TextGrid
      title="Group Name"
      value={value.name}
      variant="group"
      titleStartCase={false}
    />
    <TypeArray
      arrayTitle="Fields"
      value={value.field}
      component={MetadataFieldValueType}
      titleStartCase={false}
    />
    <TypeArray
      arrayTitle="Groups"
      value={value.group}
      component={MetadataGroupValueType}
      titleStartCase={false}
    />
  </>
);

export const MetadataTimespanType = ({ value = {}, timeRepresentation }) => {
  const {
    start, end, field, group,
  } = value;
  const startTime = formatTimeRepresentation({
    from: TEXT_TIME,
    to: timeRepresentation?.to,
    conform: timeRepresentation?.conform,
    value: start,
  });
  const endTime = formatTimeRepresentation({
    from: TEXT_TIME,
    to: timeRepresentation?.to,
    conform: timeRepresentation?.conform,
    value: end,
  });
  return (
    <>
      <TextGrid
        title={`Start: ${startTime}`}
        value={`End: ${endTime}`}
        titleStartCase={false}
        titleTypographyProps={{ variant: 'subtitle2', color: 'textPrimary' }}
      />
      <TypeArray
        arrayTitle="Fields"
        value={field}
        component={MetadataFieldValueType}
        titleStartCase={false}
        hideNoValue
      />
      <TypeArray
        arrayTitle="Groups"
        value={group}
        component={MetadataGroupValueType}
        titleStartCase={false}
        hideNoValue
      />
    </>
  );
};

export const MetadataType = ({ value = {}, ...props }) => (
  <>
    <TypeArray
      value={value.timespan}
      hover
      dense
      component={MetadataTimespanType}
      {...props}
    />
  </>
);

export default function MetadataDisplay({
  metadataDocument,
  ...props
}) {
  return (
    <>
      <TypeSection
        value={metadataDocument}
        component={MetadataType}
        {...props}
      />
    </>
  );
}
