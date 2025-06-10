import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

import { withModalNoRouter } from '../../hoc/withModal';
import SquareCard from '../ui/SquareCard';

import StorageRuleListTable from './StorageRuleListTable';

function StorageRuleListCard({ createModal, title, onOpen, ...props }) {
  return (
    <SquareCard>
      {createModal && (
        <CardHeader
          disableTypography
          title={<Typography variant="subtitle1">{title}</Typography>}
          action={
            <Grid container direction="row-reverse" alignItems="center">
              <Grid item>
                <IconButton onClick={() => onOpen({ modalName: createModal })}>
                  <PlaylistAdd />
                </IconButton>
              </Grid>
            </Grid>
          }
        />
      )}
      <CardContent>
        <StorageRuleListTable {...props} />
      </CardContent>
    </SquareCard>
  );
}

export default withModalNoRouter(StorageRuleListCard);
