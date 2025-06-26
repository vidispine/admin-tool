import TitleHeader from '../ui/TitleHeader';

export default function ShapeTagListTitle({ openCode, openCreate, onRefresh }) {
  return (
    <TitleHeader
      title="Shape Tag"
      onRefresh={onRefresh}
      openCode={openCode}
      openAction={openCreate}
      helpTo="/ref/shape-tag.html"
    />
  );
}
