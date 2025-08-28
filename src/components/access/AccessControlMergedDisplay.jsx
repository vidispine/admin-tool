import TextGrid from '../ui/TextGrid';

export function AccessControlMergedType({ access }) {
  return (
    <>
      <TextGrid title="Permission" value={access.permission} />
      <TextGrid title="Type" value={access.type} />
      <TextGrid title="Priority" value={access.priority} hideNoValue />
      <TextGrid title="Rank" value={access.rank} />
      <TextGrid title="User" variant="username" value={access.username} hideNoValue />
      <TextGrid title="Group" variant="group" value={access.group} hideNoValue />
      <TextGrid title="Grantor" variant="username" value={access.grantor} hideNoValue />
      <TextGrid title="Extra Data" value={access.extradata} hideNoValue />
      <TextGrid title="Collection" variant="collection" value={access.collection} hideNoValue />
      <TextGrid title="Library" variant="library" value={access.library} hideNoValue />
      <TextGrid title="Super User" variant="boolean" value={access.superUser} hideNoValue />
      <TextGrid title="Matches" variant="boolean" value={access.matches} hideNoValue />
      <TextGrid title="ID" value={access.id} hideNoValue />
      <TextGrid title="Effective Permission" value={access.effectivePermission} hideNoValue />
      <TextGrid
        title="originalDisabledGrantor"
        value={access.originalDisabledGrantor}
        variant="list"
        hideNoValue
      />
    </>
  );
}

export default function AccessControlDisplay({ accessControlDocument }) {
  return <AccessControlMergedType access={accessControlDocument} />;
}
