import { useRef, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { Link, useHistory } from 'react-router-dom';
import { components as SelectComponents } from 'react-select';

import routes from '../../const/routes';
import { optionListToScore } from '../../utils/similar';

import NavSelectCreateable from './NavSelectCreateable';

const goToOptions = [
  {
    value: (entityId) => `/item/${entityId}`,
    label: 'Item',
    synonyms: ['item'],
    siteId: true,
  },
  {
    value: (entityId) => `/collection/${entityId}`,
    label: 'Collection',
    synonyms: ['collection'],
    siteId: true,
  },
  {
    value: (entityId) => `/storage/${entityId}`,
    label: 'Storage',
    synonyms: ['storage'],
    siteId: true,
  },
  {
    value: (entityId) => `/file/${entityId}`,
    label: 'File',
    synonyms: ['file'],
    siteId: true,
  },
  {
    value: (entityId) => routes.user({ userName: entityId }),
    label: 'User',
    synonyms: ['user'],
    siteId: false,
  },
  {
    value: (entityId) => routes.group({ groupName: entityId }),
    label: 'Group',
    synonyms: ['group'],
    siteId: false,
  },
  {
    value: (entityId) => `/metadata-field/${entityId}`,
    label: 'Metadata Field',
    synonyms: ['metadata', 'field', 'md'],
    siteId: false,
  },
  {
    value: (entityId) => `/field-group/${entityId}`,
    label: 'Field Group',
    synonyms: ['fieldgroup', 'fg'],
    siteId: false,
  },
  {
    value: (entityId) => `/job/${entityId}`,
    label: 'Job',
    synonyms: ['job'],
    siteId: true,
  },
];

const linkOptions = [
  { value: '/new-job/', label: 'New Job' },
  { value: '/job', label: 'Job List' },
  { value: '/job/problem', label: 'Job Problems' },
  { value: '/jobtype/', label: 'Job Types' },
  { value: '/search/', label: 'Search Items & Collections' },
  { value: routes.itemList(), label: 'Search Items' },
  { value: '/collection/', label: 'Search Collections' },
  { value: '/shape/', label: 'Search Shapes' },
  { value: '/item/metadata-group/', label: 'Search Item By Metadata Group' },
  { value: '/library/', label: 'Search Libraries' },
  { value: '/library/', label: 'Search Libraries' },
  { value: '/storage/', label: 'Storages' },
  { value: '/file/', label: 'Files' },
  { value: '/search/file/', label: 'Search Files' },
  { value: '/storage-rule/', label: 'Storage Rules' },
  { value: '/import/item/placeholder/', label: 'Create Item' },
  { value: '/import/collection/', label: 'Create Collection' },
  { value: '/import/item/shape/placeholder/', label: 'Create Shape' },
  { value: '/import/file/', label: 'Import File' },
  { value: '/import/item/upload/', label: 'Upload' },
  { value: '/import/item/uri/', label: 'Import URIs' },
  { value: '/import/item/shape/', label: 'Import Shape' },
  { value: '/import/item/component/', label: 'Import Component' },
  { value: '/import/item/shape/essence/', label: 'Import Essence' },
  { value: '/import/sidecar/', label: 'Import Sidecar' },
  { value: '/import/sidecar/upload/', label: 'Upload Sidecar' },
  { value: '/import-imp/?tab=IMPORTIMP_URL_TAB', label: 'Import IMP URL' },
  { value: '/import-imp/?tab=IMPORTIMP_PATH_TAB', label: 'Import IMP Path' },
  { value: '/import-imp/?tab=IMPORTIMP_FILE_TAB', label: 'Import IMP File' },
  { value: '/import-imp/?tab=IMPORTSIDECAR_TAB', label: 'Import Sidecar File' },
  {
    value: '/import-imp/?tab=IMPORTSIDECARRAW_TAB',
    label: 'Upload Sidecar File',
  },
  { value: '/vxa/', label: 'VSA Server Agents' },
  { value: '/resource/transcoder/', label: 'Transcoders' },
  { value: '/resource/thumbnail/', label: 'Thumbnail Paths' },
  { value: '/resource/vidinet/', label: 'Vidinet' },
  { value: '/export-location', label: 'Export Locations' },
  { value: '/user/', label: 'Users' },
  { value: '/group/', label: 'Groups' },
  { value: '/metadata-field/', label: 'Metadata Fields' },
  { value: '/metadata-dataset/', label: 'Metadata Datasets' },
  { value: '/field-group/', label: 'Metadata Field Groups' },
  { value: '/debug/echo/', label: 'XML Echo' },
  { value: '/javascript/test/', label: 'Javascript Test' },
  { value: '/wizard/', label: 'Wizard' },
  { value: '/shape-tag/', label: 'Shape Tags' },
  { value: '/version/', label: 'Version' },
  { value: '/selftest/', label: 'Self Test' },
  { value: '/log', label: 'Audit Log' },
  { value: '/error/', label: 'Error Log' },
  { value: '/reindex/', label: 'Re-Index' },
  { value: '/service/', label: 'Services' },
  { value: '/configuration/properties/', label: 'Configuration Properties' },
  { value: '/configuration/job-pool/', label: 'Job Pools' },
  { value: '/configuration/path-alias/', label: 'Path Alias' },
  { value: '/external-id/', label: 'External Identifiers' },
  { value: '/document/', label: 'Document' },
  { value: '/conform/', label: 'Conform' },
  { value: '/projection/', label: 'Projection' },
  { value: '/notification/', label: 'Notification' },
  { value: '/notification/item/', label: 'Item Notification' },
  { value: '/notification/collection/', label: 'Collection Notification' },
  { value: '/notification/job/', label: 'Job Notification' },
  { value: '/notification/storage/', label: 'Storage Notification' },
  { value: '/notification/file/', label: 'File Notification' },
  { value: '/notification/quota/', label: 'Quota Notification' },
  { value: '/notification/group/', label: 'Group Notification' },
  { value: '/notification/document/', label: 'Document Notification' },
  { value: '/import/settings/', label: 'Import Settings' },
  { value: '/task-group/', label: 'Task Groups' },
  { value: '/quota/', label: 'Quota' },
  { value: '/storage-group/', label: 'Storage Groups' },
  { value: '/auto-import/', label: 'Auto Import Rules' },
  { value: '/service/stacktrace/', label: 'Stack Trace' },
  { value: '/transfer/', label: 'Import Transfers' },
  { value: '/configuration/', label: 'Configuration' },
  { value: '/configuration/ftp-pool/', label: 'FTP Pool' },
  { value: '/scheduled-request/', label: 'Scheduled Requests' },
  { value: '/stitch/', label: 'Stitch' },
  { value: '/deletion-lock/', label: 'Deletion Locks' },
  { value: '/analyze-preset/', label: 'Analyze Presets' },
  { value: '/swagger/', label: 'Swagger' },
  { value: '/secret/', label: 'Secret' },
];

const useOptionStyles = makeStyles({
  Option: {
    '&:hover $ValueIcon': {
      visibility: 'visible',
    },
  },
  ValueWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    '&:hover $ValueIcon': {
      visibility: 'visible',
    },
  },
  ValueLink: {
    textDecoration: 'none',
    color: 'inherit',
    flexGrow: 1,
  },
  ValueIcon: {
    color: 'inherit',
    visibility: 'hidden',
  },
});

