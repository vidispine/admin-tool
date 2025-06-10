import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LinkIcon from '@material-ui/icons/Link';
import { withRouter } from 'react-router-dom';

function ExternalIdLink({ entityId, entityType, history }) {
  return (
    <Tooltip title="External Id">
      <IconButton onClick={() => history.push(`/external-id/${entityType}/${entityId}`)}>
        <LinkIcon />
      </IconButton>
    </Tooltip>
  );
}

export default withRouter(ExternalIdLink);
