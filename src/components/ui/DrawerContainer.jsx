import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const styles = (theme) => ({
  drawer: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  paper: {
    marginTop: 54,
  },
  drawerOpen: {
    width: theme.spacing(25),
    paddingRight: theme.spacing(1),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    width: theme.spacing(18),
    paddingRight: theme.spacing(1),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  paperAnchorDockedLeft: {
    borderRight: 'none',
  },
});

class DrawerContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.state = {
      open: props.defaultOpen || false,
    };
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  render() {
    const {
      classes,
      listComponent: ListComponent,
      mainComponent: MainComponent,
      ...props
    } = this.props;
    const { open } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx(classes.paper, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
            paperAnchorDockedLeft: classes.paperAnchorDockedLeft,
          }}
          open
        >
          <ListItem
            button
            onClick={open ? this.handleDrawerClose : this.handleDrawerOpen}
            disableRipple
            disableGutters
          >
            <ListItemIcon>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </ListItemIcon>
          </ListItem>
          <ListComponent {...props} />
        </Drawer>
        <div
          style={{
            flexGrow: 1,
          }}
        >
          <MainComponent {...props} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DrawerContainer);
