import Chip from '@material-ui/core/Chip';

import { OnlineIcon, OfflineIcon } from '../ui/StatusIcon';
import TitleHeader from '../ui/TitleHeader';

function VxaStatus({ vxaDocument }) {
  if (vxaDocument === undefined) {
    return null;
  }
  const { status } = vxaDocument;
  if (status === 'ONLINE') {
    return <Chip avatar={<OnlineIcon />} label="Online" />;
  }
  return <Chip avatar={<OfflineIcon />} label="Offline" />;
}

export default function VxaTitle({ vxaUuid, ...props }) {
  return (
    <TitleHeader
      helpTo="/ref/vsa.html"
      title={vxaUuid}
      parentTitle="Agent"
      parentTo="/vxa/"
      iconList={<VxaStatus vxaDocument={props.code} />}
      {...props}
    />
  );
}
