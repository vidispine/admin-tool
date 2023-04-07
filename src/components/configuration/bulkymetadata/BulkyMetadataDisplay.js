import React from 'react';

import TextGrid from '../../ui/TextGrid';
import TypeSection from '../../ui/TypeSection';

const BulkyMetadataConfigurationType = ({ value = {} }) => (
  <>
    <TextGrid
      title="uri"
      value={value.uri}
      hover
    />
    <TextGrid
      title="Storage Disabled"
      value={value.storageDisabled}
      variant="boolean"
      hover
    />
    <TypeSection
      value={value.status}
      component={({ value: { metadataInDatabase, metadataOnStorage, storageStatus } = {} }) => (
        <>
          <TextGrid
            title="metadataInDatabase"
            value={metadataInDatabase}
            hover
          />
          <TextGrid
            title="metadataOnStorage"
            value={metadataOnStorage}
            hover
          />
          <TextGrid
            title="storageStatus"
            value={storageStatus}
            hover
          />
        </>
      )}
    />
  </>
);

export default function BulkyMetadataDisplay({
  bulkyMetadataConfigurationDocument,
}) {
  return (
    <>
      <TypeSection
        value={bulkyMetadataConfigurationDocument}
        component={BulkyMetadataConfigurationType}
      />
    </>
  );
}
