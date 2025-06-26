import TitleHeader from '../ui/TitleHeader';

export default function StorageListTitle({ openCode, openCreate, onRefresh, ...props }) {
  return (
    <TitleHeader
      title="Storage"
      onRefresh={onRefresh}
      openAction={openCreate}
      helpTo="/ref/storage/storage.html"
      {...props}
    />
  );
}
