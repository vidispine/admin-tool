import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';
import startCase from 'lodash.startcase';

import TitleHeader from '../ui/TitleHeader';

export default function ResourceTitle({
  resourceType,
  resourceId,
  openCode,
  onRefresh,
  openRemove,
}) {
  return (
    <TitleHeader
      grandParentTitle="Resource"
      grandParentTo="/resource/"
      parentTitle={startCase(resourceType)}
      parentTo={`/resource/${resourceType}/`}
      title={resourceId}
      onRefresh={onRefresh}
      openCode={openCode}
      actionComponent={
        <IconButton onClick={openRemove}>
          <DeleteForever />
        </IconButton>
      }
    />
  );
}
