import { Route, Switch, Redirect } from 'react-router-dom';
import { compose } from 'redux';

import LeftSnackbar from '../components/ui/LeftSnackbar';
import { NOTIFICATION_ENTITY } from '../const';
import withErrorBoundary from '../hoc/withErrorBoundary';
import { withModalNoRouter } from '../hoc/withModal';

import AnalyzePreset from './AnalyzePreset';
import AnalyzePresetList from './AnalyzePresetList';
import AuditLog from './AuditLog';
import AutoImportRule from './AutoImportRule';
import AutoImportRuleList from './AutoImportRuleList';
import Collection from './Collection';
import CollectionSearch from './CollectionSearch';
import Component from './Component';
import Configuration from './Configuration';
import BulkyMetadata from './configuration/BulkyMetadata';
import Cors from './configuration/Cors';
import DatabasePurging from './configuration/DatabasePurging';
import FtpPool from './configuration/FtpPool';
import Indexing from './configuration/Indexing';
import JobPool from './configuration/JobPool';
import JobPriority from './configuration/JobPriority';
import LogReport from './configuration/LogReport';
import Metrics from './configuration/Metrics';
import OAuth2 from './configuration/OAuth2';
import PathAlias from './configuration/PathAlias';
import Properties from './configuration/Properties';
import Conform from './Conform';
import DeletionLock from './DeletionLock';
import DeletionLockList from './DeletionLockList';
import DocumentMetadata from './DocumentMetadata';
import DocumentMetadataList from './DocumentMetadataList';
import Echo from './Echo';
import ErrorLog from './ErrorLog';
import ExportLocation from './ExportLocation';
import ExportLocationList from './ExportLocationList';
import ExternalId from './ExternalId';
import ExternalIdNamespace from './ExternalIdNamespace';
import FieldGroup from './FieldGroup';
import FieldGroupList from './FieldGroupList';
import FieldGroupSearch from './FieldGroupSearch';
import File from './File';
import FileList from './FileList';
import FileSearch from './FileSearch';
import FullScreenDialog from './FullScreenDialog';
import Group from './Group';
import GroupList from './GroupList';
import HistoryDialog from './HistoryDialog';
import Import from './Import';
import ImportAccess from './ImportAccess';
import ImportImp from './ImportImp';
import ImportSettings from './ImportSettings';
import ImportSettingsList from './ImportSettingsList';
import Item from './Item';
import ItemMetadataGroupSearch from './ItemMetadataGroupSearch';
import ItemSearch from './ItemSearch';
import Javascript from './Javascript';
import Job from './Job';
import JobCreate from './job/JobCreate';
import JobList from './JobList';
import JobProblemList from './JobProblemList';
import JobTypeList from './JobTypeList';
import Library from './Library';
import LibraryList from './LibraryList';
import Metadata from './Metadata';
import MetadataDataset from './MetadataDataset';
import MetadataDatasetList from './MetadataDatasetList';
import MetadataField from './MetadataField';
import MetadataFieldList from './MetadataFieldList';
import NotFound from './NotFound';
import Notification from './Notification';
import NotificationList from './NotificationList';
import NotificationPlaceholder from './NotificationPlaceholder';
import NotificationResourceList from './NotificationResourceList';
import Projection from './Projection';
import ProjectionList from './ProjectionList';
import Quota from './Quota';
import ReindexList from './ReindexList';
import Resource from './Resource';
import ResourceList from './ResourceList';
import ResourceTypeList from './ResourceTypeList';
import ScheduledRequestList from './ScheduledRequestList';
import Search from './Search';
import Secret from './Secret';
import SecretList from './SecretList';
import SelfTest from './SelfTest';
import Service from './Service';
import Shape from './Shape';
import ShapeSearch from './ShapeSearch';
import ShapeTag from './ShapeTag';
import ShapeTagList from './ShapeTagList';
import StackTrace from './StackTrace';
import Stitch from './Stitch';
import Storage from './Storage';
import StorageGroup from './StorageGroup';
import StorageGroupList from './StorageGroupList';
import StorageList from './StorageList';
import StorageMethod from './StorageMethod';
import StorageRuleList from './StorageRuleList';
import Swagger from './Swagger';
import TaskDefinition from './TaskDefinition';
import TaskGroup from './TaskGroup';
import TaskGroupList from './TaskGroupList';
import TopAppBar from './TopAppBar';
import Transfer from './Transfer';
import User from './User';
import UserList from './UserList';
import Version from './Version';
import Vxa from './Vxa';
import VxaList from './VxaList';
import Wizard from './Wizard';

