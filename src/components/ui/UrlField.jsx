import { PureComponent } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import update from 'immutability-helper';

import * as scheme from '../../const/UrlScheme';
import decodeUrl from '../../utils/decodeUrl';
import encodeUrl from '../../utils/encodeUrl';

function URIComponentTextField({ onChange, value, ...props }) {
  return (
    <TextField
      value={decodeURIComponent(value)}
      onChange={({ target: { value: newValue, ...target }, ...event }) =>
        onChange({
          ...event,
          target: { ...target, value: encodeURIComponent(newValue) },
        })
      }
      {...props}
    />
  );
}

class DynamicSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(key) {
    return (event, checked) => {
      const { name, value: prevValue, onChange } = this.props;
      let newValue;
      if (key === name) {
        newValue = { [name]: event.target.value }; // Resets form
      } else {
        const subKeys = key.split('.').reverse();
        const subKeyReducer = (acc, cur) => ({ [cur]: acc });
        let initialUpdateCommand = { $set: event.target.value };
        if (checked !== undefined) {
          initialUpdateCommand = { $set: checked };
        }
        const updateCommand = subKeys.reduce(subKeyReducer, initialUpdateCommand);
        newValue = update(prevValue, updateCommand);
      }
      onChange(newValue);
    };
  }

  render() {
    const { children, choices = {}, name = '', value = {}, ...choiceProps } = this.props;
    const choiceValue = value[name];
    const ChoiceComponent = choiceValue ? choices[choiceValue] : null;
    return (
      <>
        <TextField
          select
          value={choiceValue || ''}
          FormHelperTextProps={{ focused: true }}
          onChange={this.onChange(name)}
          fullWidth
        >
          {children}
        </TextField>
        {ChoiceComponent && (
          <ChoiceComponent {...choiceProps} value={value} onChange={this.onChange} />
        )}
      </>
    );
  }
}

const onPathBlur = (blurKey, onKeyChange) => (event) => {
  if (blurKey === 'path') {
    if (!event.target.value.endsWith('/')) {
      const value = `${event.target.value}/`;
      const newEvent = { target: { value } };
      onKeyChange(newEvent);
    }
  }
};

function S3Form({
  value = {
    queryParams: {},
  },
  onChange,
}) {
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={value.direct}
            onChange={onChange('direct')}
            value={value.direct.toString()}
          />
        }
        label="Direct"
      />
      <TextField label="Bucket" value={value.host || ''} onChange={onChange('host')} fullWidth />
      <TextField
        label="Folder"
        value={value.path || '/'}
        onChange={onChange('path')}
        onBlur={onPathBlur('path', onChange('path'))}
        fullWidth
      />
      <URIComponentTextField
        label="Access Key"
        value={value.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <URIComponentTextField
        label="Secret Key"
        value={value.password || ''}
        onChange={onChange('password')}
        fullWidth
      />
      <URIComponentTextField
        label="Role ARN"
        value={value.queryParams.roleArn || ''}
        onChange={onChange('queryParams.roleArn')}
        fullWidth
      />
      <URIComponentTextField
        label="Role External ID"
        value={value.queryParams.roleExternalId || ''}
        onChange={onChange('queryParams.roleExternalId')}
        fullWidth
      />
      <TextField
        label="Endpoint"
        value={value.queryParams.endpoint || ''}
        onChange={onChange('queryParams.endpoint')}
        fullWidth
      />
      <TextField
        label="Region"
        value={value.queryParams.region || ''}
        onChange={onChange('queryParams.region')}
        fullWidth
      />
      <TextField
        label="STS Region"
        value={value.queryParams.stsRegion || ''}
        onChange={onChange('queryParams.stsRegion')}
        fullWidth
      />
      {/* <TextField
      select
      fullWidth
      value={value.queryParams.signer || ''}
      onChange={onChange('queryParams.signer')}
      label="Signer Type"
    >
      <MenuItem value="" />
      <MenuItem value="S3SignerType">S3 Signer</MenuItem>
      <MenuItem value="AWSS3V4SignerType">AWS S3 v4 Signer</MenuItem>
    </TextField> */}
      <TextField
        select
        fullWidth
        value={value.queryParams.storageClass || ''}
        onChange={onChange('queryParams.storageClass')}
        label="Storage Class"
      >
        <MenuItem value="" />
        <MenuItem value="standard">Standard</MenuItem>
        <MenuItem value="infrequent">Infrequent</MenuItem>
        <MenuItem value="reduced">Reduced</MenuItem>
        <MenuItem value="onezone-infrequent">Onezone Infrequent</MenuItem>
      </TextField>
      <TextField
        label="SSE Algorithm"
        value={value.queryParams.sseAlgorithm || ''}
        onChange={onChange('queryParams.sseAlgorithm')}
        fullWidth
      />
      <TextField
        label="SSE Key ID"
        value={value.queryParams.sseKeyId || ''}
        onChange={onChange('queryParams.sseKeyId')}
        fullWidth
      />
      <TextField
        label="Accelerate Transfer"
        value={value.queryParams.accelerate || ''}
        onChange={onChange('queryParams.accelerate')}
        fullWidth
      />
      <TextField
        label="Bucket Owner Full Control"
        value={value.queryParams.bucketOwnerFullControl || ''}
        onChange={onChange('queryParams.bucketOwnerFullControl')}
        fullWidth
      />
      <TextField
        select
        fullWidth
        value={value.queryParams.retrievalTier || ''}
        onChange={onChange('queryParams.retrievalTier')}
        label="Retrieval Tier"
      >
        <MenuItem value="" />
        <MenuItem value="Expedited">Expedited</MenuItem>
        <MenuItem value="Standard">Standard</MenuItem>
        <MenuItem value="Bulk">Bulk</MenuItem>
      </TextField>
      {/* <TextField
      label="Use SSL"
      value={value.queryParams.ssl || ''}
      onChange={onChange('queryParams.ssl')}
      fullWidth
    /> */}
    </>
  );
}

