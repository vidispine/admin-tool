import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ResourceListRow from './ResourceListRow';

function NetworkHeader() {
  return (
    <>
      <TableCell>Netmask</TableCell>
      <TableCell>Bandswidth</TableCell>
    </>
  );
}

function ExternalTranscoderHeader() {
  return (
    <>
      <TableCell>Source</TableCell>
      <TableCell>Destination</TableCell>
      <TableCell>Shape Tag</TableCell>
    </>
  );
}

function TranscoderHeader() {
  return (
    <>
      <TableCell>URL</TableCell>
      <TableCell>Version</TableCell>
      <TableCell>Status</TableCell>
    </>
  );
}

function CerifyHeader() {
  return <TableCell>Address</TableCell>;
}

function FinalCutServerHeader() {
  return (
    <>
      <TableCell>URL</TableCell>
      <TableCell>Tag</TableCell>
      <TableCell>State</TableCell>
    </>
  );
}

function MXFServerHeader() {
  return (
    <>
      <TableCell>URL</TableCell>
      <TableCell>Workspace Url</TableCell>
      <TableCell>User Workspace Url</TableCell>
    </>
  );
}

function SigniantHeader() {
  return (
    <>
      <TableCell>URL</TableCell>
      <TableCell>Tag</TableCell>
    </>
  );
}

function LDAPHeader() {
  return <TableCell>URL</TableCell>;
}

function CloudConvertHeader() {
  return (
    <>
      <TableCell>Public Address</TableCell>
      <TableCell>API Host</TableCell>
    </>
  );
}

function VidinetServiceRow() {
  return (
    <>
      <TableCell>Url</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Endpoint</TableCell>
      <TableCell>State</TableCell>
    </>
  );
}

function EidrHeader() {
  return (
    <>
      <TableCell>URL</TableCell>
      <TableCell>Party ID</TableCell>
      <TableCell>User ID</TableCell>
    </>
  );
}

function ThumbnailServiceHeader() {
  return (
    <>
      <TableCell>Path</TableCell>
      <TableCell>Status</TableCell>
    </>
  );
}

function ResourceHeader({ resourceType }) {
  switch (resourceType) {
    case 'network':
      return <NetworkHeader />;
    case 'transcoder':
      return <TranscoderHeader />;
    case 'externalTranscoder':
      return <ExternalTranscoderHeader />;
    case 'cerify':
      return <CerifyHeader />;
    case 'thumbnail':
      return <ThumbnailServiceHeader />;
    case 'finalcutserver':
      return <FinalCutServerHeader />;
    case 'mxfserver':
      return <MXFServerHeader />;
    case 'signiant':
      return <SigniantHeader />;
    case 'ldap':
      return <LDAPHeader />;
    case 'cloudconvert':
      return <CloudConvertHeader />;
    case 'vidinet':
      return <VidinetServiceRow />;
    case 'eidr':
      return <EidrHeader />;
    default:
      return <TableCell />;
  }
}

export default function NotificationListTable({ resourceListDocument = {}, resourceType }) {
  const { resource: resourceList = [] } = resourceListDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <ResourceHeader resourceType={resourceType} />
        </TableRow>
      </TableHead>
      <TableBody>
        {resourceList.map((resource) => (
          <ResourceListRow key={resource.id} resource={resource} resourceType={resourceType} />
        ))}
      </TableBody>
    </Table>
  );
}
