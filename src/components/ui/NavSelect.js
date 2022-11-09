import React from 'react';
import { useHistory } from 'react-router-dom';
import routes from '../../const/routes';
import { WrappedSelectCreatable } from './Select';
import { optionListToScore } from '../../utils/similar';

const goToOptions = [
  {
    value: (entityId) => `/item/${entityId}`, label: 'Item', synonyms: ['item'], siteId: true,
  },
  {
    value: (entityId) => `/collection/${entityId}`, label: 'Collection', synonyms: ['collection'], siteId: true,
  },
  {
    value: (entityId) => `/storage/${entityId}`, label: 'Storage', synonyms: ['storage'], siteId: true,
  },
  {
    value: (entityId) => `/storage/file/${entityId}`, label: 'File', synonyms: ['file'], siteId: true,
  },
  {
    value: (entityId) => `/user/${entityId}`, label: 'User', synonyms: ['user'], siteId: false,
  },
  {
    value: (entityId) => `/group/${entityId}`, label: 'Group', synonyms: ['group'], siteId: false,
  },
  {
    value: (entityId) => `/metadata-field/${entityId}`, label: 'Metadata Field', synonyms: ['metadata', 'field', 'md'], siteId: false,
  },
  {
    value: (entityId) => `/field-group/${entityId}`, label: 'Field Group', synonyms: ['fieldgroup', 'fg'], siteId: false,
  },
  {
    value: (entityId) => `/job/${entityId}`, label: 'Job', synonyms: ['job'], siteId: true,
  },
];

const linkOptions = [
  { value: '/new-job/', label: 'New Job' },
  { value: '/job', label: 'Job List' },
  { value: '/jobtype/', label: 'Job Types' },
  { value: '/search/', label: 'Search Items & Collections' },
  { value: routes.itemList(), label: 'Search Items' },
  { value: '/collection/', label: 'Search Collections' },
  { value: '/shape/', label: 'Search Shapes' },
  { value: '/search/field-group/', label: 'Search Field Groups' },
  { value: '/library/', label: 'Search Libraries' },
  { value: '/storage/', label: 'Storages' },
  { value: '/file/', label: 'Files' },
  { value: '/storage-rule/', label: 'Storage Rules' },
  { value: '/import/?tab=IMPORTPLACEHOLDER_TAB', label: 'Create Item' },
  { value: '/import/?tab=IMPORTCOLLECTION_TAB', label: 'Create Collection' },
  { value: '/import/?tab=IMPORTSHAPEPLACEHOLDER_TAB', label: 'Create Shape' },
  { value: '/import/?tab=IMPORTFILE_TAB', label: 'Import File' },
  { value: '/import/?tab=IMPORTRAW_TAB', label: 'Upload' },
  { value: '/import/?tab=IMPORTURI_TAB', label: 'Import URIs' },
  { value: '/import/?tab=IMPORTSHAPE_TAB', label: 'Import Shape' },
  { value: '/import/?tab=IMPORTCOMPONENT_TAB', label: 'Import Component' },
  { value: '/import-imp/?tab=IMPORTIMP_URL_TAB', label: 'Import IMP URL' },
  { value: '/import-imp/?tab=IMPORTIMP_PATH_TAB', label: 'Import IMP Path' },
  { value: '/import-imp/?tab=IMPORTIMP_FILE_TAB', label: 'Import IMP File' },
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
];

export default function NavSelect({ onChange: propsOnChange, ...props }) {
  const history = useHistory();
  const fuzzyRef = React.useRef();
  const isValidNewOption = React.useCallback((inputValue) => {
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
  const formatCreateLabel = React.useCallback(((inputValue) => {
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
  }), []);
  const onCreateOption = React.useCallback(() => {
    if (fuzzyRef?.current?.entityId && fuzzyRef?.current?.value) {
      const { entityId, value } = fuzzyRef.current;
      if (typeof value === 'function') history.push(value(entityId));
      else history.push(value);
    }
    fuzzyRef.current = undefined;
  }, []);
  const onChange = React.useCallback((e) => {
    if (propsOnChange) propsOnChange(e);
    history.push(e.value);
  }, [history, propsOnChange]);
  return (
    <WrappedSelectCreatable
      value=""
      options={linkOptions}
      label="Search for endpoint..."
      formatCreateLabel={formatCreateLabel}
      isValidNewOption={isValidNewOption}
      onChange={onChange}
      onCreateOption={onCreateOption}
      {...props}
    />
  );
}
