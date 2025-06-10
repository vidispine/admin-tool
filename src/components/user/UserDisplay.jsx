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

function MetadataSection({ value = {} }) {
  return <TypeSection value={value.metadata} component={SimpleMetadataType} hideNoValue />;
}

export function UserMetadataDisplay({ userDocument }) {
  return <TypeSection component={MetadataSection} value={userDocument} />;
}

function GroupSection({ value = {} }) {
  return <TypeSection component={GroupListType} value={value.groupList} title="Groups" />;
}

export function UserGroupDisplay({ userDocument }) {
  return <TypeSection component={GroupSection} value={userDocument} />;
}

function UserSection({ value = {}, onDeleteAlias }) {
  return (
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
      <TextGrid title="accessPreserved" value={value.accessPreserved} hideNoValue hover />
      <TextGrid title="origin" value={value.origin} hideNoValue hover />
    </>
  );
}

export function UserBasicDisplay({ userDocument, onDeleteAlias }) {
  return <TypeSection component={UserSection} value={userDocument} onDeleteAlias={onDeleteAlias} />;
}

export default function UserDisplay({ userDocument, onDeleteAlias }) {
  return (
    <>
      <TypeSection component={UserSection} value={userDocument} onDeleteAlias={onDeleteAlias} />
      <TypeSection component={GroupSection} value={userDocument} />
      <TypeSection component={MetadataSection} value={userDocument} />
    </>
  );
}
