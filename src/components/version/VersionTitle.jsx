import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloudUpload from '@material-ui/icons/CloudUpload';

import { withModalNoRouter } from '../../hoc/withModal';
import { OnlineIcon, OfflineIcon } from '../ui/StatusIcon';
import TitleHeader from '../ui/TitleHeader';

const getLicenseStatus = ({ versionDocument }) => {
  if (versionDocument === undefined) {
    return null;
  }
  const { licenseInfo = {} } = versionDocument;
  const { licenseStatus } = licenseInfo;
  if (licenseStatus === 'valid') {
    return <Chip avatar={<OnlineIcon />} label="Valid License" />;
  }
  return <Chip avatar={<OfflineIcon />} label="Invalid License" />;
};

function VersionTitle({ uploadModal, onOpen, ...props }) {
  const { code: versionDocument } = props;
  const StatusIcon = getLicenseStatus({ versionDocument });
  return (
    <TitleHeader
      title="Version"
      iconList={
        <>
          {uploadModal && (
            <Tooltip title="Upload License">
              <IconButton onClick={() => onOpen({ modalName: uploadModal })}>
                <CloudUpload />
              </IconButton>
            </Tooltip>
          )}
          {StatusIcon}
        </>
      }
      {...props}
    />
  );
}

export default withModalNoRouter(VersionTitle);