const HISTORY_DIALOG = 'HISTORY_DIALOG';
const MAINMENU_DIALOG = 'MAINMENU_DIALOG';

function Main({ onOpen, unsetToken, unsetRunAs, unsetResponseInterceptor, userName, baseURL }) {
  const toggleHistory = () => onOpen({ modalName: HISTORY_DIALOG });
  const toggleMainMenu = () => onOpen({ modalName: MAINMENU_DIALOG });
  const onLogout = () => {
    unsetToken();
    unsetRunAs();
    unsetResponseInterceptor();
  };
  return (
    <div style={{ zIndex: 1, minWidth: '100%' }}>
      <FullScreenDialog dialogName={MAINMENU_DIALOG} />
      <HistoryDialog dialogName={HISTORY_DIALOG} baseURL={baseURL} />
      <TopAppBar
        onLogout={onLogout}
        userName={userName}
        toggleMainMenu={toggleMainMenu}
        toggleHistory={toggleHistory}
        baseURL={baseURL}
      />
      <main
        style={{
          marginLeft: '10px',
          marginRight: '10px',
          marginTop: 48,
        }}
      >
        <Switch>
          <Route exact path="/collection/" component={CollectionSearch} />
          <Route path="/collection/:collectionId/" component={Collection} />
          <Route exact path="/configuration/" component={Configuration} />
          <Route exact path="/configuration/properties/" component={Properties} />
          <Route exact path="/configuration/indexing/" component={Indexing} />
          <Route exact path="/configuration/ftp-pool/" component={FtpPool} />
          <Route exact path="/configuration/job-pool/" component={JobPool} />
          <Route exact path="/configuration/path-alias/" component={PathAlias} />
          <Route exact path="/configuration/metrics/" component={Metrics} />
          <Route exact path="/configuration/logreport/" component={LogReport} />
          <Route exact path="/configuration/cors/" component={Cors} />
          <Route exact path="/configuration/auth/" component={OAuth2} />
          <Route exact path="/configuration/bulkymetadata/" component={BulkyMetadata} />
          <Route exact path="/configuration/purging/" component={DatabasePurging} />
          <Route exact path="/configuration/job-priority/" component={JobPriority} />
          <Route exact path="/resource/" component={ResourceTypeList} />
          <Route exact path="/resource/:resourceType/" component={ResourceList} />
          <Route exact path="/resource/:resourceType/:resourceId/" component={Resource} />
          <Route exact path="/storage/" component={StorageList} />
          <Route
            exact
            path="/storage/:storageId/method/:storageMethodId"
            component={StorageMethod}
          />
          <Route exact path="/storage/:storageId/file/:fileId/" component={File} />
          <Route path="/storage/:storageId/" component={Storage} />
          <Route exact path="/shape-tag/" component={ShapeTagList} />
          <Route path="/shape-tag/:tagName/" component={ShapeTag} />
          <Route exact path="/version/" component={Version} />
          <Route exact path="/swagger/" component={Swagger} />
          <Route exact path="/service/" component={Service} />
          <Route exact path="/jobtype/" component={JobTypeList} />
          <Route path="/task-definition/jobtype/:taskDefinitionType" component={TaskDefinition} />
          <Route exact path="/debug/echo" component={Echo} />
          <Route exact path="/javascript/test" component={Javascript} />
          <Route exact path="/log" component={AuditLog} />
          <Route exact path="/job" component={JobList} />
          <Route exact path="/job/problem/" component={JobProblemList} />
          <Route exact path="/job/:jobId/" component={Job} />
          <Route exact path="/export-location" component={ExportLocationList} />
          <Route exact path="/export-location/:locationName/" component={ExportLocation} />
          <Route exact path="/selftest/" component={SelfTest} />
          <Route exact path="/group/" component={GroupList} />
          <Route exact path="/group/:groupName/" component={Group} />
          <Route exact path="/user/" component={UserList} />
          <Route path="/user/:userName/" component={User} />
          <Route exact path="/external-id/" component={ExternalIdNamespace} />
          <Route exact path="/search/" component={Search} />
          <Route exact path="/search/file/" component={FileSearch} />
          <Route exact path="/search/field-group/" component={FieldGroupSearch} />
          <Route exact path="/item/" component={ItemSearch} />
          <Route exact path="/item/metadata-group/" component={ItemMetadataGroupSearch} />
          <Route exact path="/shape" component={ShapeSearch} />
          <Route
            path="/item/:itemId/shape/:shapeId/component/:componentId/"
            component={Component}
          />
          <Route path="/item/:itemId/shape/:shapeId/" component={Shape} />
          <Route path="/item/:itemId/" component={Item} />
          <Route exact path="/reindex/" component={ReindexList} />
          <Route exact path="/wizard/" component={Wizard} />
          <Route exact path="/metadata-field/" component={MetadataFieldList} />
          <Route exact path="/field-group/" component={FieldGroupList} />
          <Route exact path="/field-group/:groupName" component={FieldGroup} />
          <Route exact path="/import/settings/" component={ImportSettingsList} />
          <Route exact path="/import/settings/:settingsId" component={ImportSettings} />
          <Route path="/import/" component={Import} />
          <Route exact path="/import-imp" component={ImportImp} />
          <Route exact path="/file/" component={FileList} />
          <Route path="/file/:fileId/" component={File} />
          <Route exact path="/storage-rule/" component={StorageRuleList} />
          <Route exact path="/error/" component={ErrorLog} />
          <Route exact path="/vxa/" component={VxaList} />
          <Route exact path="/vxa/:vxaUuid/" component={Vxa} />
          <Route exact path="/new-job/" component={JobCreate} />
          <Route exact path="/library/" component={LibraryList} />
          <Route path="/library/:libraryId/" component={Library} />
          <Route exact path="/document/" component={DocumentMetadataList} />
          <Route path="/document/:documentMetadataName" component={DocumentMetadata} />
          <Route path="/metadata/:metadataUuid/" component={Metadata} />
          <Route exact path="/conform/" component={Conform} />
          <Route exact path="/projection/" component={ProjectionList} />
          <Route path="/projection/:projectionId" component={Projection} />
          <Route path="/metadata-field/:fieldName" component={MetadataField} />
          <Route exact path="/notification/" component={NotificationResourceList} />
          <Route
            exact
            path={`/notification/:entityType(${NOTIFICATION_ENTITY.join('|')})/`}
            component={NotificationList}
          />
          <Route
            exact
            path={`/notification/:entityType(${NOTIFICATION_ENTITY.join('|')})/:notificationId`}
            component={Notification}
          />
          <Route exact path="/notification/:notificationId" component={NotificationPlaceholder} />
          <Route exact path="/import/access/:userName" component={ImportAccess} />
          <Route exact path="/task-group/" component={TaskGroupList} />
          <Route exact path="/task-group/:groupName/" component={TaskGroup} />
          <Route exact path="/quota/" component={Quota} />
          <Route exact path="/storage-group/" component={StorageGroupList} />
          <Route exact path="/storage-group/:groupName/" component={StorageGroup} />
          <Route exact path="/auto-import/" component={AutoImportRuleList} />
          <Route exact path="/auto-import/:storageId/" component={AutoImportRule} />
          <Route exact path="/service/stacktrace/" component={StackTrace} />
          <Route exact path="/transfer/" component={Transfer} />
          <Route exact path="/scheduled-request/" component={ScheduledRequestList} />
          <Route exact path="/stitch/" component={Stitch} />
          <Route exact path="/deletion-lock/" component={DeletionLockList} />
          <Route exact path="/deletion-lock/:lockId/" component={DeletionLock} />
          <Route exact path="/external-id/:entityType/:entityId" component={ExternalId} />
          <Route
            exact
            path="/external-id/:entityType/:entitySubType/:entityId"
            component={ExternalId}
          />
          <Route exact path="/metadata-dataset/" component={MetadataDatasetList} />
          <Route exact path="/metadata-dataset/:datasetId/" component={MetadataDataset} />
          <Route exact path="/analyze-preset/" component={AnalyzePresetList} />
          <Route exact path="/analyze-preset/:preset/" component={AnalyzePreset} />
          <Route exact path="/secret/:alias/" component={Secret} />
          <Route exact path="/secret/" component={SecretList} />
          <Redirect exact from="/" push to="/job" />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
      <LeftSnackbar />
    </div>
  );
}

export default compose(withErrorBoundary, withModalNoRouter)(Main);
