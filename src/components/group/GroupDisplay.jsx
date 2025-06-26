import { SimpleMetadataType } from '../ui/DisplayType';
import TextGrid from '../ui/TextGrid';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

function GroupType({ value = {} }) {
  return <TextGrid title="Group Name" value={value.groupName} />;
}

function GroupListType({ value = {} }) {
  return <TypeArray value={value.group} component={GroupType} dense />;
}

function ParentSection({ value = {} }) {
  return (
    <TypeSection
      title="Parent Groups"
      value={value.parentGroupList}
      component={GroupListType}
      hideNoValue
    />
  );
}

export function GroupParentDisplay({ groupDocument }) {
  return <TypeSection component={ParentSection} value={groupDocument} />;
}

function ChildSection({ value = {} }) {
  return (
    <TypeSection
      title="Child Groups"
      value={value.childGroupList}
      component={GroupListType}
      hideNoValue
    />
  );
}

export function GroupChildDisplay({ groupDocument }) {
  return <TypeSection component={ChildSection} value={groupDocument} />;
}

function MetadataSection({ value = {} }) {
  return (
    <TypeSection
      title="Metadata"
      value={value.metadata}
      component={SimpleMetadataType}
      hideNoValue
    />
  );
}

export function GroupMetadataDisplay({ groupDocument }) {
  return <TypeSection component={MetadataSection} value={groupDocument} />;
}

function GroupSection({ value = {} }) {
  return (
    <>
      <TextGrid title="groupName" value={value.groupName} hover />
      <TextGrid title="description" value={value.description} hover />
      <TextGrid title="role" value={value.role} variant="boolean" hover />
    </>
  );
}

export function GroupBasicDisplay({ groupDocument }) {
  return <TypeSection component={GroupSection} value={groupDocument} />;
}

function UserType({ value = {} }) {
  return <TextGrid title="userName" value={value.userName} hover />;
}

function UserListType({ value = {} }) {
  return <TypeArray value={value.user} component={UserType} dense />;
}

function UserSection({ value = {} }) {
  return <TypeSection component={UserListType} value={value.userList} title="Users" />;
}

export function GroupUserDisplay({ groupDocument }) {
  return <TypeSection component={UserSection} value={groupDocument} />;
}

export default function GroupDisplay({ groupDocument }) {
  return (
    <>
      <TypeSection component={GroupSection} value={groupDocument} />
      <TypeSection component={UserSection} value={groupDocument} />
      <TypeSection component={ChildSection} value={groupDocument} />
      <TypeSection component={ParentSection} value={groupDocument} />
      <TypeSection component={MetadataSection} value={groupDocument} />
    </>
  );
}
