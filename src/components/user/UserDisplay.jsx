import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';
import { SimpleMetadataType } from '../ui/DisplayType';

const GroupType = ({ value = {} }) => (
  <TextGrid
    title="Group Name"
    value={value.groupName}
  />
);

const GroupListType = ({ value = {} }) => (
  <TypeArray
    value={value.group}
    component={GroupType}
    dense
  />
);

const MetadataSection = ({ value = {} }) => (
  <>
    <TypeSection
      value={value.metadata}
      component={SimpleMetadataType}
      hideNoValue
    />
  </>
);

export const UserMetadataDisplay = ({ userDocument }) => (
  <>
    <TypeSection
      component={MetadataSection}
      value={userDocument}
    />
  </>
);

const GroupSection = ({ value = {} }) => (
  <>
    <TypeSection
      component={GroupListType}
      value={value.groupList}
      title="Groups"
    />
  </>
);

export const UserGroupDisplay = ({ userDocument }) => (
  <>
    <TypeSection
      component={GroupSection}
      value={userDocument}
    />
  </>
);

const UserSection = ({ value = {}, onDeleteAlias }) => (
  <>
    <TextGrid title="userName" value={value.userName} hover />
    <TextGrid title="realName" value={value.realName} hover />
    <TextGrid
      title="alias"
      value={value.alias}
      variant="list"
      hideNoValue
      hover
      onDelete={onDeleteAlias}
    />
    <TextGrid title="id" value={value.id} hideNoValue hover />
    <TextGrid title="loc" hideNoValue value={value.loc} hover />
    <TextGrid title="password" value={value.password} hideNoValue hover />
    <TextGrid title="salt" value={value.salt} hideNoValue hover />
    <TextGrid
      title="accessPreserved"
      value={value.accessPreserved}
      hideNoValue
      hover
    />
    <TextGrid title="origin" value={value.origin} hideNoValue hover />
  </>
);

export const UserBasicDisplay = ({ userDocument, onDeleteAlias }) => (
  <>
    <TypeSection
      component={UserSection}
      value={userDocument}
      onDeleteAlias={onDeleteAlias}
    />
  </>
);

export default function UserDisplay({
  userDocument,
  onDeleteAlias,
}) {
  return (
    <>
      <TypeSection
        component={UserSection}
        value={userDocument}
        onDeleteAlias={onDeleteAlias}
      />
      <TypeSection
        component={GroupSection}
        value={userDocument}
      />
      <TypeSection
        component={MetadataSection}
        value={userDocument}
      />
    </>
  );
}
