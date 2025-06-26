import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import ChipInput from '../ui/ChipInput';
import CodeField from '../ui/CodeField';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';

// Figure out fastStartDuration field
function FastStartSettingType() {
  return (
    <>
      <FormControlLabel
        control={<Field name="requireFastStart" component={BoolCheckbox} />}
        label="requireFastStart"
      />
      <FormControlLabel
        control={<Field name="analyzeDuration" component={BoolCheckbox} />}
        label="analyzeDuration"
      />
    </>
  );
}

function ResolutionType() {
  return (
    <>
      <Field name="width" label="width" component={TextField} fullWidth type="number" />
      <Field name="height" label="height" component={TextField} type="number" fullWidth />
    </>
  );
}

function AspectRatioType() {
  return (
    <>
      <Field name="horizontal" label="horizontal" component={TextField} type="number" fullWidth />
      <Field name="vertical" label="vertical" component={TextField} type="number" fullWidth />
    </>
  );
}

function ScalingType() {
  return (
    <>
      <Field name="width" label="width" component={TextField} fullWidth type="number" />
      <Field name="height" label="height" component={TextField} type="number" fullWidth />
      <Field name="top" label="top" component={TextField} type="number" fullWidth />
      <Field name="bottom" label="bottom" component={TextField} type="number" fullWidth />
      <Field name="left" label="left" component={TextField} type="number" fullWidth />
      <Field name="right" label="right" component={TextField} type="number" fullWidth />
      <Field name="padColor" label="padColor" component={TextField} fullWidth />
      <Field name="rotate" label="rotate" component={TextField} fullWidth />
      <FormSection name="pixelAspectRatio" label="pixelAspectRatio" component={AspectRatioType} />
      <FormSection name="targetDAR" label="targetDAR" component={AspectRatioType} />
    </>
  );
}

function KeyValuePairType() {
  return (
    <>
      <Field name="key" label="key" component={TextField} fullWidth />
      <Field name="value" label="value" component={TextField} fullWidth />
    </>
  );
}

function RationalType() {
  return (
    <>
      <Field name="numerator" label="numerator" component={TextField} type="number" fullWidth />
      <Field name="denominator" label="denominator" component={TextField} type="number" fullWidth />
    </>
  );
}

const TimeBaseType = RationalType;

function TimeCodeType() {
  return (
    <>
      <Field name="samples" label="samples" component={TextField} type="number" fullWidth />
      <FormSection name="timeBase" label="timeBase" type="number" component={TimeBaseType} />
    </>
  );
}

function AudioTranscodePresetChannelMixType() {
  return (
    <>
      <Field name="id" label="id" component={TextField} type="number" fullWidth />
      <Field name="stream" label="stream" type="number" component={TextField} fullWidth />
      <Field name="channel" label="channel" type="number" component={TextField} fullWidth />
      <Field name="gain" label="gain" type="number" component={TextField} fullWidth />
    </>
  );
}

function AudioTranscodePresetMixType() {
  return (
    <>
      <FieldTypeArray name="input" label="input" component={AudioTranscodePresetChannelMixType} />
      <FormControlLabel
        control={<Field name="silence" component={BoolCheckbox} />}
        label="silence"
      />
    </>
  );
}

function NameURIPairType() {
  return (
    <>
      <Field name="name" label="name" component={TextField} fullWidth required />
      <Field name="uri" label="uri" component={TextField} fullWidth required />
    </>
  );
}

export function OtifPresetType() {
  return (
    <>
      <Field name="uuid" label="uuid" component={TextField} fullWidth required />
      <Field
        name="versionMajor"
        label="versionMajor"
        type="number"
        component={TextField}
        fullWidth
        required
      />
      <Field
        name="versionMinor"
        label="versionMinor"
        type="number"
        component={TextField}
        fullWidth
        required
      />
      <Field
        name="versionPatch"
        label="versionPatch"
        type="number"
        component={TextField}
        fullWidth
        required
      />
      <FieldTypeArray name="configuration" label="configuration" component={KeyValuePairType} />
      <FieldTypeArray name="resource" label="resource" component={NameURIPairType} />
    </>
  );
}

