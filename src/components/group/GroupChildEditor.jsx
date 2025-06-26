import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

import withModal from '../../hoc/withModal';

import GroupChildDialog from './GroupChildDialog';
import GroupTable from './GroupTable';

const ADD_GROUP_CHILD = 'ADD_GROUP_CHILD';

function GroupChildEditor({ groupName, onSuccess, groupDocument, onOpen }) {
  return (
    <>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">Child Groups</Typography>}
        action={
          <Grid container direction="row-reverse" alignItems="center">
            <Grid item>
              <Tooltip title="Add">
                <IconButton onClick={() => onOpen({ modalName: ADD_GROUP_CHILD })}>
                  <PlaylistAdd />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        }
      />
      <GroupTable
        groupListDocument={groupDocument.childGroupList}
        parentGroupName={groupName}
        onSuccess={onSuccess}
        showRemove
      />
      <GroupChildDialog
        dialogName={ADD_GROUP_CHILD}
        groupName={groupName}
        groupDocument={groupDocument}
        onSuccess={onSuccess}
      />
    </>
  );
}

export default withModal(GroupChildEditor);
