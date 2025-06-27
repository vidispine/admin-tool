import TitleHeader from '../ui/TitleHeader';

export default function ShapeTagTitle({ tagName, ...props }) {
  return (
    <TitleHeader
      title={tagName}
      parentTitle="Shape Tag"
      parentTo="/shape-tag/"
      helpTo="/ref/shape-tag.html"
      {...props}
    />
  );
}
