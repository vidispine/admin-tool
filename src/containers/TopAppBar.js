import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import { useHistory } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HistoryIcon from '@material-ui/icons/History';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness6Icon from '@material-ui/icons/Brightness6';

import Menu, { MenuItem } from '../components/ui/Menu';
import UnstyledLink from '../components/ui/UnstyledLink';
import LoadingProgress from '../components/ui/LoadingProgress';
import { useChangeTheme } from '../components/ui/Theme';
import NavSelect from '../components/ui/NavSelect';
import GitHubButton from '../components/ui/GitHubButton';
import getCookie from '../utils/getCookie';

const styles = (theme) => ({
  root: {
    backgroundColor: { light: 'rgb(36, 41, 46)', dark: 'rgb(22, 27, 34)' }[theme.palette.type],
    color: { light: 'rgb(255, 255, 255)', dark: 'rgb(240, 246, 252)' }[theme.palette.type],
    zIndex: theme.zIndex.drawer + 1,
  },
  Toolbar: {
    '-webkit-app-region': 'drag',
    paddingLeft: theme.spacing(8),
    '& .MuiIconButton-root': {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
  },
  baseUrl: {
    paddingLeft: theme.spacing(1),
  },
});

function TopAppBar({
  toggleMainMenu,
  toggleHistory,
  classes,
  onLogout,
  userName,
  baseUrl,
}) {
  const changeTheme = useChangeTheme();
  const [paletteType, setPaletteType] = React.useState(getCookie('paletteType') || 'system');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredMode = prefersDarkMode ? 'dark' : 'light';
  const history = useHistory();

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
    <AppBar elevation={0} classes={{ root: classes.root }} position="static">
      <Toolbar disableGutters variant="dense" className={classes.Toolbar}>
        <Typography variant="subtitle2" color="inherit" className={classes.baseUrl}>
          {baseUrl}
        </Typography>
        <Hidden xsDown>
          <div style={{
            flex: 1, justifyContent: 'center', alignItems: 'center', display: 'flex',
          }}
          >
            <Tooltip title="Back in history">
              <IconButton size="small" onClick={history.goBack} color="inherit">
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Forward in history">
              <IconButton size="small" onClick={history.goForward} color="inherit">
                <ArrowForwardIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="History">
              <IconButton size="small" onClick={toggleHistory} color="inherit">
                <HistoryIcon />
              </IconButton>
            </Tooltip>
            <div style={{ maxWidth: 540, width: '100%' }}>
              <NavSelect variant="outlined" />
            </div>
          </div>
        </Hidden>
        {{
          light: (
            <Tooltip title="Light Theme">
              <IconButton size="small" onClick={() => handleChangeThemeMode('dark')} color="inherit">
                <Brightness7Icon />
              </IconButton>
            </Tooltip>
          ),
          dark: (
            <Tooltip title="Dark Theme">
              <IconButton size="small" onClick={() => handleChangeThemeMode('system')} color="inherit">
                <Brightness4Icon />
              </IconButton>
            </Tooltip>
          ),
          system: (
            <Tooltip title="Auto Theme">
              <IconButton size="small" onClick={() => handleChangeThemeMode('light')} color="inherit">
                <Brightness6Icon />
              </IconButton>
            </Tooltip>
          ),
        }[paletteType]}
        <Tooltip title="GitHub">
          <GitHubButton size="small" />
        </Tooltip>
        <Menu icon={<AccountCircle />} iconProps={{ color: 'inherit', size: 'small' }}>
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
        <IconButton size="small" onClick={toggleMainMenu} color="inherit">
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <LoadingProgress />
    </AppBar>
  );
}

export default withStyles(styles)(TopAppBar);
