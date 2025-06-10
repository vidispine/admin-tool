import TextGrid from './TextGrid';
import TypeArray from './TypeArray';
import TypeSection from './TypeSection';

function SimpleMetadataValueType({ dense, value = {} }) {
  return dense ? (
    <TextGrid title={value.key} value={value.value} hover hideNoValue titleStartCase={false} />
  ) : (
    <>
      <TextGrid title="key" value={value.key} />
      <TextGrid title="value" value={value.value} />
    </>
  );
}

export function SimpleMetadataType({ value: v = {}, dense = true }) {
  return (
    <TypeArray
      title={dense ? undefined : 'field'}
      value={v.field}
      dense={dense}
      component={SimpleMetadataValueType}
    />
  );
}

export function KeyValuePairType({ value = {}, dense = true }) {
  return dense ? (
    <TextGrid title={value.key} value={value.value} hover hideNoValue titleStartCase={false} />
  ) : (
    <>
      <TextGrid title="key" value={value.key} />
      <TextGrid title="value" value={value.value} />
    </>
  );
}

export function RationalType({ value = {} }) {
  return (
    <>
      <TextGrid title="numerator" value={value.numerator} hover hideNoValue />
      <TextGrid title="denominator" value={value.denominator} hover hideNoValue />
    </>
  );
}

export const TimeBaseType = RationalType;

export function TimeCodeType({ value = {} }) {
  return (
    <>
      <TextGrid title="samples" value={value.samples} hover hideNoValue />
      <TypeSection hideNoValue component={TimeBaseType} title="timeBase" value={value.timeBase} />
    </>
  );
}

export function ResolutionType({ value = {} }) {
  return (
    <>
      <TextGrid title="width" value={value.width} hover hideNoValue />
      <TextGrid title="height" value={value.height} hover hideNoValue />
    </>
  );
}

export function AspectRatioType({ value = {} }) {
  return (
    <>
      <TextGrid title="horizontal" value={value.horizontal} hover hideNoValue />
      <TextGrid title="vertical" value={value.vertical} hover hideNoValue />
    </>
  );
}

export function TimeIntervalType({ value = {} }) {
  return (
    <>
      <TypeSection hideNoValue title="start" component={TimeCodeType} value={value.start} />
      <TypeSection hideNoValue title="end" component={TimeCodeType} value={value.end} />
    </>
  );
}
