import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { OnlineIcon, OfflineIcon } from '../ui/StatusIcon';

const styles = () => ({
  wordBreak: { wordBreak: 'break-word' },
  noBreak: { whiteSpace: 'nowrap' },
});

function StorageMethodRow({ classes, storageMethod, storageId, hidePermissions }) {
  let isOnline = false;
  if (!storageMethod.lastFailure) {
    isOnline = true;
  } else if (storageMethod.lastSuccess && storageMethod.lastFailure) {
    isOnline = moment(storageMethod.lastSuccess).isAfter(storageMethod.lastFailure);
  }
  return (
    <TableRow hover>
      <TableCell>
        <Button
          component={Link}
          to={`/storage/${storageId}/method/${storageMethod.id}`}
          variant="text"
          className={classes.noBreak}
        >
          {storageMethod.id}
        </Button>
      </TableCell>
      <TableCell className={classes.wordBreak}>{storageMethod.uri}</TableCell>
      {hidePermissions !== true ? (
        <TableCell padding="checkbox">
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={storageMethod.read} disabled />}
              label={<Typography variant="subtitle2">Read</Typography>}
            />
            <FormControlLabel
              control={<Checkbox checked={storageMethod.write} disabled />}
              label={<Typography variant="subtitle2">Write</Typography>}
            />
            <FormControlLabel
              control={<Checkbox checked={storageMethod.browse} disabled />}
              label={<Typography variant="subtitle2">Browse</Typography>}
            />
          </FormGroup>
        </TableCell>
      ) : null}
      <TableCell padding="checkbox">
        {isOnline ? (
          <Chip avatar={<OnlineIcon />} label="Online" />
        ) : (
          <Chip avatar={<OfflineIcon />} label="Offline" />
        )}
      </TableCell>
    </TableRow>
  );
}

export default withStyles(styles)(StorageMethodRow);
