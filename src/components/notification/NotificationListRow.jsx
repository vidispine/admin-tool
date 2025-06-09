import TableCell from '@material-ui/core/TableCell';
import TableRowLink from '../ui/TableRowLink';

export default function NotificationListRow({
  notification,
  entityType,
}) {
  const notificationPath = new URL(notification).pathname;
  const notificationId = notificationPath.split('/').pop();
  return (
    <TableRowLink hover to={`/notification/${entityType}/${notificationId}/`}>
      <TableCell>{notificationId}</TableCell>
      <TableCell />
    </TableRowLink>
  );
}
