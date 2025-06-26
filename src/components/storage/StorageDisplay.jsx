import { SimpleMetadataType, KeyValuePairType } from '../ui/DisplayType';
import TextGrid from '../ui/TextGrid';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

function StorageFileSequenceType({ value = {} }) {
  return (
    <>
      <TextGrid title="regex" value={value.regex} />
      <TextGrid title="numGroup" value={value.numGroup} />
    </>
  );
}

export function StorageMethodType({ value = {} }) {
  return (
    <>
      <TextGrid title="id" value={value.id} />
      <TextGrid title="uri" value={value.uri} />
      <TextGrid title="read" variant="checkbox" value={value.read} />
      <TextGrid title="write" variant="checkbox" value={value.write} />
      <TextGrid title="browse" variant="checkbox" value={value.browse} />
      <TextGrid title="lastSuccess" value={value.lastSuccess} variant="timestamp" />
      <TextGrid title="lastFailure" value={value.lastFailure} variant="timestamp" />
      <TextGrid title="bandwidth" value={value.value} />
      <TextGrid title="failureMessage" value={value.failureMessage} />
      <TextGrid title="type" value={value.type} />
      <TextGrid title="loc" value={value.loc} />
      <TypeArray title="metadata" value={value.metadata} component={SimpleMetadataType} />
      <TypeArray title="resourceTag" value={value.resourceTag} component={KeyValuePairType} />
    </>
  );
}

function StorageSection({ value = {} }) {
  return (
    <>
      {/* <TextGrid title="id" value={value.id} hideNoValue hover /> */}
      <TextGrid title="type" value={value.type} hideNoValue hover />
      <TextGrid title="state" value={value.state} hideNoValue hover />
      <TextGrid title="priority" value={value.priority} hideNoValue hover />
      <TextGrid title="Last Scan" value={value.timestamp} variant="fromnow" hideNoValue hover />
      <TextGrid title="capacity" value={value.capacity} variant="bytes" hideNoValue hover />
      <TextGrid title="autoDetect" value={value.autoDetect} hideNoValue hover />
      <TextGrid title="showImportables" value={value.showImportables} hideNoValue hover />
      <TextGrid title="timestamp" value={value.timestamp} variant="timestring" hideNoValue hover />
      <TextGrid
        title="scanInterval"
        value={value.scanInterval}
        variant="seconds"
        hideNoValue
        hover
      />
      <TypeArray title="resourceTag" value={value.resourceTag} component={KeyValuePairType} />
    </>
  );
}

export function StorageBasicDisplay({ value = {} }) {
  return <TypeSection component={StorageSection} value={value} />;
}

function MethodSection({ value = {} }) {
  return (
    <TypeArray title="method" titleKey="id" value={value.method} component={StorageMethodType} />
  );
}

export function StorageMethodDisplay({ value = {} }) {
  return <TypeSection component={MethodSection} value={value} />;
}

function AdvancedSection({ value = {} }) {
  return (
    <>
      <TextGrid title="bandwidth" value={value.bandwidth} hover />
      <TextGrid title="lowWatermark" value={value.lowWatermark} variant="bytes" hover />
      <TextGrid title="highWatermark" value={value.highWatermark} variant="bytes" hover />
      <TextGrid title="lowWatermarkPercentage" value={value.lowWatermarkPercentage} hover />
      <TextGrid title="lowWatermarkPercentage" value={value.lowWatermarkPercentage} hover />
      <TextGrid title="bean" value={value.bean} hover />
      <TextGrid title="projection" value={value.projection} hover />
      <TypeArray
        title="sequence"
        value={value.sequence}
        component={StorageFileSequenceType}
        hover
      />
      <TextGrid title="sequenceTimeout" value={value.sequenceTimeout} hover />
    </>
  );
}

export function StorageAdvancedDisplay({ value = {} }) {
  return <TypeSection component={AdvancedSection} value={value} />;
}

function MetadataSection({ value = {} }) {
  return <TypeSection value={value.metadata} component={SimpleMetadataType} />;
}

export function StorageMetadataDisplay({ value = {} }) {
  return <TypeSection component={MetadataSection} value={value} />;
}

function ScriptSection({ value = {} }) {
  return <TextGrid title="archiveScript" value={value.archiveScript} variant="code" hideNoValue />;
}

export function StorageScriptDisplay({ value = {} }) {
  return <TypeSection component={ScriptSection} value={value} />;
}

export default function StorageDisplay({ value }) {
  return (
    <>
      <TypeSection value={value} component={StorageSection} />
      <TypeSection value={value} component={MethodSection} />
      <TypeSection value={value} component={AdvancedSection} />
      <TypeSection value={value} component={MetadataSection} />
      <TypeSection value={value} component={ScriptSection} />
    </>
  );
}