function Ds3Form({ value = {}, onChange }) {
  return (
    <>
      <TextField label="Bucket" value={value.host || ''} onChange={onChange('host')} fullWidth />
      <TextField label="Folder" value={value.path || '/'} onChange={onChange('path')} fullWidth />
      <URIComponentTextField
        label="Access Key"
        value={value.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <URIComponentTextField
        label="Secret Key"
        value={value.password || ''}
        onChange={onChange('password')}
        fullWidth
      />
      <TextField
        label="Endpoint"
        value={value.queryParams.endpoint || ''}
        onChange={onChange('queryParams.endpoint')}
        fullWidth
      />
      <TextField
        label="Chunk Ready Timeout"
        value={value.queryParams.chunkReadyTimeout || ''}
        onChange={onChange('queryParams.chunkReadyTimeout')}
        fullWidth
      />
      <TextField
        select
        fullWidth
        value={value.queryParams.checksumType || ''}
        onChange={onChange('queryParams.checksumType')}
        label="Checksum Type"
      >
        <MenuItem value="" />
        <MenuItem value="md5">md5</MenuItem>
        <MenuItem value="crc32">crc32</MenuItem>
        <MenuItem value="crc32c">crc32c</MenuItem>
      </TextField>
    </>
  );
}

function AzureForm({ value = {}, onChange }) {
  return (
    <>
      <TextField
        label="Account Name"
        value={value.host || ''}
        onChange={onChange('host')}
        fullWidth
      />
      <TextField
        label="Container"
        value={value.path || '/'}
        onBlur={onPathBlur('path', onChange('path'))}
        onChange={onChange('path')}
        fullWidth
      />
      <URIComponentTextField
        label="Access Key"
        value={value.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
    </>
  );
}

function GsForm({ value = {}, onChange }) {
  return (
    <>
      <TextField label="Bucket" value={value.host || ''} onChange={onChange('host')} fullWidth />
      <URIComponentTextField
        label="Access Key"
        value={value.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <TextField
        label="Project"
        value={value.queryParams.project || ''}
        onChange={onChange('queryParams.project')}
        fullWidth
      />
      <TextField
        label="Account"
        value={value.queryParams.account || ''}
        onChange={onChange('queryParams.account')}
        fullWidth
      />
    </>
  );
}

function VidinetForm({ value = {}, onChange }) {
  return (
    <>
      <TextField
        label="Resource ID"
        value={value.host || ''}
        onChange={onChange('host')}
        fullWidth
      />
      <URIComponentTextField
        label="Access Key"
        value={value.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <URIComponentTextField
        label="Secret Key"
        value={value.password || ''}
        onChange={onChange('password')}
        fullWidth
      />
    </>
  );
}

function FtpForm({ value = {}, onChange }) {
  return (
    <>
      <TextField label="Host" value={value.host || ''} onChange={onChange('host')} fullWidth />
      <TextField
        label="Path"
        value={value.path || '/'}
        onBlur={onPathBlur('path', onChange('path'))}
        onChange={onChange('path')}
        fullWidth
      />
      <URIComponentTextField
        label="Username"
        value={value.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <URIComponentTextField
        label="Password"
        value={value.password || ''}
        onChange={onChange('password')}
        fullWidth
      />
    </>
  );
}

function SftpForm({ value = {}, onChange }) {
  return (
    <>
      <TextField label="Host" value={value.host || ''} onChange={onChange('host')} fullWidth />
      <TextField
        label="Path"
        value={value.path || '/'}
        onBlur={onPathBlur('path', onChange('path'))}
        onChange={onChange('path')}
        fullWidth
      />
      <URIComponentTextField
        label="Username"
        value={value.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <URIComponentTextField
        label="Password"
        value={value.password || ''}
        onChange={onChange('password')}
        fullWidth
      />
    </>
  );
}

function HttpForm({ value = {}, onChange }) {
  return (
    <>
      <TextField label="Host" value={value.host || ''} onChange={onChange('host')} fullWidth />
      <TextField label="Port" value={value.port || ''} onChange={onChange('port')} fullWidth />
      <TextField
        label="Path"
        value={value.path || '/'}
        onChange={onChange('path')}
        onBlur={onPathBlur('path', onChange('path'))}
        fullWidth
      />
      <URIComponentTextField
        label="URL Username"
        value={value.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <URIComponentTextField
        label="URL Password"
        value={value.password || ''}
        onChange={onChange('password')}
        fullWidth
      />
    </>
  );
}

function HttpsForm({ value = {}, onChange }) {
  return (
    <>
      <TextField label="Host" value={value.host || ''} onChange={onChange('host')} fullWidth />
      <TextField label="Port" value={value.port || ''} onChange={onChange('port')} fullWidth />
      <TextField
        label="Path"
        value={value.path || '/'}
        onBlur={onPathBlur('path', onChange('path'))}
        onChange={onChange('path')}
        fullWidth
      />
      <URIComponentTextField
        label="URL Username"
        value={value.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <URIComponentTextField
        label="URL Password"
        value={value.password || ''}
        onChange={onChange('password')}
        fullWidth
      />
    </>
  );
}

function OmmsForm({ value = {}, onChange }) {
  return (
    <>
      <TextField label="Host" value={value.host || ''} onChange={onChange('host')} fullWidth />
      <TextField
        label="ClusterID/VaultID"
        value={value.path || '/'}
        onBlur={onPathBlur('path', onChange('path'))}
        onChange={onChange('path')}
        fullWidth
      />
      <URIComponentTextField
        label="User ID"
        value={value.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <URIComponentTextField
        label="User Key"
        value={value.password || ''}
        onChange={onChange('password')}
        fullWidth
      />
    </>
  );
}

function FileForm({ value = {}, onChange }) {
  return (
    <TextField
      label="Path"
      value={value.path || '/'}
      onChange={onChange('path')}
      onBlur={onPathBlur('path', onChange('path'))}
      fullWidth
    />
  );
}

function VsaForm({ value = {}, onChange }) {
  return (
    <>
      <TextField
        label="Agent UUID"
        value={value.host || ''}
        onChange={onChange('host')}
        fullWidth
      />
      <TextField
        label="Share"
        value={value.path || '/'}
        onChange={onChange('path')}
        onBlur={onPathBlur('path', onChange('path'))}
        fullWidth
      />
    </>
  );
}

export default function UrlField(props) {
  const {
    defaultValue,
    input: { value },
  } = props;
  const decodedUrl = decodeUrl(value || defaultValue);
  const onChange = (newValue) => {
    const newUrl = encodeUrl(newValue);
    props?.input?.onChange(newUrl);
  };
  const { path } = decodedUrl;
  return (
    <>
      <FormHelperText>{`${props?.label || 'URL'}: ${value || defaultValue || ''}`}</FormHelperText>
      <DynamicSelect
        choices={{
          [scheme.FILE_SCHEME]: FileForm,
          [scheme.S3_SCHEME]: S3Form,
          [scheme.FTP_SCHEME]: FtpForm,
          [scheme.SFTP_SCHEME]: SftpForm,
          [scheme.HTTP_SCHEME]: HttpForm,
          [scheme.HTTPS_SCHEME]: HttpsForm,
          [scheme.OMMS_SCHEME]: OmmsForm,
          [scheme.DS3_SCHEME]: Ds3Form,
          [scheme.AZURE_SCHEME]: AzureForm,
          [scheme.GS_SCHEME]: GsForm,
          [scheme.VSA_SCHEME]: VsaForm,
          [scheme.VIDINET_SCHEME]: VidinetForm,
        }}
        value={{ ...decodedUrl, path: path || '/' }}
        onChange={onChange}
        name="protocol"
      >
        <MenuItem value={scheme.FILE_SCHEME}>File</MenuItem>
        <MenuItem value={scheme.HTTP_SCHEME}>HTTP</MenuItem>
        <MenuItem value={scheme.S3_SCHEME}>S3</MenuItem>
        <MenuItem value={scheme.FTP_SCHEME}>FTP</MenuItem>
        <MenuItem value={scheme.SFTP_SCHEME}>SFTP</MenuItem>
        <MenuItem value={scheme.HTTPS_SCHEME}>HTTPS</MenuItem>
        <MenuItem value={scheme.OMMS_SCHEME}>Matrix Store</MenuItem>
        <MenuItem value={scheme.DS3_SCHEME}>Spectra BlackPearl</MenuItem>
        <MenuItem value={scheme.AZURE_SCHEME}>Azure</MenuItem>
        <MenuItem value={scheme.GS_SCHEME}>Google Storage</MenuItem>
        <MenuItem value={scheme.VSA_SCHEME}>Vidispine Agent</MenuItem>
        <MenuItem value={scheme.UNIVERSAL_SCHEME}>Universal</MenuItem>
        <MenuItem value={scheme.VIDINET_SCHEME}>Vidinet</MenuItem>
      </DynamicSelect>
    </>
  );
}
