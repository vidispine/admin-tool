import React from 'react';

import TextGrid from '../../ui/TextGrid';
import TypeSection from '../../ui/TypeSection';

const DatabasePurgingConfigurationType = ({ value = {} }) => (
  <>
    <TypeSection
      title="Change Log"
      value={value.changeLog}
      component={({ value: { age, forceAge } = {} }) => (
        <>
          <TextGrid
            title="Age"
            value={age}
            hover
          />
          <TextGrid
            title="Force Age"
            value={forceAge}
            hover
          />
        </>
      )}
    />
    <TypeSection
      title="Audit Trail"
      value={value.auditTrail}
      component={({
        value: {
          age, uri, compress, batch, body,
        } = {},
      }) => (
        <>
          <TextGrid
            title="Age"
            value={age}
            hover
          />
          <TextGrid
            title="URI"
            value={uri}
            hover
          />
          <TextGrid
            title="Compress"
            value={compress}
            variant="boolean"
            hover
          />
          <TextGrid
            title="Batch"
            value={batch}
            hover
          />
          <TextGrid
            title="Body"
            value={body}
            variant="boolean"
            hover
          />
        </>
      )}
    />
    <TypeSection
      title="job"
      value={value.job}
      component={({ value: { age, uri, compress } = {} }) => (
        <>
          <TextGrid
            title="Age"
            value={age}
            hover
          />
          <TextGrid
            title="URI"
            value={uri}
            hover
          />
          <TextGrid
            title="Compress"
            value={compress}
            variant="boolean"
            hover
          />
        </>
      )}
    />
    <TypeSection
      title="Transfer Log"
      value={value.transferLog}
      component={({
        value: {
          age, uri, compress, batch, forceAge,
        } = {},
      }) => (
        <>
          <TextGrid
            title="Age"
            value={age}
            hover
          />
          <TextGrid
            title="Force Age"
            value={forceAge}
            hover
          />
          <TextGrid
            title="URI"
            value={uri}
            hover
          />
          <TextGrid
            title="Compress"
            value={compress}
            variant="boolean"
            hover
          />
          <TextGrid
            title="batch"
            value={batch}
            hover
          />
        </>
      )}
    />
  </>
);

export default function DatabasePurgingDisplay({
  databasePurgingConfigurationDocument,
}) {
  return (
    <>
      <TypeSection
        value={databasePurgingConfigurationDocument}
        component={DatabasePurgingConfigurationType}
      />
    </>
  );
}
