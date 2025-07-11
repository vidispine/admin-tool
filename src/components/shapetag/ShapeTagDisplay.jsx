import TextGrid from '../ui/TextGrid';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

function FastStartSettingType({ value = {} }) {
  return (
    <>
      <TextGrid
        title="requireFastStart"
        value={value.requireFastStart}
        variant="boolean"
        hover
        hideNoValue
      />
      <TextGrid
        title="analyzeDuration"
        value={value.analyzeDuration}
        variant="boolean"
        hover
        hideNoValue
      />
    </>
  );
}

function ResolutionType({ value = {} }) {
  return (
    <>
      <TextGrid title="width" value={value.width} hover hideNoValue />
      <TextGrid title="height" value={value.height} hover hideNoValue />
    </>
  );
}

function AspectRatioType({ value = {} }) {
  return (
    <>
      <TextGrid title="horizontal" value={value.horizontal} hover hideNoValue />
      <TextGrid title="vertical" value={value.vertical} hover hideNoValue />
    </>
  );
}

function ScalingType({ value = {} }) {
  return (
    <>
      <TextGrid title="width" value={value.width} hover hideNoValue />
      <TextGrid title="height" value={value.height} hover hideNoValue />
      <TextGrid title="top" value={value.top} hover hideNoValue />
      <TextGrid title="bottom" value={value.bottom} hover hideNoValue />
      <TextGrid title="left" value={value.left} hover hideNoValue />
      <TextGrid title="right" value={value.right} hover hideNoValue />
      <TextGrid title="padColor" value={value.padColor} hover hideNoValue />
      <TextGrid title="rotate" value={value.rotate} hover hideNoValue />
      <TypeSection
        title="pixelAspectRatio"
        value={value.pixelAspectRatio}
        component={AspectRatioType}
        hideNoValue
      />
      <TypeSection
        title="targetDAR"
        value={value.targetDAR}
        component={AspectRatioType}
        hideNoValue
      />
    </>
  );
}

function KeyValuePairType({ value = {} }) {
  return (
    <>
      <TextGrid title="key" value={value.key} hover hideNoValue />
      <TextGrid title="value" value={value.value} hover hideNoValue />
    </>
  );
}

function RationalType({ value = {} }) {
  return (
    <>
      <TextGrid title="numerator" value={value.numerator} hover hideNoValue />
      <TextGrid title="denominator" value={value.denominator} hover hideNoValue />
    </>
  );
}

const TimeBaseType = RationalType;

export function TimeCodeType({ value = {} }) {
  return (
    <>
      <TextGrid title="samples" value={value.samples} hover hideNoValue />
      <TypeSection hideNoValue component={TimeBaseType} title="timeBase" value={value.timeBase} />
    </>
  );
}

function AudioTranscodePresetChannelMixType({ value = {} }) {
  return (
    <>
      <TextGrid title="id" value={value.id} hover hideNoValue />
      <TextGrid title="stream" value={value.stream} hover hideNoValue />
      <TextGrid title="channel" value={value.channel} hover hideNoValue />
      <TextGrid title="gain" value={value.gain} hover hideNoValue />
    </>
  );
}

function AudioTranscodePresetMixType({ value = {} }) {
  return (
    <>
      <TypeArray title="input" value={value.input} component={AudioTranscodePresetChannelMixType} />
      <TextGrid title="silence" value={value.silence} variant="boolean" hover hideNoValue />
    </>
  );
}

function NameURIPairType({ value = {} }) {
  return (
    <>
      <TextGrid title="name" value={value.name} hover hideNoValue />
      <TextGrid title="uri" value={value.uri} hover hideNoValue />
    </>
  );
}

function OtifPresetType({ value = {} }) {
  return (
    <>
      <TextGrid title="uuid" value={value.uuid} hover hideNoValue />
      <TextGrid title="versionMajor" value={value.versionMajor} hover hideNoValue />
      <TextGrid title="versionMinor" value={value.versionMinor} hover hideNoValue />
      <TextGrid title="versionPatch" value={value.versionPatch} hover hideNoValue />
      <TypeArray title="configuration" value={value.configuration} component={KeyValuePairType} />
      <TypeArray title="resource" value={value.resource} component={NameURIPairType} />
    </>
  );
}

function AudioOutputType({ value = {} }) {
  return (
    <>
      <TextGrid title="format" value={value.format} hover hideNoValue />
      <TextGrid title="codec" value={value.codec} hover hideNoValue />
      <TextGrid title="bitrate" value={value.bitrate} hover hideNoValue />
      <TypeSection hideNoValue title="framerate" component={TimeBaseType} value={value.framerate} />
      <TextGrid title="channel" value={value.channel} variant="list" hover hideNoValue />
      <TextGrid title="stream" value={value.stream} variant="list" hover hideNoValue />
    </>
  );
}

