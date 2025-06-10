import { forwardRef } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { compose } from 'redux';

import NavSelect from '../components/ui/NavSelect';
import routes from '../const/routes';
import { withModalNoRouter } from '../hoc/withModal';

const styles = (theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: theme.palette.background.default,
  },
  dialogRoot: {
    justifyContent: 'flex-start',
  },
  scrollPaper: {
    width: '85%',
    backgroundColor: theme.palette.background.default,
  },
});

const Transition = forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

function ListLink({ to, primary, onClose }) {
  return (
    <ListItem button to={to} component={Link} onClick={onClose}>
      <ListItemText secondary={primary} />
    </ListItem>
  );
}

function ListGroup({ subheader, children }) {
  return (
    <List component="nav" subheader={<ListSubheader disableSticky>{subheader}</ListSubheader>}>
      {children}
    </List>
  );
}

function FullScreenDialog({ classes, open, onClose }) {
  const breakPoints = {
    lg: 2,
    md: 3,
    sm: 6,
    xs: 12,
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      classes={{ root: classes.dialogRoot, scrollPaper: classes.scrollPaper }}
    >
      <AppBar elevation={0} className={classes.appBar}>
        <Toolbar disableGutters variant="dense">
          <Grid container alignItems="flex-start">
            <Grid item>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <NavSelect onChange={onClose} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid container alignItems="flex-start">
          <Grid item {...breakPoints}>
            <ListGroup subheader="Workflow">
              <ListLink to="/new-job/" primary="New Job" onClose={onClose} />
              <ListLink to="/job" primary="Job List" onClose={onClose} />
              <ListLink to="/job/problem/" primary="Job Problems" onClose={onClose} />
              <ListLink to="/jobtype/" primary="Job Types" onClose={onClose} />
              <ListLink to="/task-group/" primary="Task Groups" onClose={onClose} />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Search">
              <ListLink to="/search/" primary="Items & Collections" onClose={onClose} />
              <ListLink to={routes.itemList()} primary="Items" onClose={onClose} />
              <ListLink to="/collection/" primary="Collections" onClose={onClose} />
              <ListLink to="/shape/" primary="Shapes" onClose={onClose} />
              <ListLink to="/search/file/" primary="Files" onClose={onClose} />
              <ListLink to="/library/" primary="Libraries" onClose={onClose} />
              <ListLink to="/search/field-group/" primary="Field Groups" onClose={onClose} />
              <ListLink
                to="/item/metadata-group/"
                primary="Item By Metadata Group"
                onClose={onClose}
              />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Storage">
              <ListLink to="/storage/" primary="Storages" onClose={onClose} />
              <ListLink to="/file/" primary="Files" onClose={onClose} />
              <ListLink to="/storage-rule/" primary="Storage Rules" onClose={onClose} />
              <ListLink to="/quota/" primary="Quota" onClose={onClose} />
              <ListLink to="/storage-group/" primary="Storage Groups" onClose={onClose} />
              <ListLink to="/auto-import/" primary="Auto Import Rules" onClose={onClose} />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Create">
              <ListLink to="/import/item/placeholder/" primary="Item" onClose={onClose} />
              <ListLink to="/import/collection/" primary="Collection" onClose={onClose} />
              <ListLink to="/import/item/shape/placeholder/" primary="Shape" onClose={onClose} />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Import">
              <ListLink to="/import/file/" primary="File" onClose={onClose} />
              <ListLink to="/import/item/upload/" primary="Upload" onClose={onClose} />
              <ListLink to="/import/item/uri/" primary="URIs" onClose={onClose} />
              <ListLink to="/import/item/shape/" primary="Shape" onClose={onClose} />
              <ListLink to="/import/item/component/" primary="Component" onClose={onClose} />
              <ListLink to="/import/sidecar/" primary="Sidecar" onClose={onClose} />
              <ListLink to="/import/settings/" primary="Settings" onClose={onClose} />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="IMF">
              <ListLink
                to="/import-imp/?tab=IMPORTIMP_URL_TAB"
                primary="Import From URL"
                onClose={onClose}
              />
              <ListLink
                to="/import-imp/?tab=IMPORTIMP_PATH_TAB"
                primary="Import From Path"
                onClose={onClose}
              />
              <ListLink
                to="/import-imp/?tab=IMPORTIMP_FILE_TAB"
                primary="Import From File"
                onClose={onClose}
              />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Resources">
              <ListLink to="/vxa/" primary="Server Agents" />
              <ListLink to="/resource/transcoder/" primary="Transcoders" onClose={onClose} />
              <ListLink to="/resource/thumbnail/" primary="Thumbnail Paths" onClose={onClose} />
              <ListLink to="/export-location" primary="Export Locations" onClose={onClose} />
              <ListLink to="/resource/vidinet/" primary="Vidinet" onClose={onClose} />
              <ListLink to="/resource/" primary="All Resources" onClose={onClose} />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Authentication">
              <ListLink to="/user/" primary="Users" onClose={onClose} />
              <ListLink to="/group/" primary="Groups" onClose={onClose} />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Metadata">
              <ListLink to="/metadata-field/" primary="Fields" onClose={onClose} />
              <ListLink to="/field-group/" primary="Field Groups" onClose={onClose} />
              <ListLink to="/document/" primary="Document" onClose={onClose} />
              <ListLink to="/projection/" primary="Projection" onClose={onClose} />
              <ListLink to="/metadata-dataset/" primary="Datasets" onClose={onClose} />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Utils">
              <ListLink to="/debug/echo/" primary="XML Echo" onClose={onClose} />
              <ListLink to="/javascript/test/" primary="Javascript Test" onClose={onClose} />
              <ListLink to="/stitch/" primary="Stitch" onClose={onClose} />
              <ListLink to="/wizard/" primary="Wizard" onClose={onClose} />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Transcoding">
              <ListLink to="/shape-tag/" primary="Shape Tags" onClose={onClose} />
              <ListLink to="/conform/" primary="Conform Media" onClose={onClose} />
              <ListLink to="/analyze-preset/" primary="Analyze Presets" onClose={onClose} />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Information">
              <ListLink to="/swagger/" primary="Swagger" onClose={onClose} />
              <ListLink to="/version/" primary="Version" onClose={onClose} />
              <ListLink to="/selftest/" primary="Self Test" onClose={onClose} />
              <ListLink to="/log" primary="Audit Log" onClose={onClose} />
              <ListLink to="/error/" primary="Error Log" onClose={onClose} />
              <ListLink to="/transfer/" primary="Import Transfers" onClose={onClose} />
              <ListLink to="/scheduled-request/" primary="Scheduled Requests" onClose={onClose} />
              <ListLink to="/deletion-lock/" primary="Deletion Locks" onClose={onClose} />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="System">
              <ListLink to="/reindex/" primary="Re-Index" onClose={onClose} />
              <ListLink to="/service/" primary="Services" onClose={onClose} />
              <ListLink to="/service/stacktrace/" primary="Stack Trace" onClose={onClose} />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Configuration">
              <ListLink to="/configuration/properties/" primary="Properties" onClose={onClose} />
              <ListLink to="/configuration/job-pool/" primary="Job Pool" onClose={onClose} />
              <ListLink to="/configuration/ftp-pool/" primary="FTP Pool" onClose={onClose} />
              <ListLink to="/configuration/path-alias/" primary="Path Alias" onClose={onClose} />
              <ListLink to="/external-id/" primary="External Identifiers" onClose={onClose} />
              <ListLink to="/configuration/" primary="All Configuration" onClose={onClose} />
              <ListLink to="/secret/" primary="Secrets" onClose={onClose} />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Notification">
              <ListLink to="/notification/item/" primary="Item" onClose={onClose} />
              <ListLink to="/notification/collection/" primary="Collection" onClose={onClose} />
              <ListLink to="/notification/job/" primary="Job" onClose={onClose} />
              <ListLink to="/notification/" primary="All Notification" onClose={onClose} />
            </ListGroup>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Typography variant="caption">
          {`Last Commit: ${import.meta.env.VITE_GIT_COMMIT}` || 'Last Commit: UNKNOWN'}
        </Typography>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withModalNoRouter, withStyles(styles))(FullScreenDialog);
