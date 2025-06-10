import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

const styles = {
  greenAvatar: {
    marginTop: 10,
    marginBottom: 10,
    color: '#fff',
    width: 40,
    height: 40,
    backgroundColor: green[500],
  },
  baseAvatar: {
    marginTop: 10,
    marginBottom: 10,
    color: '#fff',
    width: 40,
    height: 40,
  },
  redAvatar: {
    marginTop: 10,
    marginBottom: 10,
    color: '#fff',
    width: 40,
    height: 40,
    backgroundColor: red[500],
  },
  orangeAvatar: {
    marginTop: 10,
    marginBottom: 10,
    color: '#fff',
    width: 40,
    height: 40,
    backgroundColor: orange[500],
  },
  icon: {
    width: 25,
    height: 25,
  },
};

export const OnlineIcon = withStyles(styles)(({ classes }) => (
  <Avatar className={classes.greenAvatar}>
    <CheckIcon className={classes.icon} />
  </Avatar>
));

export const LoadingIcon = withStyles(styles)(({ classes, children, isLoading = true }) => (
  <Avatar className={classes.baseAvatar}>
    {isLoading ? (
      <div style={{ position: 'relative' }}>
        <CircularProgress
          className={classes.icon}
          style={{
            zIndex: 1,
            position: 'absolute',
            left: -20,
            top: -20,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -20,
            top: -30,
          }}
        >
          {children}
        </div>
      </div>
    ) : (
      children
    )}
  </Avatar>
));

export const OfflineIcon = withStyles(styles)(({ classes }) => (
  <Avatar className={classes.redAvatar}>
    <PriorityHighIcon className={classes.icon} />
  </Avatar>
));

export const WarningIcon = withStyles(styles)(({ classes }) => (
  <Avatar className={classes.orangeAvatar}>
    <PriorityHighIcon className={classes.icon} />
  </Avatar>
));
