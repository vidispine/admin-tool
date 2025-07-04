import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';

import TitleHeader from '../ui/TitleHeader';

export default function TaskGroupTitle({ openCode, onRefresh, groupName, openRemove }) {
  return (
    <TitleHeader
      title={groupName}
      parentTitle="Task Group"
      parentTo="/task-group/"
      openCode={openCode}
      onRefresh={onRefresh}
      actionComponent={
        <IconButton onClick={openRemove}>
          <DeleteForever />
        </IconButton>
      }
    />
  );
}
