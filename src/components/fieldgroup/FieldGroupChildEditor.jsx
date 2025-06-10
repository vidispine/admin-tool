import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

import withModal from '../../hoc/withModal';

import FieldGroupChildDialog from './FieldGroupChildDialog';
import FieldGroupListTable from './FieldGroupListTable';

const ADD_FIELDGROUP_CHILD = 'ADD_FIELDGROUP_CHILD';

function FieldGroupChildEditor({ groupName, onRefresh, metadataFieldGroupDocument, onOpen }) {
  return (
    <>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">Groups</Typography>}
        action={
          <Grid container direction="row-reverse" alignItems="center">
            <Grid item>
              <Tooltip title="New">
                <IconButton onClick={() => onOpen({ modalName: ADD_FIELDGROUP_CHILD })}>
                  <PlaylistAdd />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        }
      />
      <CardContent>
        <FieldGroupListTable
          metadataFieldGroupListDocument={metadataFieldGroupDocument}
          groupName={groupName}
          onRefresh={onRefresh}
        />
      </CardContent>
      <FieldGroupChildDialog
        dialogName={ADD_FIELDGROUP_CHILD}
        groupName={groupName}
        onSuccess={onRefresh}
      />
    </>
  );
}

export default withModal(FieldGroupChildEditor);
