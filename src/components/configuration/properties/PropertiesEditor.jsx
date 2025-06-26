import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

import withModal from '../../../hoc/withModal';

import PropertiesDialog from './PropertiesDialog';
import PropertiesTable from './PropertiesTable';

const ADD_CONFIGURATIONPROPERTIES = 'ADD_CONFIGURATIONPROPERTIES';

function PropertiesEditor({ onRefresh, configurationPropertyListDocument, onOpen }) {
  return (
    <>
      <CardHeader
        action={
          <Grid container direction="row-reverse" alignItems="center">
            <Grid item>
              <Tooltip title="New">
                <IconButton onClick={() => onOpen({ modalName: ADD_CONFIGURATIONPROPERTIES })}>
                  <PlaylistAdd />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        }
      />
      <CardContent>
        <PropertiesTable
          configurationPropertyListDocument={configurationPropertyListDocument}
          onRefresh={onRefresh}
        />
      </CardContent>
      <PropertiesDialog dialogName={ADD_CONFIGURATIONPROPERTIES} onSuccess={onRefresh} />
    </>
  );
}

export default withModal(PropertiesEditor);
