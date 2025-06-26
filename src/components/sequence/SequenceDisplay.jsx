import { TranscodePresetType, TimeCodeType } from '../shapetag/ShapeTagDisplay';
import { KeyValuePairType } from '../ui/DisplayType';
import TextGrid from '../ui/TextGrid';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

function EffectPointType({ value = {} }) {
  return (
    <>
      <TextGrid title="value" value={value.value} hover hideNoValue />
      <TextGrid title="position" value={value.position} hover hideNoValue />
    </>
  );
}

function EffectParameterType({ value = {} }) {
  return (
    <>
      <TextGrid title="name" value={value.name} hover hideNoValue />
      <TypeArray title="point" component={EffectPointType} value={value.point} />
    </>
  );
}

function EffectType({ value = {} }) {
  return (
    <>
      <TextGrid title="name" value={value.name} hover hideNoValue />
      <TextGrid title="id" value={value.id} hover hideNoValue />
      <TypeSection title="timeBase" component={TimeCodeType} value={value.timeBase} hideNoValue />
      <TypeArray title="parameter" component={EffectParameterType} value={value.parameter} />
    </>
  );
}

function SequenceMediaType({ value = {} }) {
  return (
    <>
      <TextGrid title="externalVideoMedia" value={value.externalVideoMedia} hover hideNoValue />
      <TextGrid title="item" value={value.item} hover hideNoValue variant="itemId" />
      <TextGrid title="sourceTrack" value={value.sourceTrack} hover hideNoValue />
      <TypeSection title="in" component={TimeCodeType} value={value.in} hideNoValue />
      <TypeSection title="out" component={TimeCodeType} value={value.out} hideNoValue />
      <TypeSection title="sourceIn" component={TimeCodeType} value={value.sourceIn} hideNoValue />
      <TypeSection title="sourceOut" component={TimeCodeType} value={value.sourceOut} hideNoValue />
      <TypeArray title="effect" component={EffectType} value={value.effect} />
      <TextGrid title="reference" value={value.reference} hover hideNoValue />
    </>
  );
}

function SequenceTransitionType({ value = {} }) {
  return (
    <>
      <TypeSection title="in" component={TimeCodeType} value={value.in} hideNoValue />
      <TypeSection title="out" component={TimeCodeType} value={value.out} hideNoValue />
      <TextGrid title="wipe" value={value.wipe} hover hideNoValue />
      <TextGrid title="transition" value={value.transition} hover hideNoValue />
      <TextGrid title="horizRepeat" value={value.horizRepeat} hover hideNoValue />
      <TextGrid title="vertRepeat" value={value.vertRepeat} hover hideNoValue />
      <TextGrid title="startPercentage" value={value.startPercentage} hover hideNoValue />
      <TextGrid title="endPercentage" value={value.endPercentage} hover hideNoValue />
      <TextGrid title="reverse" value={value.reverse} hover hideNoValue />
      <TextGrid title="borderWidth" value={value.borderWidth} hover hideNoValue />
      <TextGrid title="borderColor" value={value.borderColor} hover hideNoValue />
      <TextGrid title="color" value={value.color} hover hideNoValue />
    </>
  );
}

function SequenceTrackType({ value = {} }) {
  return (
    <>
      <TextGrid title="audio" value={value.audio} hover hideNoValue />
      <TypeArray title="segment" component={SequenceMediaType} value={value.segment} />
      <TypeArray title="transition" component={SequenceTransitionType} value={value.transition} />
    </>
  );
}

function SequenceType({ value = {} }) {
  return (
    <>
      <TextGrid title="id" value={value.id} hover hideNoValue />
      <TypeArray title="track" component={SequenceTrackType} value={value.track} />
      <TypeSection
        title="override"
        component={TranscodePresetType}
        hideNoValue
        value={value.override}
      />
      <TypeArray
        title="setting"
        value={value.setting}
        component={KeyValuePairType}
        hover
        hideNoValue
      />
    </>
  );
}

function SequenceDisplay({ sequenceDocument }) {
  return <TypeSection value={sequenceDocument} component={SequenceType} />;
}

export default SequenceDisplay;
