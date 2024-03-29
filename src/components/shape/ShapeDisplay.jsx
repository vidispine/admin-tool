import React from 'react';

import TextGrid from '../ui/TextGrid';
import TextGridArray from '../ui/TextGridArray';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';
import {
  TimeBaseType,
  TimeCodeType,
  TimeIntervalType,
  KeyValuePairType,
  ResolutionType,
  RationalType,
  AspectRatioType,
} from '../ui/DisplayType';
import FileTypeTable from '../file/FileTypeTable';

export const SimpleMetadataType = ({ value = {} }) => (
  <TypeArray
    value={value}
    component={({ value: v }) => (
      <TextGrid
        title={v.key}
        value={v.value}
        titleStartCase={false}
        hideNoValue
        hover
      />
    )}
  />
);

const ComponentType = ({
  value = {}, title = 'Component', hideMetadata = true, ...props
}) => (
  <>
    <TextGrid
      title={`${title} ID`}
      value={value.id}
      {...props}
    />
    {!hideMetadata && (
      <TypeSection
        title={`${title} Metadata`}
        value={value.metadata}
        component={SimpleMetadataType}
        dense
        {...props}
      />
    )}
    <FileTypeTable
      title={`${title} Files`}
      // hide files if there is no component id
      value={value.id !== undefined ? value.file : undefined}
      hideNoValue={value.id === undefined}
      {...props}
    />
  </>
);

const MediaComponentType = ({ value = {}, title = 'Component', ...props }) => (
  <>
    <ComponentType
      title={title}
      value={value}
      {...props}
    />
    <TextGrid
      title="codec"
      value={value.codec}
      {...props}
    />
    <TypeSection
      title="timeBase"
      component={TimeBaseType}
      value={value.timeBase}
      hideNoValue
      hover
    />
    <TextGrid
      title="itemTrack"
      value={value.itemTrack}
      {...props}
    />
    <TextGrid
      title="essenceStreamId"
      value={value.essenceStreamId}
      {...props}
    />
    <TypeSection
      title="interval"
      component={TimeIntervalType}
      value={value.interval}
      hideNoValue
      hover
    />
    <TextGrid
      title="bitrate"
      value={value.bitrate}
      {...props}
    />
    <TextGrid
      title="numberOfPackets"
      value={value.numberOfPackets}
      {...props}
    />
    <TextGrid
      title="extradata"
      value={value.extradata}
      {...props}
    />
    <TextGrid
      title="pid"
      value={value.pid}
      {...props}
    />
    <TypeSection
      title="duration"
      component={TimeCodeType}
      value={value.duration}
      hideNoValue
      hover
    />
    <TextGrid
      title="profile"
      value={value.profile}
      {...props}
    />
    <TextGrid
      title="level"
      value={value.level}
      {...props}
    />
    <TypeSection
      title="startTimestamp"
      component={TimeCodeType}
      value={value.startTimestamp}
      hideNoValue
      hover
    />
    <TextGrid
      title="repeatCount"
      value={value.repeatCount}
      {...props}
    />
    <TextGrid
      title="trackOrder"
      value={value.trackOrder}
      {...props}
    />
    <TextGrid
      title="segment"
      value={value.segment}
      {...props}
    />
  </>
);

const BaseMediaInfoType = ({ value = {} }) => (
  <>
    <TypeArray
      component={KeyValuePairType}
      dense
      value={value.property}
      hideNoValue
      hover
    />
    <TextGrid
      title="Bit_rate_mode"
      value={value.Bit_rate_mode}
      hideNoValue
      hover
    />
    <TextGrid
      title="Source"
      value={value.Source}
      hideNoValue
      hover
    />
  </>
);

export const ContainerComponentType = ({ value = {} }) => (
  <>
    <ComponentType
      title="Container Component"
      value={value}
      hideNoValue
      hover
    />
    <TypeSection
      title="duration"
      component={TimeCodeType}
      value={value.duration}
      hideNoValue
      hover
    />
    <TextGrid
      title="format"
      value={value.format}
      hideNoValue
      hover
    />
    <TextGrid
      title="subFormat"
      value={value.subFormat}
      hideNoValue
      hover
    />
    <TextGrid
      title="firstSMPTETimecode"
      value={value.firstSMPTETimecode}
      hideNoValue
      hover
    />
    <TextGrid
      title="startTimecode"
      value={value.startTimecode}
      hideNoValue
      hover
    />
    <TypeSection
      title="startTimestamp"
      component={TimeCodeType}
      value={value.startTimestamp}
      hideNoValue
      hover
    />
    <TextGrid
      title="roundedTimeBase"
      value={value.roundedTimeBase}
      hideNoValue
      hover
    />
    <TextGrid
      title="dropFrame"
      value={value.dropFrame}
      hideNoValue
      hover
    />
    <TypeSection
      title="timeCodeTimeBase"
      component={TimeBaseType}
      value={value.timeCodeTimeBase}
      hideNoValue
      hover
    />
    <TypeSection
      title="mediaInfo"
      component={BaseMediaInfoType}
      value={value.mediaInfo}
      hideNoValue
      hover
    />
  </>
);