function AudioOutputType() {
  return (
    <>
      <Field name="format" label="format" component={TextField} fullWidth />
      <Field name="codec" label="codec" component={TextField} fullWidth />
      <Field name="bitrate" label="bitrate" type="number" component={TextField} fullWidth />
      <FormSection name="framerate" label="framerate" component={TimeBaseType} />
      <Field name="channel" label="channel" component={ChipInput} simple fullWidth />
      <Field name="stream" label="stream" component={ChipInput} simple fullWidth />
    </>
  );
}

function AudioTranscodePresetType() {
  return (
    <>
      <Field name="codec" label="codec" component={TextField} fullWidth />
      <Field name="bitrate" label="bitrate" type="number" component={TextField} fullWidth />
      <FormSection name="framerate" label="framerate" component={TimeBaseType} />
      <Field name="channel" label="channel" component={ChipInput} simple fullWidth />
      <Field name="stream" label="stream" component={ChipInput} simple fullWidth />
      <Field name="preset" label="preset" component={ChipInput} simple fullWidth />
      <FormControlLabel
        control={<Field name="noAudio" component={BoolCheckbox} />}
        label="noAudio"
      />
      <FieldTypeArray name="setting" label="setting" component={KeyValuePairType} />
      <FieldTypeArray name="mix" label="mix" component={AudioTranscodePresetMixType} />
      <FormSection name="otif" label="otif" component={OtifPresetType} />
      <FormControlLabel
        control={<Field name="monoFile" component={BoolCheckbox} />}
        label="monoFile"
      />
      <FormControlLabel
        control={<Field name="allChannel" component={BoolCheckbox} />}
        label="allChannel"
      />
      <FieldTypeArray name="output" label="output" component={AudioOutputType} />
    </>
  );
}

function AudioTrackTranscodePresetType() {
  return (
    <>
      <Field name="codec" label="codec" component={TextField} fullWidth />
      <Field name="bitrate" label="bitrate" type="number" component={TextField} fullWidth />
      <FormSection name="framerate" label="framerate" component={TimeBaseType} />
      <Field name="channel" label="channel" component={ChipInput} simple fullWidth />
      <Field name="preset" label="preset" component={ChipInput} simple fullWidth />
      <FieldTypeArray name="setting" label="setting" component={KeyValuePairType} />
      <FieldTypeArray name="mix" label="mix" component={AudioTranscodePresetMixType} />
    </>
  );
}

function VideoTranscodePresetType() {
  return (
    <>
      <Field name="codec" label="codec" component={TextField} fullWidth />
      <Field name="bitrate" label="bitrate" type="number" component={TextField} fullWidth />
      <FormSection name="framerate" label="framerate" component={TimeBaseType} />
      <FormSection name="resolution" label="resolution" component={ResolutionType} />
      <FormSection name="scaling" label="scaling" component={ScalingType} />
      <FormSection name="displayWidth" label="displayWidth" component={RationalType} />
      <FormSection name="displayHeight" label="displayHeight" component={RationalType} />
      <FormSection name="displayXOffset" label="displayXOffset" component={RationalType} />
      <FormSection name="displayYOffset" label="displayYOffset" component={RationalType} />
      <FormSection name="containerSAR" label="containerSAR" component={AspectRatioType} />
      <FormControlLabel
        control={<Field name="forceCFR" component={BoolCheckbox} />}
        label="forceCFR"
      />
      <Field name="gopSize" label="gopSize" type="number" component={TextField} fullWidth />
      <Field name="maxBFrames" label="maxBFrames" type="number" component={TextField} fullWidth />
      <Field name="pixelFormat" label="pixelFormat" component={TextField} fullWidth />
      <Field name="preset" label="preset" component={ChipInput} simple fullWidth />
      <Field name="profile" label="profile" component={ChipInput} simple fullWidth />
      <FormControlLabel
        control={<Field name="noVideo" component={BoolCheckbox} />}
        label="noVideo"
      />
      <FormControlLabel
        control={<Field name="stripParameterSets" component={BoolCheckbox} />}
        label="stripParameterSets"
      />
      <FormControlLabel
        control={<Field name="addParameterSets" component={BoolCheckbox} />}
        label="addParameterSets"
      />
      <Field name="parameterSets" label="parameterSets" component={TextField} fullWidth />
      <FieldTypeArray name="setting" label="setting" component={KeyValuePairType} />
      <FormControlLabel
        control={<Field name="burnTimecode" component={BoolCheckbox} />}
        label="burnTimecode"
      />
      <FormControlLabel
        control={<Field name="burnSubtitles" component={BoolCheckbox} />}
        label="burnSubtitles"
      />
      <Field
        name="imageQuality"
        label="imageQuality"
        type="number"
        component={TextField}
        fullWidth
      />
      <FormSection name="otif" label="otif" component={OtifPresetType} />
    </>
  );
}

