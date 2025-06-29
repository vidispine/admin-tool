import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import update from 'immutability-helper';
import { reduxForm, Field, FormSection, FieldArray } from 'redux-form';

import { TextField } from '../form';
import CodeField from '../ui/CodeField';
import SimpleMetadataField from '../ui/SimpleMetadataField';
import StatefulSelect from '../ui/StatefulSelect';

import { getActionType } from './NotificationAction';

function ActionTypeBase() {
  return (
    <>
      <Field name="retry" label="Retry" component={TextField} fullWidth required />
      <Field name="synchronous" label="Synchronous" component={TextField} fullWidth />
      <Field name="extradata" label="Extra Data" component={TextField} fullWidth />
      <Field name="group" label="Group" component={TextField} fullWidth />
    </>
  );
}

function ActionTypeHttp() {
  return (
    <>
      <Field name="url" label="URL" component={TextField} fullWidth />
      <Field name="contentType" label="Content Type" component={TextField} fullWidth />
      <Field name="method" label="Method" component={TextField} fullWidth />
      <Field name="timeout" label="Timeout" component={TextField} fullWidth required />
      <ActionTypeBase />
    </>
  );
}

function ActionTypeEjb() {
  return (
    <>
      <Field name="bean" label="Bean" component={TextField} fullWidth />
      <Field name="method" label="Method" component={TextField} fullWidth />
      <FieldArray name="data" component={SimpleMetadataField} label="Data" buttonLabel="Add Data" />
      <ActionTypeBase />
    </>
  );
}

function ActionTypeJms() {
  return (
    <>
      <Field name="Queue" label="Queue" component={TextField} fullWidth />
      <Field name="queueFactory" label="Queue Factory" component={TextField} fullWidth />
      <Field name="contentType" label="Content Type" component={TextField} fullWidth />
      <Field name="username" label="Username" component={TextField} fullWidth />
      <Field name="password" label="Password" component={TextField} fullWidth />
      <ActionTypeBase />
    </>
  );
}

function ActionTypeSqs() {
  return (
    <>
      <Field name="queue" label="Queue" component={TextField} fullWidth />
      <Field name="endpoint" label="Endpoint" component={TextField} fullWidth />
      <Field name="contentType" label="Content Type" component={TextField} fullWidth />
      <Field name="accessKey" label="Access Key" component={TextField} fullWidth />
      <Field name="secret" label="Secret Key" component={TextField} fullWidth />
      <Field name="roleArn" label="Role ARN" component={TextField} fullWidth />
      <Field name="roleSessionName" label="Role Session Name" component={TextField} fullWidth />
      <Field name="roleExternalId" label="Role External ID" component={TextField} fullWidth />
      <Field name="messageGroupId" label="Message Group ID" component={TextField} fullWidth />
      <ActionTypeBase />
    </>
  );
}

function ActionTypeSns() {
  return (
    <>
      <Field name="topic" label="Topic" component={TextField} fullWidth />
      <Field name="endpoint" label="Endpoint" component={TextField} fullWidth />
      <Field name="contentType" label="Content Type" component={TextField} fullWidth />
      <Field name="accessKey" label="Access Key" component={TextField} fullWidth />
      <Field name="secret" label="Secret Key" component={TextField} fullWidth />
      <Field name="roleArn" label="Role ARN" component={TextField} fullWidth />
      <Field name="roleSessionName" label="Role Session Name" component={TextField} fullWidth />
      <Field name="roleExternalId" label="Role External ID" component={TextField} fullWidth />
      <ActionTypeBase />
    </>
  );
}

function ActionTypeJavascript() {
  return (
    <>
      <Field
        name="script"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/json',
          lineWrapping: true,
          lineNumbers: true,
        }}
      />
      <ActionTypeBase />
    </>
  );
}

function ActionTypeSelect(props) {
  const { initialValues = {}, valueSelector, dirty } = props;
  let initialActionType;
  if (dirty) {
    const action = valueSelector('notificationDocument.action');
    initialActionType = getActionType(action);
  } else {
    const { notificationDocument = {} } = initialValues;
    const { action = {} } = notificationDocument;
    initialActionType = getActionType(action);
  }
  // TODO Refactor this to a standalone component
  // eslint-disable-next-line react/no-unstable-nested-components
  function TriggerComponent(value) {
    switch (value) {
      case 'http':
        return <FormSection name="http" component={ActionTypeHttp} {...props} />;
      case 'ejb':
        return <FormSection name="ejb" component={ActionTypeEjb} {...props} />;
      case 'jms':
        return <FormSection name="jms" component={ActionTypeJms} {...props} />;
      case 'sqs':
        return <FormSection name="sqs" component={ActionTypeSqs} {...props} />;
      case 'sns':
        return <FormSection name="sns" component={ActionTypeSns} {...props} />;
      case 'javascript':
        return <FormSection name="javascript" component={ActionTypeJavascript} {...props} />;
      default:
        return null;
    }
  }
  const onChange = (event, newValue, previousValue, name) => {
    const prevState = valueSelector(name);
    if (prevState) {
      const newState = update(prevState, {
        [newValue]: {
          $set: {},
        },
        $unset: [previousValue],
      });
      props?.change(name, newState);
    } else {
      props?.change(name, {});
    }
  };
  return (
    <StatefulSelect
      label="Action Type"
      initialvalue={initialActionType}
      fullWidth
      onChange={onChange}
      // eslint-disable-next-line react/jsx-no-bind
      ValueComponent={TriggerComponent}
      name="notificationDocument.action"
    >
      <MenuItem value="http">HTTP</MenuItem>
      <MenuItem value="ejb">EJB</MenuItem>
      <MenuItem value="jms">JMS</MenuItem>
      <MenuItem value="sqs">SQS</MenuItem>
      <MenuItem value="sns">SNS</MenuItem>
      <MenuItem value="javascript">Javascript</MenuItem>
    </StatefulSelect>
  );
}

function NotificationActionForm(props) {
  return (
    <form onSubmit={props?.handleSubmit}>
      {props?.error && <Typography color="error">{props?.error}</Typography>}
      <FormSection {...props} name="notificationDocument.action" component={ActionTypeSelect} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(NotificationActionForm);
