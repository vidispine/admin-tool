import { withStyles } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';

import { OnlineIcon, OfflineIcon } from '../ui/StatusIcon';
import TableRowLink from '../ui/TableRowLink';

const styles = () => ({
  wordBreak: { wordBreak: 'break-all' },
  noBreak: { whiteSpace: 'nowrap' },
});

function NetworkRow({ resource }) {
  return (
    <>
      <TableCell>{resource.netmask}</TableCell>
      <TableCell>{resource.bandwidth}</TableCell>
    </>
  );
}

function ExternalTranscoderRow({ resource }) {
  return (
    <>
      <TableCell>{resource.source}</TableCell>
      <TableCell>{resource.destination}</TableCell>
      <TableCell>{resource.shapeTag}</TableCell>
    </>
  );
}

function TranscoderRow({ classes, resource }) {
  return (
    <>
      <TableCell className={classes.wordBreak}>{resource.url}</TableCell>
      <TableCell>{resource.version}</TableCell>
      <TableCell>{resource.state === 'ONLINE' ? <OnlineIcon /> : <OfflineIcon />}</TableCell>
    </>
  );
}

function ThumbnailServiceRow({ classes, resource }) {
  return (
    <>
      <TableCell className={classes.wordBreak}>{resource.path}</TableCell>
      <TableCell>{resource.state === 'ONLINE' ? <OnlineIcon /> : <OfflineIcon />}</TableCell>
    </>
  );
}

function CerifyRow({ classes, resource }) {
  return <TableCell className={classes.wordBreak}>{resource.address}</TableCell>;
}

function FinalCutServerRow({ classes, resource }) {
  return (
    <>
      <TableCell className={classes.wordBreak}>{resource.url}</TableCell>
      <TableCell>{resource.tag}</TableCell>
      <TableCell>{resource.state}</TableCell>
    </>
  );
}

function MXFServerRow({ classes, resource }) {
  return (
    <>
      <TableCell className={classes.wordBreak}>{resource.url}</TableCell>
      <TableCell>{resource.workspaceUrl}</TableCell>
      <TableCell>{resource.userWorkspaceUrl}</TableCell>
    </>
  );
}

function SigniantRow({ classes, resource }) {
  return (
    <>
      <TableCell className={classes.wordBreak}>{resource.url}</TableCell>
      <TableCell>{resource.tag}</TableCell>
    </>
  );
}

function LDAPRow({ classes, resource }) {
  return <TableCell className={classes.wordBreak}>{resource.url}</TableCell>;
}

function CloudConvertRow({ resource }) {
  return (
    <>
      <TableCell>{resource.publicAddress}</TableCell>
      <TableCell>{resource.apiHost}</TableCell>
    </>
  );
}

function VidinetServiceRow({ classes, resource }) {
  return (
    <>
      <TableCell>{resource.name}</TableCell>
      <TableCell>{resource.type}</TableCell>
      <TableCell className={classes.wordBreak}>{resource.url}</TableCell>
      <TableCell>{resource.endpoint}</TableCell>
      <TableCell>{resource.state}</TableCell>
    </>
  );
}

function EidrRow({ classes, resource }) {
  return (
    <>
      <TableCell className={classes.wordBreak}>{resource.url}</TableCell>
      <TableCell>{resource.partyId}</TableCell>
      <TableCell>{resource.userId}</TableCell>
    </>
  );
}
function CallbackRow({ classes, resource }) {
  return <TableCell className={classes.wordBreak}>{resource.uri}</TableCell>;
}

function ResourceRow({ classes, resource, resourceType }) {
  if (resource[resourceType] === undefined) return null;
  switch (resourceType) {
    case 'network':
      return (
        <NetworkRow
          resource={resource[resourceType]}
          resourceType={resourceType}
          classes={classes}
        />
      );
    case 'transcoder':
      return (
        <TranscoderRow
          resource={resource[resourceType]}
          resourceType={resourceType}
          classes={classes}
        />
      );
    case 'externalTranscoder':
      return (
        <ExternalTranscoderRow
          resource={resource[resourceType]}
          resourceType={resourceType}
          classes={classes}
        />
      );
    case 'cerify':
      return (
        <CerifyRow
          resource={resource[resourceType]}
          resourceType={resourceType}
          classes={classes}
        />
      );
    case 'thumbnail':
      return (
        <ThumbnailServiceRow
          resource={resource[resourceType]}
          resourceType={resourceType}
          classes={classes}
        />
      );
    case 'finalcutserver':
      return (
        <FinalCutServerRow
          resource={resource[resourceType]}
          resourceType={resourceType}
          classes={classes}
        />
      );
    case 'mxfserver':
      return (
        <MXFServerRow
          resource={resource[resourceType]}
          resourceType={resourceType}
          classes={classes}
        />
      );
    case 'signiant':
      return (
        <SigniantRow
          resource={resource[resourceType]}
          resourceType={resourceType}
          classes={classes}
        />
      );
    case 'ldap':
      return (
        <LDAPRow resource={resource[resourceType]} resourceType={resourceType} classes={classes} />
      );
    case 'cloudconvert':
      return (
        <CloudConvertRow
          resource={resource[resourceType]}
          resourceType={resourceType}
          classes={classes}
        />
      );
    case 'vidinet':
      return (
        <VidinetServiceRow
          resource={resource[resourceType]}
          resourceType={resourceType}
          classes={classes}
        />
      );
    case 'eidr':
      return (
        <EidrRow resource={resource[resourceType]} resourceType={resourceType} classes={classes} />
      );
    case 'callback':
      return (
        <CallbackRow
          resource={resource[resourceType]}
          resourceType={resourceType}
          classes={classes}
        />
      );
    default:
      return <TableCell />;
  }
}

function ResourceListRow({ classes, resource, resourceType }) {
  const { id: resourceId } = resource;
  return (
    <TableRowLink hover to={`/resource/${resourceType}/${resourceId}/`}>
      <TableCell className={classes.noBreak}>{resourceId}</TableCell>
      <ResourceRow resource={resource} resourceType={resourceType} classes={classes} />
    </TableRowLink>
  );
}

export default withStyles(styles)(ResourceListRow);