function Option(props) {
  const classes = useOptionStyles();
  const { data, selectProps } = props;
  const { value, __isNew__: isNew, label } = data || {};
  const { fuzzyRef } = selectProps;
  let to = value;
  if (isNew === true && fuzzyRef?.current?.value) {
    const { entityId, value: fuzzyValue } = fuzzyRef.current;
    if (typeof fuzzyValue === 'function') to = fuzzyValue(entityId);
    else to = fuzzyValue;
  }
  if (to) {
    return (
      <SelectComponents.Option {...props} className={classes.Option}>
        <div className={classes.ValueWrapper}>
          <Link className={classes.ValueLink} to={to}>
            {label}
          </Link>
          <Tooltip title="Open in new tab">
            <Link className={classes.ValueIcon} to={to} target="_blank" rel="noopener">
              <OpenInNewIcon fontSize="small" />
            </Link>
          </Tooltip>
        </div>
      </SelectComponents.Option>
    );
  }
  return SelectComponents.Option(props);
}

function NavSelect({ onChange: propsOnChange, ...props }) {
  const history = useHistory();
  const fuzzyRef = useRef();
  const isValidNewOption = useCallback((inputValue) => {
    try {
      const scoreList = optionListToScore(inputValue, goToOptions, 0.5);
      const closestOption = scoreList?.[0]?.option;
      if (closestOption) {
        fuzzyRef.current = closestOption;
        return true;
      }
      fuzzyRef.current = undefined;
      return false;
    } catch (e) {
      return false;
    }
  }, []);
  const formatCreateLabel = useCallback((inputValue) => {
    const label = fuzzyRef?.current?.label;
    if (label) {
      let [, ...entityId] = inputValue.split(' ');
      entityId = entityId.join(' ');
      if (entityId) {
        if (fuzzyRef.current.siteId) {
          entityId = entityId.toUpperCase();
          if (/^\d/.test(entityId)) entityId = `VX-${entityId}`;
        }
        fuzzyRef.current.entityId = entityId;
        return `Go to ${label} ${entityId}`;
      }
    }
    return 'Keep typing....';
  }, []);

  const onCreateOption = useCallback(() => {
    if (fuzzyRef?.current?.entityId && fuzzyRef?.current?.value) {
      const { entityId, value } = fuzzyRef.current;
      if (typeof value === 'function') history.push(value(entityId));
      else history.push(value);
    }
    fuzzyRef.current = undefined;
  }, [history]);
  const onChange = useCallback(
    (e) => {
      if (propsOnChange) propsOnChange(e);
      history.push(e.value);
    },
    [history, propsOnChange],
  );
  return (
    <NavSelectCreateable
      value=""
      name="endpoint"
      options={linkOptions}
      label="Search for endpoint..."
      formatCreateLabel={formatCreateLabel}
      isValidNewOption={isValidNewOption}
      components={{ Option }}
      fuzzyRef={fuzzyRef}
      onChange={onChange}
      onCreateOption={onCreateOption}
      creatable
      {...props}
    />
  );
}

export default NavSelect;
