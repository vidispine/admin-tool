import React from 'react';
import { compose } from 'redux';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { Route, Switch, generatePath } from 'react-router-dom';

import withTabs from '../hoc/withTabs';
import withUI from '../hoc/withUI';

import CollectionMetadata from './collection/CollectionMetadata';
import CollectionContent from './collection/CollectionContent';
import CollectionCollection from './collection/CollectionCollection';
import CollectionMetadataChangeSetList from './collection/CollectionMetadataChangeSetList';
import AccessControl from './AccessControl';
import AccessControlMerged from './AccessControlMerged';
import StorageRule from './StorageRule';
import DeletionLockList from './DeletionLockList';
import NotificationEntityList from './NotificationEntityList';
import NotificationEntity from './NotificationEntity';
import AccessGraph from './AccessGraph';
import MetadataGraph from './MetadataGraph';

import TitleHeader from '../components/ui/TitleHeader';
import CollectionRemove from '../components/collection/CollectionRemove';
import CollectionExport from '../components/collection/CollectionExport';
import AccessControlDialog from '../components/access/AccessControlDialog';
import DrawerContainer from '../components/ui/DrawerContainer';
import ListItemLink from '../components/ui/ListItemLink';

import CollectionRename from '../components/collection/CollectionRename';
import CollectionEntityAdd from '../components/collection/CollectionEntityAdd';
import CollectionFolderMap from '../components/collection/CollectionFolderMap';
import Menu, { MenuItem } from '../components/ui/Menu';

const COLLECTION_METADATA_TAB = 'COLLECTION_METADATA_TAB';
const COLLECTION_COLLECTION_TAB = 'COLLECTION_COLLECTION_TAB';
const COLLECTION_CONTENT_TAB = 'COLLECTION_CONTENT_TAB';
const ACCESS_TAB = 'ACCESS_TAB';
const ACCESSMERGED_TAB = 'ACCESSMERGED_TAB';
const STORAGERULE_TAB = 'STORAGERULE_TAB';
const DELETIONLOCK_TAB = 'DELETIONLOCK_TAB';
const COLLECTION_METADATACHANGESETLIST_TAB = 'COLLECTION_METADATACHANGESETLIST_TAB';
const NOTIFICATION_TAB = 'NOTIFICATION_TAB';
const COLLECTION_REMOVE_DIALOG = 'COLLECTION_REMOVE_DIALOG';
const COLLECTION_ACCESSCONTROL_ADD_DIALOG = 'COLLECTION_ACCESSCONTROL_ADD_DIALOG';
const COLLECTION_EXPORT_DIALOG = 'COLLECTION_EXPORT_DIALOG';
const COLLECTION_RENAME_DIALOG = 'COLLECTION_RENAME_DIALOG';
const COLLECTION_ENTITY_ADD_DIALOG = 'COLLECTION_ENTITY_ADD_DIALOG';
const COLLECTION_FOLDERMAP_DIALOG = 'COLLECTION_FOLDERMAP_DIALOG';
const ACCESSGRAPH_TAB = 'ACCESSGRAPH_TAB';
const METADATAGRAPH_TAB = 'METADATAGRAPH_TAB';

const TAB_TITLE = [
  {
    tab: COLLECTION_METADATA_TAB,
    listText: 'Metadata',
    exact: true,
    component: CollectionMetadata,
    path: '/collection/:collectionId/metadata/',
  },
  {
    tab: COLLECTION_CONTENT_TAB,
    listText: 'Content',
    component: CollectionContent,
    path: '/collection/:collectionId/content/',
  },
  {
    tab: COLLECTION_METADATACHANGESETLIST_TAB,
    listText: 'Changes',
    component: CollectionMetadataChangeSetList,
    path: '/collection/:collectionId/metadata/changes/',
  },
  {
    tab: COLLECTION_COLLECTION_TAB,
    listText: 'Collection',
    component: CollectionCollection,
    path: '/collection/:collectionId/collection/',
  },
  {
    tab: ACCESS_TAB,
    listText: 'Direct Access',
    component: AccessControl,
    path: '/collection/:collectionId/direct-access/',
  },
  {
    tab: ACCESSMERGED_TAB,
    listText: 'Merged Access',
    component: AccessControlMerged,
    path: '/collection/:collectionId/merged-access/',
  },
  {
    tab: STORAGERULE_TAB,
    listText: 'Storage Rules',
    component: StorageRule,
    path: '/collection/:collectionId/storage-rules/',
  },
  {
    tab: DELETIONLOCK_TAB,
    listText: 'Deletion Locks',
    component: DeletionLockList,
    path: '/collection/:collectionId/deletion-locks/',
  },
  {
    tab: NOTIFICATION_TAB,
    listText: 'Notifications',
    component: NotificationEntityList,
    path: '/collection/:collectionId/notification/',
    entityType: 'collection',
    exact: true,
  },
  {
    tab: ACCESSGRAPH_TAB,
    listText: 'Access Graph',
    component: AccessGraph,
    path: '/collection/:collectionId/access/graph/',
    entityType: 'collection',
  },
  {
    tab: METADATAGRAPH_TAB,
    listText: 'Metadata Graph',
    component: MetadataGraph,
    path: '/collection/:collectionId/metadata/graph/',
    entity: 'collection',
  },
];

