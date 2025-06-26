import TableCell from '@material-ui/core/TableCell';

import { OnlineIcon, OfflineIcon } from '../ui/StatusIcon';
import TableRowLink from '../ui/TableRowLink';

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

function TranscoderRow({ resource }) {
  return (
    <>
      <TableCell>{resource.url}</TableCell>
      <TableCell>{resource.version}</TableCell>
      <TableCell>{resource.state === 'ONLINE' ? <OnlineIcon /> : <OfflineIcon />}</TableCell>
    </>
  );
}

function ThumbnailServiceRow({ resource }) {
  return (
    <>
      <TableCell>{resource.path}</TableCell>
      <TableCell>{resource.state === 'ONLINE' ? <OnlineIcon /> : <OfflineIcon />}</TableCell>
    </>
  );
}

function CerifyRow({ resource }) {
  return <TableCell>{resource.address}</TableCell>;
}

function FinalCutServerRow({ resource }) {
  return (
    <>
      <TableCell>{resource.url}</TableCell>
      <TableCell>{resource.tag}</TableCell>
      <TableCell>{resource.state}</TableCell>
    </>
  );
}

function MXFServerRow({ resource }) {
  return (
    <>
      <TableCell>{resource.url}</TableCell>
      <TableCell>{resource.workspaceUrl}</TableCell>
      <TableCell>{resource.userWorkspaceUrl}</TableCell>
    </>
  );
}

function SigniantRow({ resource }) {
  return (
    <>
      <TableCell>{resource.url}</TableCell>
      <TableCell>{resource.tag}</TableCell>
    </>
  );
}

function LDAPRow({ resource }) {
  return <TableCell>{resource.url}</TableCell>;
}

function CloudConvertRow({ resource }) {
  return (
    <>
      <TableCell>{resource.publicAddress}</TableCell>
      <TableCell>{resource.apiHost}</TableCell>
    </>
  );
}

function VidinetServiceRow({ resource }) {
  return (
    <>
      <TableCell>{resource.name}</TableCell>
      <TableCell>{resource.type}</TableCell>
      <TableCell>{resource.url}</TableCell>
      <TableCell>{resource.endpoint}</TableCell>
      <TableCell>{resource.state}</TableCell>
    </>
  );
}

function EidrRow({ resource }) {
  return (
    <>
      <TableCell>{resource.url}</TableCell>
      <TableCell>{resource.partyId}</TableCell>
      <TableCell>{resource.userId}</TableCell>
    </>
  );
}
function CallbackRow({ resource }) {
  return <TableCell>{resource.uri}</TableCell>;
}

function ResourceRow({ resource, resourceType }) {
  if (resource[resourceType] === undefined) return null;
  switch (resourceType) {
    case 'network':
      return <NetworkRow resource={resource[resourceType]} resourceType={resourceType} />;
    case 'transcoder':
      return <TranscoderRow resource={resource[resourceType]} resourceType={resourceType} />;
    case 'externalTranscoder':
      return (
        <ExternalTranscoderRow resource={resource[resourceType]} resourceType={resourceType} />
      );
    case 'cerify':
      return <CerifyRow resource={resource[resourceType]} resourceType={resourceType} />;
    case 'thumbnail':
      return <ThumbnailServiceRow resource={resource[resourceType]} resourceType={resourceType} />;
    case 'finalcutserver':
      return <FinalCutServerRow resource={resource[resourceType]} resourceType={resourceType} />;
    case 'mxfserver':
      return <MXFServerRow resource={resource[resourceType]} resourceType={resourceType} />;
    case 'signiant':
      return <SigniantRow resource={resource[resourceType]} resourceType={resourceType} />;
    case 'ldap':
      return <LDAPRow resource={resource[resourceType]} resourceType={resourceType} />;
    case 'cloudconvert':
      return <CloudConvertRow resource={resource[resourceType]} resourceType={resourceType} />;
    case 'vidinet':
      return <VidinetServiceRow resource={resource[resourceType]} resourceType={resourceType} />;
    case 'eidr':
      return <EidrRow resource={resource[resourceType]} resourceType={resourceType} />;
    case 'callback':
      return <CallbackRow resource={resource[resourceType]} resourceType={resourceType} />;
    default:
      return <TableCell />;
  }
}

export default function ResourceListRow({ resource, resourceType }) {
  const { id: resourceId } = resource;
  return (
    <TableRowLink hover to={`/resource/${resourceType}/${resourceId}/`}>
      <TableCell>{resourceId}</TableCell>
      <ResourceRow resource={resource} resourceType={resourceType} />
    </TableRowLink>
  );
}
