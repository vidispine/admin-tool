import Typography from '@material-ui/core/Typography';

import Menu, { MenuItem } from '../ui/Menu';
import { withModalNoRouter } from '../../hoc/withModal';

function MetadataChangeSetMenu({
  changesetId,
  onOpen,
  trimModal,
  removeModal,
}) {
  return (
    <Menu>
      {trimModal ? (
        <MenuItem
          onClick={() => onOpen({
            modalName: trimModal,
            changesetId,
          })}
        >
          <Typography>Trim</Typography>
        </MenuItem>
      ) : null}
      {removeModal ? (
        <MenuItem
          onClick={() => onOpen({
            modalName: removeModal,
            changesetId,
          })}
        >
          <Typography color="secondary">Delete Changeset</Typography>
        </MenuItem>
      ) : null}
    </Menu>
  );
}

export default withModalNoRouter(MetadataChangeSetMenu);
