import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import TitleHeader from '../ui/TitleHeader';
import { OfflineIcon } from '../ui/StatusIcon';
import withModal from '../../hoc/withModal';
import Menu, { MenuItem } from '../ui/Menu';

const UserStatus = ({ userDocument }) => {
  if (userDocument === undefined) { return null; }
  const { disabled } = userDocument;
  if (disabled === true) {
    return (
      <Chip
        avatar={
          <OfflineIcon />
        }
        label="Disabled"
      />
    );
  }
  return null;
};

function UserTitle({
  userName,
  onOpen,
  onEnable,
  realNameModal,
  aliasModal,
  tokenModal,
  passwordModal,
  disableModal,
  userNameModal,
  history,
  ...props
}) {
  const { code: userDocument } = props;
  return (
    <TitleHeader
      helpTo="/ref/user.html"
      title={userName}
      parentTitle="User"
      parentTo="/user/"
      iconList={(
        <>
          <Tooltip title="Access Keys">
            <IconButton onClick={() => history.push(`/user/${userName}/key`)}>
              <VpnKeyIcon />
            </IconButton>
          </Tooltip>
          <UserStatus userDocument={userDocument} />
          <Menu>
            {userName !== 'admin' && (
            <MenuItem onClick={() => onOpen({ modalName: userNameModal })}>
              <Typography>Change Username</Typography>
            </MenuItem>
            )}
            <MenuItem onClick={() => onOpen({ modalName: passwordModal })}>
              <Typography>Change Password</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: realNameModal })}>
              <Typography>Change Real Name</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: aliasModal })}>
              <Typography>Add Alias</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: tokenModal })}>
              <Typography>Generate Token</Typography>
            </MenuItem>
            {userName !== 'admin' && userDocument?.disabled === true && (
              <MenuItem onClick={onEnable}>
                <Typography>Enable User</Typography>
              </MenuItem>
            )}
            {userName !== 'admin' && (
              <MenuItem onClick={() => onOpen({ modalName: disableModal })}>
                <Typography color="secondary">Disable/Remove User</Typography>
              </MenuItem>
            )}
          </Menu>
        </>
      )}
      {...props}
    />
  );
}

export default withModal(UserTitle);