const listComponentRoute = ({ collectionId }) => (
  <List>
    {TAB_TITLE.map(({ path, listText, exact }) => (
      <ListItemLink
        key={path}
        secondary={listText}
        to={generatePath(path, { collectionId })}
        dense
        style={{ paddingLeft: 8 }}
        disableGutters
        exact={exact}
      />
    ))}
  </List>
);

const mainComponentRoute = (props) => (
  <Switch>
    <Route
      exact
      path="/item/:itemId/notification/:notificationId"
      render={() => <NotificationEntity {...props} />}
      {...props}
    />
    {TAB_TITLE.map(({
      path, component: RenderComponent, listText, exact, ...renderProps
    }) => (
      <Route
        key={path}
        path={path}
        exact={exact}
        render={() => <RenderComponent {...props} {...renderProps} title={listText} />}
      />
    ))}
    <Route
      path="*"
      render={() => <CollectionMetadata {...props} title="Metadata" />}
    />
  </Switch>
);

class Collection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.setOnRefresh = this.setOnRefresh.bind(this);
    this.setName = this.setName.bind(this);
    this.state = {
      onRefresh: undefined,
      collectionName: undefined,
    };
  }

  componentDidMount() {
    const { collectionId } = this.props;
    document.title = `VidiCore Admin | Collection | ${collectionId}`;
  }

  onRefresh(...args) {
    const { onRefresh } = this.state;
    if (onRefresh) { onRefresh(...args); }
  }

  setOnRefresh(onRefresh) {
    this.setState({ onRefresh });
  }

  setName(collectionName) {
    this.setState({ collectionName });
  }

  render() {
    const {
      onChangeTab,
      tabValue,
      collectionId,
      history,
      onOpen,
    } = this.props;
    const { collectionName } = this.state;
    const titleComponent = (props) => (
      <TitleHeader
        grandParentTitle="Collection"
        grandParentTo="/collection/"
        parentTitle={collectionId}
        removeModal={COLLECTION_REMOVE_DIALOG}
        helpTo="/ref/collection.html"
        entityId={collectionId}
        entityType="collection"
        addAccessControl={COLLECTION_ACCESSCONTROL_ADD_DIALOG}
        exportModal={COLLECTION_EXPORT_DIALOG}
        titleChip={collectionName}
        actionComponent={(
          <Menu>
            <MenuItem onClick={() => onOpen({ modalName: COLLECTION_ENTITY_ADD_DIALOG })}>
              <Typography>Add Entity</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: COLLECTION_RENAME_DIALOG })}>
              <Typography>Rename</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: COLLECTION_FOLDERMAP_DIALOG })}>
              <Typography>Map To Folder</Typography>
            </MenuItem>
          </Menu>
        )}
        {...props}
      />
    );
    return (
      <>
        <DrawerContainer
          mainComponent={mainComponentRoute}
          listComponent={listComponentRoute}
          setOnRefresh={this.setOnRefresh}
          setName={this.setName}
          defaultOpen
          onChangeTab={onChangeTab}
          tabValue={tabValue}
          titleComponent={titleComponent}
          collectionId={collectionId}
          entityId={collectionId}
          entityType="collection"
        />
        <CollectionRemove
          dialogName={COLLECTION_REMOVE_DIALOG}
          onSuccess={() => history.push('/collection/')}
          collectionId={collectionId}
        />
        <AccessControlDialog
          dialogName={COLLECTION_ACCESSCONTROL_ADD_DIALOG}
          entityType="collection"
          entityId={collectionId}
          onSuccess={this.onRefresh}
        />
        <CollectionEntityAdd
          dialogName={COLLECTION_ENTITY_ADD_DIALOG}
          onSuccess={this.onRefresh}
          collectionId={collectionId}
        />
        <CollectionRename
          dialogName={COLLECTION_RENAME_DIALOG}
          collectionId={collectionId}
          onSuccess={this.onRefresh}
          collectionDocument={{ name: collectionName }}
        />
        <CollectionFolderMap
          dialogName={COLLECTION_FOLDERMAP_DIALOG}
          collectionId={collectionId}
          onSuccess={this.onRefresh}
        />
        <CollectionExport
          dialogName={COLLECTION_EXPORT_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          collectionId={collectionId}
        />
      </>
    );
  }
}

export default compose(withTabs(COLLECTION_CONTENT_TAB), withUI)(Collection);