function AudioTranscodePresetType({ value = {} }) {
  return (
    <>
      <TextGrid title="format" value={value.format} hover hideNoValue />
      <TextGrid title="codec" value={value.codec} hover hideNoValue />
      <TextGrid title="bitrate" value={value.bitrate} hover hideNoValue />
      <TypeSection hideNoValue title="framerate" component={TimeBaseType} value={value.framerate} />
      <TextGrid title="channel" value={value.channel} variant="list" hover hideNoValue />
      <TextGrid title="stream" value={value.stream} variant="list" hover hideNoValue />
      <TextGrid title="preset" value={value.preset} variant="list" hover hideNoValue />
      <TextGrid title="noAudio" value={value.noAudio} variant="boolean" hover hideNoValue />
      <TypeArray title="setting" value={value.setting} component={KeyValuePairType} />
      <TypeArray title="mix" value={value.mix} component={AudioTranscodePresetMixType} />
      <TypeSection hideNoValue title="otif" component={OtifPresetType} value={value.otif} />
      <TextGrid title="monoFile" value={value.monoFile} variant="boolean" hover hideNoValue />
      <TextGrid title="allChannel" value={value.allChannel} variant="boolean" hover hideNoValue />
      <TypeArray title="output" value={value.output} component={AudioOutputType} />
    </>
  );
}

function AudioTrackTranscodePresetType({ value = {} }) {
  return (
    <>
      <TextGrid title="codec" value={value.codec} hover hideNoValue />
      <TextGrid title="bitrate" value={value.bitrate} hover hideNoValue />
      <TypeSection hideNoValue title="framerate" component={TimeBaseType} value={value.framerate} />
      <TextGrid title="channel" value={value.channel} variant="list" hover hideNoValue />
      <TextGrid title="preset" value={value.preset} variant="list" hover hideNoValue />
      <TypeArray title="setting" value={value.setting} component={KeyValuePairType} />
      <TypeArray title="mix" value={value.mix} component={AudioTranscodePresetMixType} />
    </>
  );
}

export function VideoTranscodePresetType({ value = {} }) {
  return (
    <>
      <TextGrid title="codec" value={value.codec} hover hideNoValue />
      <TextGrid title="bitrate" value={value.bitrate} hover hideNoValue />
      <TypeSection hideNoValue title="framerate" component={TimeBaseType} value={value.framerate} />
      <TypeSection
        hideNoValue
        title="resolution"
        component={ResolutionType}
        value={value.resolution}
      />
      <TypeSection hideNoValue title="scaling" component={ScalingType} value={value.scaling} />
      <TypeSection
        hideNoValue
        title="displayWidth"
        component={RationalType}
        value={value.displayWidth}
      />
      <TypeSection
        hideNoValue
        title="displayHeight"
        component={RationalType}
        value={value.displayHeight}
      />
      <TypeSection
        hideNoValue
        title="displayXOffset"
        component={RationalType}
        value={value.displayXOffset}
      />
      <TypeSection
        hideNoValue
        title="displayYOffset"
        component={RationalType}
        value={value.displayYOffset}
      />
      <TypeSection
        hideNoValue
        title="containerSAR"
        component={AspectRatioType}
        value={value.containerSAR}
      />
      <TextGrid title="forceCFR" value={value.forceCFR} hover hideNoValue variant="boolean" />
      <TextGrid title="gopSize" value={value.gopSize} hover hideNoValue />
      <TextGrid title="maxBFrames" value={value.maxBFrames} hover hideNoValue />
      <TextGrid title="pixelFormat" value={value.pixelFormat} hover hideNoValue />
      <TextGrid title="preset" value={value.preset} variant="list" hover hideNoValue />
      <TextGrid title="profile" value={value.profile} variant="list" hover hideNoValue />
      <TextGrid title="noVideo" value={value.noVideo} variant="boolean" hover hideNoValue />
      <TextGrid
        title="stripParameterSets"
        value={value.stripParameterSets}
        variant="boolean"
        hover
        hideNoValue
      />
      <TextGrid
        title="addParameterSets"
        value={value.addParameterSets}
        variant="boolean"
        hover
        hideNoValue
      />
      <TextGrid title="parameterSets" value={value.parameterSets} hover hideNoValue />
      <TypeArray title="setting" value={value.setting} component={KeyValuePairType} />
      <TextGrid
        title="burnTimecode"
        value={value.burnTimecode}
        variant="boolean"
        hover
        hideNoValue
      />
      <TextGrid
        title="burnSubtitles"
        value={value.burnSubtitles}
        variant="boolean"
        hover
        hideNoValue
      />
      <TextGrid title="imageQuality" value={value.imageQuality} hover hideNoValue />
      <TypeSection hideNoValue title="otif" component={OtifPresetType} value={value.otif} />
    </>
  );
}

