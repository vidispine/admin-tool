import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField, Select } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import ChipInput from '../ui/ChipInput';
import Field from '../ui/Field';
import FieldArray from '../ui/FieldArray';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { SimpleMetadataType, KeyValuePairType } from '../ui/FormType';
import UrlField from '../ui/UrlField';

function TranscoderConfigurationType() {
  return (
    <>
      <Field
        name="encoderThreads"
        label="encoderThreads"
        component={TextField}
        type="number"
        fullWidth
      />
      <Field
        name="decoderOfferThreads"
        label="decoderOfferThreads"
        component={TextField}
        type="number"
        fullWidth
      />
      <Field name="apiURL" label="apiURL" component={TextField} fullWidth />
      <Field name="apiUsername" label="apiUsername" component={TextField} fullWidth />
      <Field name="apiPassword" label="apiPassword" component={TextField} fullWidth />
      <Field name="dataPath" label="dataPath" component={TextField} fullWidth />
      <Field name="presetPath" label="presetPath" component={TextField} fullWidth />
      <Field name="tempPath" label="tempPath" component={TextField} fullWidth />
      <FormControlLabel
        control={<Field name="bilinearEffects" component={BoolCheckbox} />}
        label="Bilinear Effects"
      />
    </>
  );
}

function MediaLocation() {
  return (
    <>
      <Field name="name" component={TextField} label="Media Location Name" fullWidth />
      <Field
        name="storageMethod"
        component={ChipInput}
        label="Media Location Storage Method"
        simple
        fullWidth
      />
    </>
  );
}

function TranscoderDirectAccessRewrite() {
  return (
    <>
      <Field name="pattern" component={TextField} label="Pattern" fullWidth />
      <Field name="replacement" component={TextField} label="Replacement" fullWidth />
    </>
  );
}

function TranscoderDirectAccess() {
  return (
    <>
      <Field name="filter" component={TextField} label="Filter" fullWidth />
      <FieldTypeArray name="rewrite" label="Rewrite" component={TranscoderDirectAccessRewrite} />
    </>
  );
}

export function NetworkTypeForm() {
  return (
    <>
      <Field name="netmask" component={TextField} label="Netmask" fullWidth />
      <Field name="bandwidth" component={TextField} label="Bandwidth" fullWidth />
    </>
  );
}

export function ExternalTranscoderTypeForm() {
  return (
    <>
      <Field name="source" component={TextField} label="Source" fullWidth />
      <Field name="destination" component={TextField} label="Destination" fullWidth />
      <Field name="shapeTag" component={TextField} label="Shape Tag" fullWidth />
      <Field name="timeout" component={TextField} label="Timeout" fullWidth />
      <Field name="interval" component={TextField} label="Interval" fullWidth />
      <Field name="checks" component={TextField} label="Checks" fullWidth />
      <Field name="regex" component={TextField} label="Regex" fullWidth />
    </>
  );
}

export function CerifyTypeForm() {
  return (
    <>
      <Field name="address" component={UrlField} label="Address" fullWidth defaultValue="http://" />
      <Field name="cleanup" component={TextField} label="Cleanup" fullWidth />
      <FieldTypeArray name="mediaLocation" label="Media Location" component={MediaLocation} />
    </>
  );
}

export function FinalCutServerTypeForm() {
  return (
    <>
      <Field name="url" component={UrlField} label="URL" fullWidth defaultValue="http://" />
      <Field name="tag" component={TextField} label="Tag" fullWidth />
      <Field name="State" component={TextField} label="state" fullWidth />
      <Field name="description" label="Description" component={TextField} fullWidth />
      <FormSection name="metadata" component={SimpleMetadataType} />
    </>
  );
}

