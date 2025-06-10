import MUITableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router-dom';

export default function TableRow({ to, ...props }) {
  const history = useHistory();
  const { onClick: defaultOnClick } = props;
  const onClick = to ? () => history.push(to) : defaultOnClick;
  return (
    <MUITableRow onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'auto' }} {...props} />
  );
}