function SequenceRangeType({ value = {} }) {
  return (
    <>
      <TextGrid title="start" value={value.start} hover hideNoValue />
      <TextGrid title="width" value={value.width} hover hideNoValue />
      <TextGrid title="count" value={value.count} hover hideNoValue />
      <TextGrid title="wildcard" value={value.wildcard} hover hideNoValue />
    </>
  );
}

function TimeIntervalType({ value = {} }) {
  return (
    <>
      <TypeSection hideNoValue title="start" component={TimeCodeType} value={value.start} />
      <TypeSection hideNoValue title="end" component={TimeCodeType} value={value.end} />
    </>
  );
}

function OverlayType({ value = {} }) {
  return (
    <>
      <TextGrid title="uri" value={value.uri} variant="list" hover />
      <TypeArray name="range" title="range" component={SequenceRangeType} value={value.range} />
      <TextGrid title="id" value={value.id} hover hideNoValue />
      <TextGrid title="x" value={value.x} hover hideNoValue />
      <TextGrid title="y" value={value.y} hover hideNoValue />
      <TypeSection
        hideNoValue
        title="interval"
        component={TimeIntervalType}
        value={value.interval}
      />
      <TextGrid title="opacity" value={value.opacity} hover hideNoValue />
    </>
  );
}

function TextRenditionType({ value = {} }) {
  return (
    <>
      <TextGrid title="line" value={value.line} variant="list" hover hideNoValue />
      <TextGrid title="align" value={value.align} hover hideNoValue />
      <TextGrid title="x" value={value.x} hover hideNoValue />
      <TextGrid title="y" value={value.y} hover hideNoValue />
      <TextGrid title="xRel" value={value.xRel} hover hideNoValue />
      <TextGrid title="yRel" value={value.yRel} hover hideNoValue />
      <TextGrid title="horizontalBase" value={value.horizontalBase} hover hideNoValue />
      <TextGrid title="verticalBase" value={value.verticalBase} hover hideNoValue />
      <TextGrid title="font" value={value.font} hover hideNoValue />
      <TextGrid title="size" value={value.size} hover hideNoValue />
      <TextGrid title="sizeRel" value={value.sizeRel} hover hideNoValue />
      <TextGrid title="r" value={value.r} hover hideNoValue />
      <TextGrid title="g" value={value.g} hover hideNoValue />
      <TextGrid title="b" value={value.b} hover hideNoValue />
      <TextGrid title="a" value={value.a} hover hideNoValue />
      <TextGrid title="outline" value={value.outline} hover hideNoValue />
      <TextGrid title="outlineSize" value={value.outlineSize} hover hideNoValue />
      <TextGrid title="outlineR" value={value.outlineR} hover hideNoValue />
      <TextGrid title="outlineG" value={value.outlineG} hover hideNoValue />
      <TextGrid title="outlineB" value={value.outlineB} hover hideNoValue />
      <TextGrid title="outlineA" value={value.outlineA} hover hideNoValue />
      <TextGrid title="language" value={value.language} hover hideNoValue />
    </>
  );
}

function TextOverlayType({ value = {} }) {
  return (
    <>
      <TypeSection hideNoValue title="text" component={TextRenditionType} value={value.text} />
      <TypeSection
        hideNoValue
        title="interval"
        component={TimeIntervalType}
        value={value.interval}
      />
      <TextGrid title="opacity" value={value.opacity} hover hideNoValue />
    </>
  );
}

function SequenceOutputType({ value = {} }) {
  return (
    <>
      <TextGrid title="start" value={value.start} hover hideNoValue />
      <TextGrid title="width" value={value.width} hover hideNoValue />
    </>
  );
}

export function ContainerSection({ value = {} }) {
  return (
    <>
      <TextGrid title="name" value={value.name} hover hideNoValue />
      <TextGrid title="description" value={value.description} hover hideNoValue />
      <TextGrid title="format" value={value.format} hover hideNoValue />
    </>
  );
}

export function AudioSection({ value = {} }) {
  return (
    <>
      <TypeSection hideNoValue component={AudioTranscodePresetType} value={value.audio} />
      <TypeSection
        hideNoValue
        title="audioTrack"
        component={AudioTrackTranscodePresetType}
        value={value.audioTrack}
      />
    </>
  );
}

export function VideoSection({ value = {} }) {
  return <TypeSection component={VideoTranscodePresetType} value={value.video} />;
}

export function OverlaySection({ value = {} }) {
  return (
    <>
      <TypeArray
        hideNoValue
        hover={false}
        title="overlay"
        component={OverlayType}
        value={value.overlay}
      />
      <TypeArray
        hideNoValue
        hover={false}
        title="textOverlay"
        component={TextOverlayType}
        value={value.textOverlay}
      />
    </>
  );
}