const ContainerComponentSection = ({ value = {} }) => (
  <TypeSection
    title="containerComponent"
    value={value.containerComponent}
    component={ContainerComponentType}
  />
);

export const DescriptorComponentType = ({ value = {} }) => (
  <>
    <ComponentType
      title="Descriptor Component"
      value={value}
      hideNoValue
      hover
    />
    <TypeArray
      value={value.description}
      hover={false}
      component={({ value: v }) => (
        <>
          <TextGrid
            value={v.value}
            variant="xml"
            title={v.type}
            hideCode
          />
        </>
      )}
    />
  </>
);

const DescriptorComponentSection = ({ value = {} }) => (
  <TypeArray
    title="Descriptor Component"
    titleKey="id"
    value={value.descriptorComponent}
    component={DescriptorComponentType}
    hover={false}
  />
);

export const BinaryComponentType = ({ value = {} }) => (
  <>
    <ComponentType
      title="Binary Component"
      value={value}
      hideNoValue
      hover
    />
    <TextGrid
      title="format"
      value={value.format}
      hideNoValue
      hover
    />
    <TextGrid
      title="encoding"
      value={value.encoding}
      hideNoValue
      hover
    />
    <TextGrid
      title="offset"
      value={value.offset}
      hideNoValue
      hover
    />
    <TextGrid
      title="length"
      value={value.length}
      hideNoValue
      hover
    />
    <TypeSection
      title="mediaInfo"
      component={BaseMediaInfoType}
      value={value.mediaInfo}
      hideNoValue
      hover
    />
  </>
);

const BinaryComponentSection = ({ value = {} }) => (
  <TypeArray
    title="Binary Component"
    titleKey="id"
    value={value.binaryComponent}
    component={BinaryComponentType}
    hover={false}
  />
);

export const AudioComponentType = ({ value = {} }) => (
  <>
    <MediaComponentType
      title="Audio Component"
      value={value}
      hideNoValue
      hover
    />
    <TextGrid
      title="channelCount"
      value={value.channelCount}
      hideNoValue
      hover
    />
    <TextGrid
      title="channelLayout"
      value={value.channelLayout}
      hideNoValue
      hover
    />
    <TextGrid
      title="sampleFormat"
      value={value.sampleFormat}
      hideNoValue
      hover
    />
    <TextGrid
      title="frameSize"
      value={value.frameSize}
      hideNoValue
      hover
    />
    <TextGrid
      title="blockAlign"
      value={value.blockAlign}
      hideNoValue
      hover
    />
    <TypeSection
      title="mediaInfo"
      component={BaseMediaInfoType}
      value={value.mediaInfo}
      hideNoValue
      hover
    />
  </>
);

const AudioComponentSection = ({ value = {} }) => (
  <TypeArray
    title="Audio Component"
    titleKey="id"
    value={value.audioComponent}
    component={AudioComponentType}
    hover={false}
  />
);

