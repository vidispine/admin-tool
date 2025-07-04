import TitleHeader from '../ui/TitleHeader';

export default function StorageGroupListTitle({ openCode, openCreate, onRefresh }) {
  return (
    <TitleHeader
      title="Storage Group"
      onRefresh={onRefresh}
      openCode={openCode}
      openAction={openCreate}
    />
  );
}
