import Chip from '@material-ui/core/Chip';
import startCase from 'lodash.startcase';

import { ONLINE_STATES, WARNING_STATES } from '../../const/FileStates';
import { OnlineIcon, OfflineIcon, WarningIcon } from '../ui/StatusIcon';

function FileStatus({ fileDocument }) {
  if (fileDocument === undefined) {
    return null;
  }
  const { state } = fileDocument;
  if (ONLINE_STATES.includes(state)) {
    return <Chip avatar={<OnlineIcon />} label={startCase(state.toLowerCase())} />;
  }
  if (WARNING_STATES.includes(state)) {
    return <Chip avatar={<WarningIcon />} label={startCase(state.toLowerCase())} />;
  }
  return (
    <Chip avatar={<OfflineIcon />} label={state ? startCase(state.toLowerCase()) : 'Unknown'} />
  );
}

export default FileStatus;
