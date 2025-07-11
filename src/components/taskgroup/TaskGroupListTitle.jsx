import TitleHeader from '../ui/TitleHeader';

export default function TaskGroupListTitle({ openCode, openCreate, onRefresh }) {
  return (
    <TitleHeader
      title="Task Group"
      onRefresh={onRefresh}
      openCode={openCode}
      openAction={openCreate}
    />
  );
}
