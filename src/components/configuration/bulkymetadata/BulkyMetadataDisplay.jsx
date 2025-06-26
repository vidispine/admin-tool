import TextGrid from '../../ui/TextGrid';
import TypeSection from '../../ui/TypeSection';

function BulkyMetadataConfigurationStatusType({
  value: { metadataInDatabase, metadataOnStorage, storageStatus } = {},
}) {
  return (
    <>
      <TextGrid title="metadataInDatabase" value={metadataInDatabase} hover />
      <TextGrid title="metadataOnStorage" value={metadataOnStorage} hover />
      <TextGrid title="storageStatus" value={storageStatus} hover />
    </>
  );
}

function BulkyMetadataConfigurationType({ value = {} }) {
  return (
    <>
      <TextGrid title="uri" value={value.uri} hover />
      <TextGrid title="Storage Disabled" value={value.storageDisabled} variant="boolean" hover />
      <TypeSection value={value.status} component={BulkyMetadataConfigurationStatusType} />
    </>
  );
}

export default function BulkyMetadataDisplay({ bulkyMetadataConfigurationDocument }) {
  return (
    <TypeSection
      value={bulkyMetadataConfigurationDocument}
      component={BulkyMetadataConfigurationType}
    />
  );
}
