import routes from '../../const/routes';
import TitleHeader from '../ui/TitleHeader';

export default function ImportAccessTitle({ openCode, openCreate, onRefresh, userName }) {
  return (
    <TitleHeader
      title="Import Access"
      grandParentTitle="User"
      grandParentTo="/user/"
      parentTitle={decodeURI(userName)}
      parentTo={routes.user({ userName })}
      onRefresh={onRefresh}
      openCode={openCode}
      openAction={openCreate}
    />
  );
}
