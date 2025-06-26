import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import withModal from '../../hoc/withModal';
import downloadThumbnail from '../../utils/downloadThumbnail';
import parseThumbnailUri from '../../utils/parseThumbnailUri';
import Menu, { MenuItem } from '../ui/Menu';

import { DIALOG_NAME as ITEMTHUMBNAILDELETE_DIALOG } from './ItemThumbnailDeleteDialog';

const styles = (theme) => ({
  Menu: {
    color: theme.palette.common.white,
  },
});

function ItemThumbnailMenu({ classes, uri, onOpen }) {
  const onDelete = () => onOpen({ modalName: ITEMTHUMBNAILDELETE_DIALOG, uri });
  const onDownload = () => {
    const { resourceId, itemId, time, isPoster } = parseThumbnailUri(uri);
    downloadThumbnail({
      resourceId,
      itemId,
      time,
      isPoster,
    });
  };
  return (
    <Menu iconProps={{ color: 'inherit', className: classes.Menu }}>
      <MenuItem onClick={onDownload}>
        <Typography>Download</Typography>
      </MenuItem>
      <MenuItem onClick={onDelete}>
        <Typography color="error">Delete</Typography>
      </MenuItem>
    </Menu>
  );
}

export default withStyles(styles)(withModal(ItemThumbnailMenu));
