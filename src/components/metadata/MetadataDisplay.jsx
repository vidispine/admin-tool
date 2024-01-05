import React from 'react';

import TextGrid from '../ui/TextGrid';
import TextGridArray from '../ui/TextGridArray';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';
import formatTimeRepresentation from '../../utils/formatTimeRepresentation';
import { TEXT_TIME } from '../../const/Time';

export const MetadataFieldValueType = ({ value: metadataField = {} }) => {
  const { value: metadataFieldValueList = [] } = metadataField;
  return (
    <TextGridArray
      title={metadataField.name}
      value={metadataFieldValueList}
      variant="metadataFieldValue"
      titleStartCase={false}
      titleGridProps={{ xl: 2 }}
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
      // onEdit={(metadataFieldValue) => console.log({ metadataField, metadataFieldValue })}
    />
  );
};

export const MetadataGroupValueType = ({ value = {} }) => (
  <div style={{ marginLeft: 10 }}>
    <TypeArray
      arrayTitle="Fields"
      value={value.field}
      component={MetadataFieldValueType}
      titleStartCase={false}
      hideNoValue
    />
    <TypeArray
      arrayTitle="Groups"
      title="Group"
      titleKey="name"
      value={value.group}
      component={MetadataGroupValueType}
      titleStartCase={false}
      hideNoValue
    />
  </div>
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
        title="Group"
        titleKey="name"
        value={group}
        component={MetadataGroupValueType}
        titleStartCase={false}
        hideNoValue
      />
    </>
  );
};

export const MetadataType = ({ value = {}, timeRepresentation }) => (
  <>
    <TypeArray
      arrayTitle="Timespans"
      value={value.timespan}
      dense
      component={MetadataTimespanType}
      timeRepresentation={timeRepresentation}
    />
  </>
);

export default function MetadataDisplay({ metadataDocument, timeRepresentation }) {
  return (
    <>
      <TypeSection
        value={metadataDocument}
        component={MetadataType}
        timeRepresentation={timeRepresentation}
      />
    </>
  );
}
