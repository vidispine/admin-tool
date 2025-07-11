import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

import withModal from '../../hoc/withModal';
import GroupTable from '../group/GroupTable';

import UserGroupDialog from './UserGroupDialog';

const ADD_USER_GROUP = 'ADD_USER_GROUP';

function UserGroupEditor({ userName, onSuccess, groupListDocument, onOpen }) {
  return (
    <>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">Groups</Typography>}
        action={
          <Grid container direction="row-reverse" alignItems="center">
            <Grid item>
              <Tooltip title="Add">
                <IconButton onClick={() => onOpen({ modalName: ADD_USER_GROUP })}>
                  <PlaylistAdd />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        }
      />
      <GroupTable
        groupListDocument={groupListDocument}
        userName={userName}
        onSuccess={onSuccess}
        showRemove
      />
      <UserGroupDialog dialogName={ADD_USER_GROUP} userName={userName} onSuccess={onSuccess} />
    </>
  );
}

export default withModal(UserGroupEditor);