export function MXFServerResourceTypeForm() {
  return (
    <>
      <Field name="url" label="URL" component={UrlField} fullWidth defaultValue="http://" />
      <Field name="workspaceUrl" label="Workspace Url" component={TextField} fullWidth />
      <Field name="userWorkspaceUrl" label="User Workspace Url" component={TextField} fullWidth />
      <Field
        name="mxfServerWorkspacePath"
        label="MXFServer Workspace Path"
        component={TextField}
        fullWidth
      />
      <Field name="mxfServerUserId" label="MXFServer User Id" component={TextField} fullWidth />
      <Field
        name="mxfServerPathToStorage"
        label="MXFServer Path To Storage"
        component={TextField}
        fullWidth
      />
      <Field name="databaseName" label="Database Name" component={TextField} fullWidth />
      <Field name="description" label="Description" component={TextField} fullWidth />
      <Field name="atomShapes" label="Atom Shapes" component={TextField} fullWidth />
      <Field name="importShapes" label="Import Shapes" component={TextField} fullWidth />
      <Field name="detectAtom" label="Detect Atom" component={TextField} fullWidth />
      <Field name="enforceQuota" label="Enforce Quota" component={TextField} fullWidth />
      <Field name="fileImportPattern" label="File Import Pattern" component={TextField} fullWidth />
      <FormSection name="metadata" component={SimpleMetadataType} />
    </>
  );
}

export function SigniantTypeForm() {
  return (
    <>
      <Field name="url" component={UrlField} label="URL" fullWidth defaultValue="http://" />
      <Field name="tag" label="Tag" component={TextField} fullWidth />
      <Field name="username" label="Username" component={TextField} fullWidth />
      <Field name="password" label="Password" component={TextField} fullWidth />
      <Field name="description" label="Description" component={TextField} fullWidth />
    </>
  );
}

export function LDAPResourceTypeForm() {
  return (
    <>
      <Field name="url" label="url" component={ChipInput} simple fullWidth />
      <Field name="useStartTLS" label="Use StartTLS" component={TextField} fullWidth />
      <Field name="userDN" label="User DN" component={TextField} fullWidth />
      <Field name="" label="" component={TextField} fullWidth />
      <Field name="usernameAttribute" label="Username Attribute" component={TextField} fullWidth />
      <Field name="userSearchFilter" label="User Search Filter" component={TextField} fullWidth />
      <Field name="bindDN" label="Bind DN" component={TextField} fullWidth />
      <Field name="bindPassword" label="Bind Password" component={TextField} fullWidth />
      <Field name="cacheLifetime" label="Cache Lifetime" component={TextField} fullWidth />
      <Field name="groupDN" label="Group DN" component={TextField} fullWidth />
      <Field name="groupSearchFilter" label="Group Search Filter" component={TextField} fullWidth />
      <Field name="realNameAttribute" label="Real Name Attribute" component={TextField} fullWidth />
      <Field
        name="groupnameAttribute"
        label="Groupname Attribute"
        component={TextField}
        fullWidth
      />
      <FormControlLabel
        control={<Field name="sync.createUsers" component={BoolCheckbox} />}
        label="Create Users"
      />
      <FormControlLabel
        control={<Field name="sync.createGroups" component={BoolCheckbox} />}
        label="Create Groups"
      />
    </>
  );
}

export function CloudConvertTypeForm() {
  return (
    <>
      <Field name="publicAddress" label="Public Address" component={TextField} fullWidth />
      <Field name="apiHost" label="API Host" component={TextField} fullWidth />
      <Field name="apiKey" label="API Key" component={TextField} fullWidth />
      <Field name="inputMethod" label="Input Method" component={TextField} fullWidth />
      <Field name="script" label="Script" component={TextField} fullWidth />
    </>
  );
}

export function VidinetServiceTypeForm() {
  return (
    <>
      <Field name="url" component={UrlField} label="URL" fullWidth defaultValue="vidinet://" />
      <Field name="name" label="Name" component={TextField} fullWidth />
      <Field name="endpoint" label="Endpoint" component={TextField} fullWidth />
      <Field name="type" label="Type" component={TextField} fullWidth />
      <Field name="scheme" label="Scheme" component={ChipInput} simple fullWidth />
    </>
  );
}

