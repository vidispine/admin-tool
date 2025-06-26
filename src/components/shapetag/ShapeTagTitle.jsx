import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';

import TitleHeader from '../ui/TitleHeader';

export default function ShapeTagTitle({ openCode, onRefresh, tagName, openRemove }) {
  return (
    <TitleHeader
      title={tagName}
      parentTitle="Shape Tag"
      parentTo="/shape-tag/"
      openCode={openCode}
      onRefresh={onRefresh}
      helpTo="/ref/shape-tag.html"
      actionComponent={
        <IconButton onClick={openRemove}>
          <DeleteForever />
        </IconButton>
      }
    />
  );
}
