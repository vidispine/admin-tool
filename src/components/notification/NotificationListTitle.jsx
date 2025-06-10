import capitalizeString from '../../utils/capitalizeString';
import TitleHeader from '../ui/TitleHeader';

export default function NotificationListTitle({ entityType, openCode, openCreate, onRefresh }) {
  return (
    <TitleHeader
      title={`Notification ${capitalizeString(entityType)}`}
      onRefresh={onRefresh}
      openCode={openCode}
      openAction={openCreate}
    />
  );
}