export function EidrTypeForm() {
  return (
    <>
      <Field name="url" component={UrlField} label="URL" fullWidth defaultValue="http://" />
      <Field name="include" label="Include" component={ChipInput} simple fullWidth />
      <Field name="partyId" label="Party ID" component={TextField} fullWidth />
      <Field name="userId" label="User ID" component={TextField} fullWidth />
      <Field name="password" label="Password" component={TextField} fullWidth />
    </>
  );
}
export function CallbackLocationResourceTypeForm() {
  return <Field name="uri" component={TextField} label="URI" fullWidth />;
}

export function TranscoderTypeForm() {
  return (
    <>
      <Field name="url" label="URL" component={UrlField} fullWidth defaultValue="http://" />
      <FormControl fullWidth>
        <InputLabel htmlFor="type">Resource Name</InputLabel>
        <Field name="type" component={Select} required>
          <MenuItem value="TRANSCODER">TRANSCODER</MenuItem>
          <MenuItem value="DIRECTORY">DIRECTORY</MenuItem>
        </Field>
      </FormControl>
      <Field label="Weight" name="weight" component={TextField} fullWidth />
      <Field name="maxJob" label="Max Job" component={TextField} fullWidth />
      <FieldTypeArray
        name="directAccess"
        label="Direct Access"
        component={TranscoderDirectAccess}
      />
      <FieldTypeArray
        name="resourceTag"
        label="resourceTag"
        component={KeyValuePairType}
        fullWidth
      />
      <FormSection
        name="configuration"
        label="Configuration"
        component={TranscoderConfigurationType}
      />
    </>
  );
}

export function ThumbnailServiceTypeForm() {
  return (
    <>
      <FieldArray name="path" label="Path" component={UrlField} />
      {/* // This is an array from v23.2
    <Field
      name="path"
      component={UrlField}
      label="Path"
      fullWidth
      defaultValue="file://"
    /> */}
      <FormControl fullWidth>
        <InputLabel htmlFor="mode">Mode</InputLabel>
        <Field name="mode" component={Select}>
          <MenuItem value="READ_WRITE">READ_WRITE</MenuItem>
          <MenuItem value="READ">READ</MenuItem>
          <MenuItem value="NONE">NONE</MenuItem>
        </Field>
      </FormControl>
    </>
  );
}

function ResourceTypeForm({ resourceType }) {
  switch (resourceType) {
    case 'network':
      return <FormSection name="network" component={NetworkTypeForm} />;
    case 'transcoder':
      return <FormSection name="transcoder" component={TranscoderTypeForm} />;
    case 'externalTranscoder':
      return <FormSection name="externalTranscoder" component={ExternalTranscoderTypeForm} />;
    case 'cerify':
      return <FormSection name="cerify" component={CerifyTypeForm} />;
    case 'thumbnail':
      return <FormSection name="thumbnail" component={ThumbnailServiceTypeForm} />;
    case 'finalcutserver':
      return <FormSection name="finalcutserver" component={FinalCutServerTypeForm} />;
    case 'mxfserver':
      return <FormSection name="mxfserver" component={MXFServerResourceTypeForm} />;
    case 'signiant':
      return <FormSection name="signiant" component={SigniantTypeForm} />;
    case 'ldap':
      return <FormSection name="ldap" component={LDAPResourceTypeForm} />;
    case 'cloudconvert':
      return <FormSection name="cloudconvert" component={CloudConvertTypeForm} />;
    case 'vidinet':
      return <FormSection name="vidinet" component={VidinetServiceTypeForm} />;
    case 'eidr':
      return <FormSection name="eidr" component={EidrTypeForm} />;
    case 'callback':
      return <FormSection name="callback" component={CallbackLocationResourceTypeForm} />;
    default:
      return null;
  }
}

function ResourceForm({ error, handleSubmit, resourceType }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="resourceDocument"
        component={ResourceTypeForm}
        resourceType={resourceType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ResourceForm);
