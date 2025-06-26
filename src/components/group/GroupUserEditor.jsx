import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

import withModal from '../../hoc/withModal';
import UserTable from '../user/UserTable';

import GroupUserDialog from './GroupUserDialog';

const ADD_GROUP_USER = 'ADD_GROUP_USER';

function GroupUserEditor({ groupName, onSuccess, groupDocument, onOpen }) {
  return (
    <>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">Users</Typography>}
        action={
          <Grid container direction="row-reverse" alignItems="center">
            <Grid item>
              <Tooltip title="Add">
                <IconButton onClick={() => onOpen({ modalName: ADD_GROUP_USER })}>
                  <PlaylistAdd />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        }
      />
      <UserTable
        userListDocument={groupDocument.userList}
        groupName={groupName}
        onSuccess={onSuccess}
        showRemove
      />
      <GroupUserDialog
        dialogName={ADD_GROUP_USER}
        groupName={groupName}
        groupDocument={groupDocument}
        onSuccess={onSuccess}
      />
    </>
  );
}

export default withModal(GroupUserEditor);
