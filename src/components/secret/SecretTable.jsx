import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Check from '@material-ui/icons/Check';

import TableRow from '../ui/TableRowLink';

const VALID_KEYS = ['username', 'password', 'private_key', 'private_key_password'];

const styles = () => ({
  Button: {
    visibility: 'hidden',
  },
  TableRow: {
    '&:hover $Button': {
      visibility: 'visible',
    },
  },
});

function SecretListTable({ classes, alias, secretDocument, onUpdate, onRemove }) {
  const keyList = secretDocument?.key || [];
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Key</TableCell>
          <TableCell>Value</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {VALID_KEYS.map((secretKey) => (
          <TableRow key={secretKey} hover className={classes.TableRow}>
            <TableCell>{secretKey}</TableCell>
            <TableCell>{keyList.includes(secretKey) ? <Check /> : null}</TableCell>
            <TableCell>
              <DialogActions>
                {keyList.includes(secretKey) ? (
                  <>
                    {onRemove ? (
                      <Button
                        variant="text"
                        onClick={() => onRemove({ alias, secretKey })}
                        color="secondary"
                        className={classes.Button}
                      >
                        Remove
                      </Button>
                    ) : null}
                    {onUpdate ? (
                      <Button
                        onClick={() => onUpdate({ alias, secretKey })}
                        color="primary"
                        variant="contained"
                        className={classes.Button}
                      >
                        Update
                      </Button>
                    ) : null}
                  </>
                ) : (
                  <Button
                    onClick={() => onUpdate({ alias, secretKey })}
                    color="primary"
                    variant="contained"
                    className={classes.Button}
                  >
                    Add
                  </Button>
                )}
              </DialogActions>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default withStyles(styles)(SecretListTable);
