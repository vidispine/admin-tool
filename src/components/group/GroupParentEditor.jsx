import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

import withModal from '../../hoc/withModal';

import GroupParentDialog from './GroupParentDialog';
import GroupTable from './GroupTable';

const ADD_GROUP_PARENT = 'ADD_GROUP_PARENT';

function GroupParentEditor({ groupName, onSuccess, groupDocument, onOpen }) {
  return (
    <>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">Parent Groups</Typography>}
        action={
          <Grid container direction="row-reverse" alignItems="center">
            <Grid item>
              <Tooltip title="Add">
                <IconButton onClick={() => onOpen({ modalName: ADD_GROUP_PARENT })}>
                  <PlaylistAdd />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        }
      />
      <GroupTable
        groupListDocument={groupDocument.parentGroupList}
        childGroupName={groupName}
        onSuccess={onSuccess}
        showRemove
      />
      <GroupParentDialog
        dialogName={ADD_GROUP_PARENT}
        groupName={groupName}
        groupDocument={groupDocument}
        onSuccess={onSuccess}
      />
    </>
  );
}

export default withModal(GroupParentEditor);
