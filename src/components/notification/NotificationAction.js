import React from 'react';

import TextGrid from '../ui/TextGrid';

const ActionType = ({ ...props }) => (
  <>
    <TextGrid title="Extra Data" value={props.extradata} />
    <TextGrid title="Retry" value={props.retry} />
    <TextGrid title="Synchronous" value={props.synchronous} />
    <TextGrid title="Group" value={props.group} />
  </>
);

const HttpActionType = ({ action: { http } }) => (
  <>
    <TextGrid title="URL" value={http.url} />
    <TextGrid title="Content Type" value={http.contentType} />
    <TextGrid title="Method" value={http.method} />
    <TextGrid title="Timeout" value={http.timeout} />
    <ActionType {...http} />
  </>
);

const EjbActionType = ({ action: { ejb } }) => (
  <>
    <TextGrid title="Bean" value={ejb.bean} />
    <TextGrid title="Method" value={ejb.method} />
    { ejb.data
      && ejb.data.map((thisData) => (
        <TextGrid title={thisData.key} value={thisData.value} />
      ))}
    <ActionType {...ejb} />
  </>
);

const JmsActionType = ({ action: { jms } }) => (
  <>
    <TextGrid title="Queue" value={jms.queue} />
    <TextGrid title="Queue Factory" value={jms.queueFactory} />
    <TextGrid title="Content Type" value={jms.contentType} />
    <TextGrid title="Username" value={jms.username} />
    <TextGrid title="Password" value={jms.password} />
    <ActionType {...jms} />
  </>
);

const SqsActionType = ({ action: { sqs } }) => (
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

const SnsActionType = ({ action: { sns } }) => (
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

const JavascriptActionType = ({ action: { javascript } }) => (
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

export function getActionType(action = {}) {
  if ('http' in action) {
    return 'http';
  } if ('ejb' in action) {
    return 'ejb';
  } if ('jms' in action) {
    return 'jms';
  } if ('sqs' in action) {
    return 'sqs';
  } if ('sns' in action) {
    return 'sns';
  } if ('javascript' in action) {
    return 'javascript';
  }
  return undefined;
}

export default function NotificationAction({
  action = {},
}) {
  let ActionComponent = <></>;
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
