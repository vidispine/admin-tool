import TextGrid from '../ui/TextGrid';

function ActionType({ ...props }) {
  return (
    <>
      <TextGrid title="Extra Data" value={props.extradata} />
      <TextGrid title="Retry" value={props.retry} />
      <TextGrid title="Synchronous" value={props.synchronous} />
      <TextGrid title="Group" value={props.group} />
    </>
  );
}

function HttpActionType({ action: { http } }) {
  return (
    <>
      <TextGrid title="URL" value={http.url} />
      <TextGrid title="Content Type" value={http.contentType} />
      <TextGrid title="Method" value={http.method} />
      <TextGrid title="Timeout" value={http.timeout} />
      <ActionType {...http} />
    </>
  );
}

function EjbActionType({ action: { ejb } }) {
  return (
    <>
      <TextGrid title="Bean" value={ejb.bean} />
      <TextGrid title="Method" value={ejb.method} />
      {ejb.data &&
        ejb.data.map((thisData) => <TextGrid title={thisData.key} value={thisData.value} />)}
      <ActionType {...ejb} />
    </>
  );
}

function JmsActionType({ action: { jms } }) {
  return (
    <>
      <TextGrid title="Queue" value={jms.queue} />
      <TextGrid title="Queue Factory" value={jms.queueFactory} />
      <TextGrid title="Content Type" value={jms.contentType} />
      <TextGrid title="Username" value={jms.username} />
      <TextGrid title="Password" value={jms.password} />
      <ActionType {...jms} />
    </>
  );
}

function SqsActionType({ action: { sqs } }) {
  return (
    <>
      <TextGrid title="Queue" value={sqs.queue} />
      <TextGrid title="Endpoint" value={sqs.endpoint} />
      <TextGrid title="Content Type" value={sqs.contentType} />
      <TextGrid title="Access Key" value={sqs.accessKey} />
      <TextGrid title="Secret Key" value={sqs.secret} />
      <TextGrid title="Role ARN" value={sqs.roleArn} />
      <TextGrid title="RoleSession Name" value={sqs.roleSessionName} />
      <TextGrid title="Role External ID" value={sqs.roleExternalId} />
      <TextGrid title="Message Group ID" value={sqs.messageGroupId} />
      <ActionType {...sqs} />
    </>
  );
}

function SnsActionType({ action: { sns } }) {
  return (
    <>
      <TextGrid title="Topic" value={sns.topic} />
      <TextGrid title="Endpoint" value={sns.endpoint} />
      <TextGrid title="Content Type" value={sns.contentType} />
      <TextGrid title="Access Key" value={sns.accessKey} />
      <TextGrid title="Secret Key" value={sns.secret} />
      <TextGrid title="Role ARN" value={sns.roleArn} />
      <TextGrid title="RoleSession Name" value={sns.roleSessionName} />
      <TextGrid title="Role External ID" value={sns.roleExternalId} />
      <ActionType {...sns} />
    </>
  );
}

function JavascriptActionType({ action: { javascript } }) {
  return (
    <>
      <TextGrid
        value={javascript.script}
        variant="code"
        codeProps={{
          mode: 'application/javascript',
        }}
      />
      <ActionType {...javascript} />
    </>
  );
}

export function getActionType(action = {}) {
  if ('http' in action) {
    return 'http';
  }
  if ('ejb' in action) {
    return 'ejb';
  }
  if ('jms' in action) {
    return 'jms';
  }
  if ('sqs' in action) {
    return 'sqs';
  }
  if ('sns' in action) {
    return 'sns';
  }
  if ('javascript' in action) {
    return 'javascript';
  }
  return undefined;
}

export default function NotificationAction({ action = {} }) {
  let ActionComponent = null;
  const actionType = getActionType(action);
  switch (actionType) {
    case 'http':
      ActionComponent = HttpActionType;
      break;
    case 'ejb':
      ActionComponent = EjbActionType;
      break;
    case 'jms':
      ActionComponent = JmsActionType;
      break;
    case 'sqs':
      ActionComponent = SqsActionType;
      break;
    case 'sns':
      ActionComponent = SnsActionType;
      break;
    case 'javascript':
      ActionComponent = JavascriptActionType;
      break;
    default:
      break;
  }
  return (
    <>
      <TextGrid title="Action Type" value={actionType} />
      <ActionComponent action={action} />
    </>
  );
}
