import Typography from '@material-ui/core/Typography';

import { MetadataType } from '../metadata/MetadataDisplay';
import { SimpleMetadataType } from '../ui/SimpleMetadataDisplay';
import TextGrid from '../ui/TextGrid';
import TypeArray from '../ui/TypeArray';

function FilenameFilterType({ pattern, tag }) {
  return (
    <>
      <TextGrid title="Pattern" value={pattern} />
      <TextGrid title="Tag" variant="list" value={tag} />
    </>
  );
}

export function AutoImportRuleType({ rule }) {
  return (
    <>
      <TextGrid title="Storage ID" variant="storageId" value={rule.storage} hover />
      <TextGrid title="Enabled" variant="boolean" value={rule.enabled} hover />
      <TextGrid title="File Name As Title" variant="boolean" value={rule.fileNameAsTitle} hover />
      <TextGrid
        title="Ignore Sidecar Import"
        variant="boolean"
        value={rule.ignoreSidecarImport}
        hover
      />
      <TextGrid title="Shape Tags" variant="list" value={rule.tag} hover />
      <TextGrid title="Resource ID" value={rule.resourceId} hover />
      <TextGrid title="Settings ID" value={rule.settingsId} hover />
      <TextGrid title="Projection" value={rule.projection} hover />
      <TextGrid title="User" variant="user" value={rule.user} hover />
      {rule.excludeFilter && (
        <TypeArray
          title="Exclude Filter"
          value={rule.excludeFilter}
          component={FilenameFilterType}
          hover
        />
      )}
      {rule.shapeTagFilter && (
        <TypeArray
          title="Shape Tag Filter"
          value={rule.shapeTagFilter}
          component={FilenameFilterType}
          hover
        />
      )}
      {rule.jobmetadata && (
        <>
          <Typography variant="caption">Job Metadata</Typography>
          <SimpleMetadataType simpleMetadata={rule.jobmetadata} />
        </>
      )}
      {rule.metadata && (
        <>
          <Typography variant="caption">Metadata</Typography>
          <MetadataType value={rule.metadata} />
        </>
      )}
    </>
  );
}

export default function AutoImportRuleDisplay({ autoImportRuleDocument }) {
  return <AutoImportRuleType rule={autoImportRuleDocument} />;
}
