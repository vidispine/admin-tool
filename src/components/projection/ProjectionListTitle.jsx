import Typography from '@material-ui/core/Typography';

import { withModalNoRouter } from '../../hoc/withModal';
import Menu, { MenuItem } from '../ui/Menu';
import TitleHeader from '../ui/TitleHeader';

function ProjectionListTitle({ incomingDialog, outgoingDialog, onOpen, ...props }) {
  return (
    <TitleHeader
      {...props}
      actionComponent={
        <Menu>
          <MenuItem onClick={() => onOpen({ modalName: incomingDialog })}>
            <Typography>Create Incoming Projection</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: outgoingDialog })}>
            <Typography>Create Outgoing Projection</Typography>
          </MenuItem>
        </Menu>
      }
    />
  );
}
export default withModalNoRouter(ProjectionListTitle);
