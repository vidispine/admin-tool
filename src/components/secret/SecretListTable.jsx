import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '../ui/TableRowLink';

import routes from '../../const/routes';

function SecretListTable({ secretListDocument }) {
  const secretList = secretListDocument?.secret || [];
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Alias</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {secretList.map((secret) => (
            <TableRow
              key={secret.alias}
              to={routes.secret({ alias: secret.alias })}
              hover
            >
              <TableCell>{secret.alias}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default SecretListTable;
