import { KeyValuePairType, SimpleMetadataType } from '../ui/DisplayType';
import TextGrid from '../ui/TextGrid';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

function TranscoderType({ value = {} }) {
  return (
    <>
      <TextGrid title="type" value={value.type} hover />
      <TextGrid title="url" value={value.url} hover hideNoValue />
      <TextGrid title="version" value={value.version} hover hideNoValue />
      <TextGrid title="reverseAddress" value={value.reverseAddress} hover hideNoValue />
      <TextGrid
        title="reverseAddressDetected"
        value={value.reverseAddressDetected}
        hover
        hideNoValue
      />
      <TextGrid title="directAccess" value={value.directAccess} hover hideNoValue variant="list" />
      <TextGrid title="state" value={value.state} hover hideNoValue />
      <TypeArray
        title="transcoder"
        value={value.transcoder}
        component={TranscoderType}
        hideNoValue
      />
      <TextGrid title="weight" value={value.weight} hover hideNoValue />
      <TextGrid title="maxJob" value={value.maxJob} hover hideNoValue />
    </>
  );
}

const s3CredentialType = ({ value = {} }) => (
  <TextGrid title="s3CredentialType" value={value} hover />
);

function ForwardServiceType({ value = {} }) {
  return (
    <>
      <TextGrid title="id" value={value.id} hover />
      <TextGrid title="uri" value={value.uri} hover />
    </>
  );
}

function VXAVSInstanceType({ value = {} }) {
  return (
    <>
      <TextGrid title="vsClusterAddress" value={value.vsClusterAddress} hover hideNoValue />
      <TextGrid title="uri" value={value.uri} hover hideNoValue />
      <TextGrid title="status" value={value.status} hover hideNoValue />
      <TextGrid title="lastSeen" value={value.lastSeen} variant="timestamp" hover hideNoValue />
    </>
  );
}

function VXASecretType({ value = {} }) {
  return (
    <>
      <TextGrid title="alias" value={value.alias} hover />
      <TypeSection value={value.value} component={SimpleMetadataType} />
    </>
  );
}

function VXAStorageType({ value = {} }) {
  return (
    <>
      <TextGrid title="name" value={value.name} hover />
      <TextGrid title="id" value={value.id} hover />
      <TextGrid title="path" value={value.path} hover />
      <TextGrid title="isCollectionStorage" value={value.isCollectionStorage} hover hideNoValue />
      <TextGrid title="createProxiesStorage" value={value.createProxiesStorage} hover hideNoValue />
    </>
  );
}

function VXAType({ value = {} }) {
  return (
    <>
      <TextGrid title="uuid" value={value.uuid} hover />
      <TextGrid title="name" value={value.name} hover hideNoValue />
      <TextGrid title="uri" value={value.uri} hover hideNoValue />
      <TextGrid title="lastSeen" value={value.lastSeen} variant="timestamp" hover hideNoValue />
      <TextGrid title="user" value={value.user} hover hideNoValue />
      <TextGrid title="allStorages" value={value.allStorages} variant="boolean" hideNoValue hover />
      <TypeArray title="storage" value={value.storage} component={VXAStorageType} hideNoValue />
      <TextGrid title="file" value={value.file} hover variant="list" hideNoValue />
      <TextGrid title="instance" value={value.instance} hover hideNoValue />
      <TextGrid title="vxaVersion" value={value.vxaVersion} hover />
      <TypeSection component={s3CredentialType} value={value.s3CredentialType} hideNoValue />
      <TextGrid title="transcoderVersion" value={value.transcoderVersion} hover />
      <TextGrid title="port" value={value.port} hover hideNoValue />
      <TextGrid title="status" value={value.status} hover hideNoValue />
      <TextGrid title="mode" value={value.mode} hover hideNoValue />
      <TextGrid title="publicKey" value={value.publicKey} hover variant="code" hideNoValue />
      <TextGrid title="vsClusterAddress" value={value.vsClusterAddress} hover hideNoValue />
      <TypeArray
        title="vsInstance"
        value={value.vsInstance}
        component={VXAVSInstanceType}
        hideNoValue
      />
      <TypeArray
        title="transcoder"
        value={value.transcoder}
        component={TranscoderType}
        hideNoValue
      />
      <TextGrid title="agentGroup" value={value.agentGroup} hover hideNoValue />
      <TextGrid title="externalUri" value={value.externalUri} hover hideNoValue />
      <TextGrid title="publicEndpointUri" value={value.publicEndpointUri} hover hideNoValue />
      <TypeArray
        title="Forward Service"
        value={value.forwardService}
        component={ForwardServiceType}
        hideNoValue
      />
      <TypeArray title="resourceTag" value={value.resourceTag} component={KeyValuePairType} />
      <TextGrid title="certificate" value={value.certificate} hover hideNoValue />
      <TypeArray title="secret" value={value.secret} component={VXASecretType} />
    </>
  );
}

export default function VxaDisplay({ vxaDocument }) {
  return <TypeSection component={VXAType} value={vxaDocument} />;
}
