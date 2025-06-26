import { TEXT_TIME } from '../../const/Time';
import formatTimeRepresentation from '../../utils/formatTimeRepresentation';
import TextGrid from '../ui/TextGrid';
import TextGridArray from '../ui/TextGridArray';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

export function MetadataFieldValueType({ value: metadataField = {}, onEdit }) {
  const { value: metadataFieldValueList = [] } = metadataField;
  const canEdit =
    onEdit && !metadataField.name.startsWith('__') && metadataField.inheritance === undefined;
  const handleOnEdit = canEdit
    ? (newValue, metadataFieldValue) =>
        onEdit({
          field: [
            {
              name: metadataField.name,
              uuid: metadataField.uuid,
              value: [
                {
                  uuid: metadataFieldValue.uuid,
                  value: newValue,
                },
              ],
            },
          ],
        })
    : undefined;
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
      onEdit={handleOnEdit}
    />
  );
}

export function MetadataGroupValueType({ value = {}, onEdit }) {
  const canEdit = onEdit && value.inheritance === undefined;
  const handleOnEdit = canEdit
    ? (newValue) =>
        onEdit({
          group: [
            {
              name: value.name,
              uuid: value.uuid,
              ...newValue,
            },
          ],
        })
    : undefined;
  return (
    <div style={{ marginLeft: 10 }}>
      <TypeArray
        arrayTitle="Fields"
        value={value.field}
        component={MetadataFieldValueType}
        titleStartCase={false}
        hideNoValue
        onEdit={handleOnEdit}
      />
      <TypeArray
        arrayTitle="Groups"
        title="Group"
        titleKey="name"
        value={value.group}
        component={MetadataGroupValueType}
        titleStartCase={false}
        hideNoValue
        onEdit={handleOnEdit}
      />
    </div>
  );
}

export function MetadataTimespanType({ value = {}, timeRepresentation, onEdit }) {
  const { start, end, field, group } = value;
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
  const handleOnEdit = onEdit
    ? (newValue) =>
        onEdit({
          timespan: [
            {
              start,
              end,
              ...newValue,
            },
          ],
        })
    : undefined;

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
        onEdit={handleOnEdit}
      />
      <TypeArray
        arrayTitle="Groups"
        title="Group"
        titleKey="name"
        value={group}
        component={MetadataGroupValueType}
        titleStartCase={false}
        hideNoValue
        onEdit={handleOnEdit}
      />
    </>
  );
}

export function MetadataType({ value = {}, timeRepresentation, onEdit }) {
  return (
    <TypeArray
      arrayTitle="Timespans"
      value={value.timespan}
      dense
      component={MetadataTimespanType}
      timeRepresentation={timeRepresentation}
      onEdit={onEdit}
    />
  );
}

export default function MetadataDisplay({ metadataDocument, timeRepresentation, onEdit }) {
  return (
    <TypeSection
      value={metadataDocument}
      component={MetadataType}
      timeRepresentation={timeRepresentation}
      onEdit={onEdit}
    />
  );
}
