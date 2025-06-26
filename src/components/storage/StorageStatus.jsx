import Chip from '@material-ui/core/Chip';
import startCase from 'lodash.startcase';

import { OK_STATES, WARNING_STATES } from '../../const/StorageStates';
import { OnlineIcon, OfflineIcon, WarningIcon } from '../ui/StatusIcon';

function StorageStatus({ storageDocument, ...props }) {
  if (storageDocument === undefined) {
    return null;
  }
  const { state } = storageDocument;
  if (OK_STATES.includes(state)) {
    const label = state === 'NONE' ? 'Online' : state.toLowerCase();
    return <Chip avatar={<OnlineIcon />} label={label} {...props} />;
  }
  if (WARNING_STATES.includes(state)) {
    return <Chip avatar={<WarningIcon />} label={startCase(state.toLowerCase())} {...props} />;
  }
  return (
    <Chip
      avatar={<OfflineIcon />}
      label={state ? startCase(state.toLowerCase()) : 'Unknown'}
      {...props}
    />
  );
}

export default StorageStatus;