export const VideoComponentType = ({ value = {} }) => (
  <>
    <MediaComponentType
      title="Video Component"
      value={value}
      hideNoValue
      hover
    />
    <TypeSection
      title="resolution"
      component={ResolutionType}
      value={value.resolution}
      hideNoValue
      hover
    />
    <TextGrid
      title="pixelFormat"
      value={value.pixelFormat}
      hideNoValue
      hover
    />
    <TextGrid
      title="maxBFrames"
      value={value.maxBFrames}
      hideNoValue
      hover
    />
    <TypeSection
      title="pixelAspectRatio"
      component={AspectRatioType}
      value={value.pixelAspectRatio}
      hideNoValue
      hover
    />
    <TextGrid
      title="fieldOrder"
      value={value.fieldOrder}
      hideNoValue
      hover
    />
    <TypeSection
      title="codecTimeBase"
      component={TimeBaseType}
      value={value.codecTimeBase}
      hideNoValue
      hover
    />
    <TypeSection
      title="averageFrameRate"
      component={TimeBaseType}
      value={value.averageFrameRate}
      hideNoValue
      hover
    />
    <TypeSection
      title="realBaseFrameRate"
      component={TimeBaseType}
      value={value.realBaseFrameRate}
      hideNoValue
      hover
    />
    <TypeSection
      title="displayWidth"
      component={RationalType}
      value={value.displayWidth}
      hideNoValue
      hover
    />
    <TypeSection
      title="displayHeight"
      component={RationalType}
      value={value.displayHeight}
      hideNoValue
      hover
    />
    <TypeSection
      title="displayXOffset"
      component={RationalType}
      value={value.displayXOffset}
      hideNoValue
      hover
    />
    <TypeSection
      title="displayYOffset"
      component={RationalType}
      value={value.displayYOffset}
      hideNoValue
      hover
    />
    <TypeSection
      title="containerSAR"
      component={AspectRatioType}
      value={value.containerSAR}
      hideNoValue
      hover
    />
    <TextGrid
      title="colr_primaries"
      value={value.colr_primaries}
      hideNoValue
      hover
    />
    <TextGrid
      title="colr_transfer_function"
      value={value.colr_transfer_function}
      hideNoValue
      hover
    />
    <TextGrid
      title="colr_matrix"
      value={value.colr_matrix}
      hideNoValue
      hover
    />
    <TextGrid
      title="max_packet_size"
      value={value.max_packet_size}
      hideNoValue
      hover
    />
    <TextGrid
      title="startTimecode"
      value={value.startTimecode}
      hideNoValue
      hover
    />
    <TextGrid
      title="dropFrame"
      value={value.dropFrame}
      hideNoValue
      hover
    />
    <TextGrid
      title="ticks_per_frame"
      value={value.ticks_per_frame}
      hideNoValue
      hover
    />
    <TextGrid
      title="bitDepth"
      value={value.bitDepth}
      hideNoValue
      hover
    />
    <TextGrid
      title="bitsPerPixel"
      value={value.bitsPerPixel}
      hideNoValue
      hover
    />
    <TextGrid
      title="colorPrimaries"
      value={value.colorPrimaries}
      hideNoValue
      hover
    />
    <TypeSection
      title="mediaInfo"
      component={BaseMediaInfoType}
      value={value.mediaInfo}
      hideNoValue
      hover
    />
  </>
);

const VideoComponentSection = ({ value = {} }) => (
  <TypeArray
    title="Video Component"
    titleKey="id"
    value={value.videoComponent}
    component={VideoComponentType}
    hover={false}
  />
);

export const SubtitleComponentType = ({ value = {} }) => (
  <>
    <MediaComponentType
      title="Subtitle Component"
      value={value}
      hideNoValue
      hover
    />
  </>
);

const SubtitleComponentSection = ({ value = {} }) => (
  <TypeArray
    title="Subtitle Component"
    titleKey="id"
    value={value.subtitleComponent}
    component={SubtitleComponentType}
    hover={false}
  />
);

const MetadataSection = ({ value = {} }) => (
  <TypeSection
    title="Metadata"
    value={value.metadata}
    component={SimpleMetadataType}
  />
);

export const ShapeSection = ({ value = {} }) => (
  <>
    <TextGrid
      title="id"
      value={value.id}
      hideNoValue
      hover
    />
    <TextGrid
      title="created"
      value={value.created}
      hideNoValue
      hover
    />
    <TextGrid
      title="essenceVersion"
      value={value.essenceVersion}
      hideNoValue
      hover
    />
    <TextGridArray
      title="tag"
      value={value.tag}
      hideNoValue
      hover
    />
    <TextGridArray
      title="mimeType"
      value={value.mimeType}
      hideNoValue
      hover
    />
    <TextGrid
      title="uuid"
      value={value.uuid}
      hideNoValue
      hover
    />
  </>
);

export default function ShapeDisplay({
  shapeDocument,
}) {
  return (
    <>
      <TypeSection
        value={shapeDocument}
        component={SubtitleComponentSection}
      />
      <TypeSection
        value={shapeDocument}
        component={VideoComponentSection}
      />
      <TypeSection
        value={shapeDocument}
        component={AudioComponentSection}
      />
      <TypeSection
        value={shapeDocument}
        component={BinaryComponentSection}
      />
      <TypeSection
        value={shapeDocument}
        component={ContainerComponentSection}
      />
      <TypeSection
        value={shapeDocument}
        component={ShapeSection}
      />
      <TypeSection
        value={shapeDocument}
        component={DescriptorComponentSection}
      />
      <TypeSection
        value={shapeDocument}
        component={MetadataSection}
      />
    </>
  );
}