function SequenceRangeType() {
  return (
    <>
      <Field name="start" label="start" type="number" component={TextField} required fullWidth />
      <Field name="width" label="width" type="number" component={TextField} fullWidth />
      <Field name="count" label="count" type="number" component={TextField} fullWidth />
      <Field name="wildcard" label="wildcard" component={TextField} required fullWidth />
    </>
  );
}

function TimeIntervalType() {
  return (
    <>
      <FormSection name="start" label="start" component={TimeCodeType} />
      <FormSection name="end" label="end" component={TimeCodeType} />
    </>
  );
}

function OverlayType() {
  return (
    <>
      <Field name="uri" label="uri" component={ChipInput} simple fullWidth />
      <FieldTypeArray name="range" label="range" component={SequenceRangeType} />
      <Field name="id" label="id" component={TextField} fullWidth />
      <Field name="x" label="x" type="number" component={TextField} fullWidth />
      <Field name="y" label="y" type="number" component={TextField} fullWidth />
      <FormSection name="interval" label="interval" component={TimeIntervalType} />
      <Field name="opacity" label="opacity" type="number" component={TextField} fullWidth />
    </>
  );
}

function TextRenditionType() {
  return (
    <>
      <Field name="line" label="line" component={ChipInput} simple fullWidth />
      <Field name="align" label="align" component={TextField} fullWidth />
      <Field name="x" label="x" type="number" component={TextField} fullWidth />
      <Field name="y" label="y" type="number" component={TextField} fullWidth />
      <Field name="xRel" label="xRel" type="number" component={TextField} fullWidth />
      <Field name="yRel" label="yRel" type="number" component={TextField} fullWidth />
      <Field name="horizontalBase" label="horizontalBase" component={TextField} fullWidth />
      <Field name="verticalBase" label="verticalBase" component={TextField} fullWidth />
      <Field name="font" label="font" component={TextField} fullWidth />
      <Field name="size" label="size" type="number" component={TextField} fullWidth />
      <Field name="sizeRel" label="sizeRel" type="number" component={TextField} fullWidth />
      <Field name="r" label="r" component={TextField} fullWidth />
      <Field name="g" label="g" component={TextField} fullWidth />
      <Field name="b" label="b" component={TextField} fullWidth />
      <Field name="a" label="a" component={TextField} fullWidth />
      <Field name="outline" label="outline" component={TextField} fullWidth />
      <Field name="outlineSize" label="outlineSize" type="number" component={TextField} fullWidth />
      <Field name="outlineR" label="outlineR" component={TextField} fullWidth />
      <Field name="outlineG" label="outlineG" component={TextField} fullWidth />
      <Field name="outlineB" label="outlineB" component={TextField} fullWidth />
      <Field name="outlineA" label="outlineA" component={TextField} fullWidth />
      <Field name="language" label="language" component={TextField} fullWidth />
    </>
  );
}

function TextOverlayType() {
  return (
    <>
      <FormSection name="text" label="text" component={TextRenditionType} />
      <FormSection name="interval" label="interval" component={TimeIntervalType} />
      <Field name="opacity" label="opacity" component={TextField} type="number" fullWidth />
    </>
  );
}

function SequenceOutputType() {
  return (
    <>
      <Field name="start" label="start" type="number" component={TextField} fullWidth />
      <Field name="width" label="width" type="number" component={TextField} fullWidth />
    </>
  );
}

function ContainerSection() {
  return (
    <>
      <Field name="name" label="Name" component={InitialDisabledTextField} required fullWidth />
      <Field name="description" label="description" component={TextField} fullWidth />
      <Field name="format" label="format" component={TextField} fullWidth />
    </>
  );
}

function ContainerForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="transcodePresetDocument" component={ContainerSection} />
      <button type="submit" hidden />
    </form>
  );
}

export const ShapeTagContainerForm = reduxForm()(ContainerForm);

function AudioSection() {
  return (
    <>
      <FormSection name="audio" label="audio" component={AudioTranscodePresetType} />
      <FieldTypeArray
        name="audioTrack"
        label="audioTrack"
        component={AudioTrackTranscodePresetType}
      />
    </>
  );
}

function AudioForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="transcodePresetDocument" component={AudioSection} />
      <button type="submit" hidden />
    </form>
  );
}

export const ShapeTagAudioForm = reduxForm()(AudioForm);

function VideoSection() {
  return <FormSection name="video" label="video" component={VideoTranscodePresetType} />;
}

function VideoForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="transcodePresetDocument" component={VideoSection} />
      <button type="submit" hidden />
    </form>
  );
}

export const ShapeTagVideoForm = reduxForm()(VideoForm);

function OverlaySection() {
  return (
    <>
      <FieldTypeArray name="overlay" label="overlay" component={OverlayType} />
      <FieldTypeArray name="textOverlay" label="textOverlay" component={TextOverlayType} />
    </>
  );
}

function OverlayForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="transcodePresetDocument" component={OverlaySection} />
      <button type="submit" hidden />
    </form>
  );
}

export const ShapeTagOverlayForm = reduxForm()(OverlayForm);

function AdvancedSection() {
  return (
    <>
      <Field name="startTimecode" label="startTimecode" component={TextField} fullWidth />
      <FormSection
        name="fastStartSetting"
        label="fastStartSetting"
        component={FastStartSettingType}
      />
      <FormControlLabel
        control={<Field name="faceDetect" component={BoolCheckbox} />}
        label="faceDetect"
      />
      <FormControlLabel
        control={<Field name="preserveEDL" component={BoolCheckbox} />}
        label="preserveEDL"
      />
      <FormControlLabel
        control={<Field name="addClipName" component={BoolCheckbox} />}
        label="addClipName"
      />
      <Field name="preferredSourceTag" label="preferredSourceTag" component={TextField} fullWidth />
      <FieldTypeArray name="shapeMetadata" label="shapeMetadata" component={KeyValuePairType} />
      <FormSection name="maxChunkDuration" label="maxChunkDuration" component={TimeCodeType} />
      <FieldTypeArray name="demuxerSetting" label="demuxerSetting" component={KeyValuePairType} />
      <FieldTypeArray name="muxerSetting" label="muxerSetting" component={KeyValuePairType} />
      <FormSection name="sequenceOutput" label="sequenceOutput" component={SequenceOutputType} />
    </>
  );
}

function AdvancedForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="transcodePresetDocument" component={AdvancedSection} />
      <button type="submit" hidden />
    </form>
  );
}

export const ShapeTagAdvancedForm = reduxForm()(AdvancedForm);

function ThumbnailSection() {
  return (
    <>
      <FormSection
        name="thumbnailResolution"
        label="thumbnailResolution"
        component={ResolutionType}
      />
      <Field
        name="thumbnailBackground"
        label="thumbnailBackground"
        component={TextField}
        fullWidth
      />
      <FormSection name="thumbnailPeriod" label="thumbnailPeriod" component={TimeCodeType} />
      <Field name="thumbnailPlugin" label="thumbnailPlugin" component={TextField} fullWidth />
      <FormSection name="posterResolution" label="posterResolution" component={ResolutionType} />
      <Field name="posterBackground" label="posterBackground" component={TextField} fullWidth />
    </>
  );
}

function ThumbnailForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="transcodePresetDocument" component={ThumbnailSection} />
      <button type="submit" hidden />
    </form>
  );
}

export const ShapeTagThumbnailForm = reduxForm()(ThumbnailForm);

function ScriptSection() {
  return (
    <Field
      name="script"
      component={CodeField}
      options={{
        theme: 'material',
        mode: 'application/json',
        lineWrapping: true,
        lineNumbers: true,
      }}
    />
  );
}

function ScriptForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="transcodePresetDocument" component={ScriptSection} />
      <button type="submit" hidden />
    </form>
  );
}

export const ShapeTagScriptForm = reduxForm()(ScriptForm);

function ShapeTagForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="transcodePresetDocument" component={ContainerSection} />
      <FormSection name="transcodePresetDocument" component={AudioSection} />
      <FormSection name="transcodePresetDocument" component={VideoSection} />
      <FormSection name="transcodePresetDocument" component={ThumbnailSection} />
      <FormSection name="transcodePresetDocument" component={OverlaySection} />
      <FormSection name="transcodePresetDocument" component={AdvancedSection} />
      <FormSection name="transcodePresetDocument" component={ScriptSection} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeTagForm);
