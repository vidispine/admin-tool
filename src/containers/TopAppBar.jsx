import { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import HistoryIcon from '@material-ui/icons/History';
import MenuIcon from '@material-ui/icons/Menu';

import GitHubButton from '../components/ui/GitHubButton';
import LoadingProgress from '../components/ui/LoadingProgress';
import Menu, { MenuItem } from '../components/ui/Menu';
import NavSelect from '../components/ui/NavSelect';
import { useChangeTheme } from '../components/ui/Theme';
import UnstyledLink from '../components/ui/UnstyledLink';
import VidispineButton from '../components/ui/VidispineButton';
import getCookie from '../utils/getCookie';

const styles = (theme) => ({
  root: {
    backgroundColor: { light: 'rgb(36, 41, 46)', dark: 'rgb(22, 27, 34)' }[theme.palette.type],
    color: { light: 'rgb(255, 255, 255)', dark: 'rgb(240, 246, 252)' }[theme.palette.type],
    zIndex: theme.zIndex.drawer + 1,
  },
  VidispineIcon: {
    width: 15,
    height: 15,
  },
  VidispineButton: {
    width: 24,
    height: 24,
    backgroundColor: { light: 'rgb(255, 255, 255)', dark: 'rgb(240, 246, 252)' }[
      theme.palette.type
    ],
    padding: 2,
    borderRadius: 20,
  },
});

function TopAppBar({ toggleMainMenu, toggleHistory, classes, onLogout, userName, baseURL }) {
  const changeTheme = useChangeTheme();
  const [paletteType, setPaletteType] = useState(getCookie('paletteType') || 'system');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredMode = prefersDarkMode ? 'dark' : 'light';

  const handleChangeThemeMode = (newPaletteType) => {
    if (newPaletteType === null) return;
    setPaletteType(newPaletteType);
    if (newPaletteType === 'system') {
      document.cookie = 'paletteType=;path=/;max-age=31536000';
      changeTheme({ paletteType: preferredMode });
    } else {
      document.cookie = `paletteType=${newPaletteType};path=/;max-age=31536000`;
      changeTheme({ paletteType: newPaletteType });
    }
  };

  return (
    <AppBar elevation={0} classes={{ root: classes.root }} position="fixed">
      <Toolbar disableGutters variant="dense">
        <Tooltip title="Menu">
          <IconButton onClick={toggleMainMenu} color="inherit">
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="API History">
          <IconButton onClick={toggleHistory} color="inherit">
            <HistoryIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="subtitle2" color="inherit">
          {baseURL}
        </Typography>
        <Hidden xsDown>
          <div
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <div style={{ maxWidth: 540, width: '100%' }}>
              <NavSelect variant="outlined" />
            </div>
          </div>
        </Hidden>
        {
          {
            light: (
              <Tooltip title="Light Theme">
                <IconButton onClick={() => handleChangeThemeMode('dark')} color="inherit">
                  <Brightness7Icon />
                </IconButton>
              </Tooltip>
            ),
            dark: (
              <Tooltip title="Dark Theme">
                <IconButton onClick={() => handleChangeThemeMode('system')} color="inherit">
                  <Brightness4Icon />
                </IconButton>
              </Tooltip>
            ),
            system: (
              <Tooltip title="Auto Theme">
                <IconButton onClick={() => handleChangeThemeMode('light')} color="inherit">
                  <Brightness6Icon />
                </IconButton>
              </Tooltip>
            ),
          }[paletteType]
        }
        <Tooltip title="GitHub">
          <GitHubButton />
        </Tooltip>
        <Tooltip title="Vidispine">
          <VidispineButton
            IconProps={{ className: classes.VidispineIcon }}
            IconButtonProps={{ className: classes.VidispineButton }}
          />
        </Tooltip>
        <Menu icon={<AccountCircle />} iconProps={{ color: 'inherit' }}>
          <MenuItem disabled>
            <Typography>{`User: ${userName}`}</Typography>
          </MenuItem>
          <UnstyledLink to={`/user/${userName}`}>
            <MenuItem>
              <Typography color="inherit">Profile</Typography>
            </MenuItem>
          </UnstyledLink>
          <UnstyledLink to={`/import/access/${userName}`}>
            <MenuItem>
              <Typography color="inherit">Import Access</Typography>
            </MenuItem>
          </UnstyledLink>
          <MenuItem onClick={onLogout}>
            <Typography color="error">Sign out</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
      <LoadingProgress />
    </AppBar>
  );
}

export default withStyles(styles)(TopAppBar);