export function AdvancedSection({ value = {} }) {
  return (
    <>
      <TextGrid title="startTimecode" value={value.startTimecode} hover hideNoValue />
      <TypeSection
        hideNoValue
        name="fastStartSetting"
        title="fastStartSetting"
        component={FastStartSettingType}
        value={value.fastStartSetting}
      />
      <TextGrid title="faceDetect" value={value.faceDetect} variant="boolean" hover hideNoValue />
      <TextGrid title="preserveEDL" value={value.preserveEDL} variant="boolean" hover hideNoValue />
      <TextGrid title="addClipName" value={value.addClipName} variant="boolean" hover hideNoValue />
      <TextGrid title="preferredSourceTag" value={value.preferredSourceTag} hover hideNoValue />
      <TypeArray
        name="shapeMetadata"
        title="shapeMetadata"
        component={KeyValuePairType}
        value={value.shapeMetadata}
      />
      <TypeSection
        hideNoValue
        name="maxChunkDuration"
        title="maxChunkDuration"
        component={TimeCodeType}
        value={value.maxChunkDuration}
      />
      <TypeArray
        name="demuxerSetting"
        title="demuxerSetting"
        component={KeyValuePairType}
        value={value.demuxerSetting}
      />
      <TypeArray
        name="muxerSetting"
        title="muxerSetting"
        component={KeyValuePairType}
        value={value.muxerSetting}
      />
      <TypeSection
        hideNoValue
        name="sequenceOutput"
        title="sequenceOutput"
        component={SequenceOutputType}
        value={value.SequenceOutputType}
      />
    </>
  );
}

export function ThumbnailSection({ value = {} }) {
  return (
    <>
      <TypeSection
        hideNoValue
        name="thumbnailResolution"
        title="thumbnailResolution"
        component={ResolutionType}
        value={value.thumbnailResolution}
      />
      <TextGrid title="thumbnailBackground" value={value.thumbnailBackground} hover hideNoValue />
      <TypeSection
        hideNoValue
        name="thumbnailPeriod"
        title="thumbnailPeriod"
        component={TimeCodeType}
        value={value.thumbnailPeriod}
      />
      <TextGrid title="thumbnailPlugin" value={value.thumbnailPlugin} hover hideNoValue />
      <TypeSection
        hideNoValue
        name="posterResolution"
        title="posterResolution"
        component={ResolutionType}
        value={value.posterResolution}
      />
      <TextGrid title="posterBackground" value={value.posterBackground} hover hideNoValue />
    </>
  );
}

export function ScriptSection({ value = {} }) {
  return <TextGrid value={value.script} variant="javascript" />;
}

export function ShapeTagContainerDisplay({ transcodePresetDocument }) {
  return <TypeSection component={ContainerSection} value={transcodePresetDocument} />;
}

export function ShapeTagAudioDisplay({ transcodePresetDocument }) {
  return <TypeSection component={AudioSection} value={transcodePresetDocument} />;
}

export function ShapeTagVideoDisplay({ transcodePresetDocument }) {
  return <TypeSection component={VideoSection} value={transcodePresetDocument} />;
}

export function ShapeTagThumbnailDisplay({ transcodePresetDocument }) {
  return <TypeSection component={ThumbnailSection} value={transcodePresetDocument} />;
}

export function ShapeTagOverlayDisplay({ transcodePresetDocument }) {
  return <TypeSection component={OverlaySection} value={transcodePresetDocument} />;
}

export function ShapeTagAdvancedDisplay({ transcodePresetDocument }) {
  return <TypeSection component={AdvancedSection} value={transcodePresetDocument} />;
}

export function ShapeTagScriptDisplay({ transcodePresetDocument }) {
  return <TypeSection component={ScriptSection} value={transcodePresetDocument} />;
}

export function TranscodePresetType({ value = {} }) {
  return (
    <>
      <TypeSection component={ContainerSection} value={value} />
      <TypeSection component={AudioSection} value={value} />
      <TypeSection component={VideoSection} value={value} />
      <TypeSection component={ThumbnailSection} value={value} />
      <TypeSection component={OverlaySection} value={value} />
      <TypeSection component={AdvancedSection} value={value} />
      <TypeSection component={ScriptSection} value={value} />
    </>
  );
}

export default function ShapeTagDisplay({ transcodePresetDocument }) {
  return (
    <>
      <TypeSection component={ContainerSection} value={transcodePresetDocument} />
      <TypeSection component={AudioSection} value={transcodePresetDocument} />
      <TypeSection component={VideoSection} value={transcodePresetDocument} />
      <TypeSection component={ThumbnailSection} value={transcodePresetDocument} />
      <TypeSection component={OverlaySection} value={transcodePresetDocument} />
      <TypeSection component={AdvancedSection} value={transcodePresetDocument} />
      <TypeSection component={ScriptSection} value={transcodePresetDocument} />
    </>
  );
}
