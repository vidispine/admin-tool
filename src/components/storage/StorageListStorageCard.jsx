import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import UnstyledLink from '../ui/UnstyledLink';

import { StorageBasicDisplay } from './StorageDisplay';
import StorageMethodListTable from './StorageMethodListTable';
import StorageStatus from './StorageStatus';

const styles = (theme) => ({
  onHover: {
    marginTop: theme.spacing(4),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  StorageStatus: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

function StorageListStorageCard({ storageDocument, classes }) {
  const { id: storageId } = storageDocument;
  return (
    <Card className={classes.onHover}>
      <CardHeader
        component={UnstyledLink}
        to={`/storage/${storageId}/`}
        title={
          <Button variant="text">
            <Typography variant="subtitle1">{storageId}</Typography>
          </Button>
        }
        action={
          <StorageStatus className={classes.StorageStatus} storageDocument={storageDocument} />
        }
      />
      <CardContent>
        <StorageBasicDisplay value={storageDocument} />
        <StorageMethodListTable storageDocument={storageDocument} hidePermissions />
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(StorageListStorageCard);
