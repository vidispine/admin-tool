import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

import withModal from '../../hoc/withModal';
import MetadataFieldListTable from '../metadatafield/MetadataFieldListTable';

import FieldGroupFieldDialog from './FieldGroupFieldDialog';

const ADD_FIELDGROUP_FIELD = 'ADD_FIELDGROUP_FIELD';

function FieldGroupChildEditor({ groupName, onRefresh, metadataFieldGroupDocument, onOpen }) {
  return (
    <>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">Metadata Fields</Typography>}
        action={
          <Grid container direction="row-reverse" alignItems="center">
            <Grid item>
              <Tooltip title="Add">
                <IconButton onClick={() => onOpen({ modalName: ADD_FIELDGROUP_FIELD })}>
                  <PlaylistAdd />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        }
      />
      <CardContent>
        <MetadataFieldListTable
          metadataFieldListDocument={metadataFieldGroupDocument}
          groupName={groupName}
          onRefresh={onRefresh}
        />
      </CardContent>
      <FieldGroupFieldDialog
        dialogName={ADD_FIELDGROUP_FIELD}
        groupName={groupName}
        onSuccess={onRefresh}
      />
    </>
  );
}

export default withModal(FieldGroupChildEditor);
