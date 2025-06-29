import { PureComponent } from 'react';

import List from '@material-ui/core/List';
import { Route, Switch, generatePath } from 'react-router-dom';
import { compose } from 'redux';

import AccessControlDialog from '../components/access/AccessControlDialog';
import CollectionEntityAdd from '../components/collection/CollectionEntityAdd';
import ItemAnalyze from '../components/item/ItemAnalyze';
import ItemDelete from '../components/item/ItemDelete';
import ItemExport from '../components/item/ItemExport';
import ItemImpExport from '../components/item/ItemImpExport';
import ItemImpImport from '../components/item/ItemImpImport';
import ItemRelationDialog from '../components/item/ItemRelation';
import ItemSequenceCreate from '../components/item/ItemSequenceCreate';
import ItemShapeCreate from '../components/item/ItemShapeCreate';
import ItemThumbnailDialog from '../components/item/ItemThumbnail';
import ItemTitle from '../components/item/ItemTitle';
import ItemTranscode from '../components/item/ItemTranscode';
import JobCreate from '../components/job/JobCreate';
import ShapeDeleteAll from '../components/shape/ShapeDeleteAll';
import DrawerContainer from '../components/ui/DrawerContainer';
import ListItemLink from '../components/ui/ListItemLink';
import routes from '../const/routes';
import { withRouterProps } from '../hoc/withRouterProps';
import withTabs from '../hoc/withTabs';

import AccessControl from './AccessControl';
import AccessControlMerged from './AccessControlMerged';
import AccessGraph from './AccessGraph';
import DeletionLockList from './DeletionLockList';
import ExternalId from './ExternalId';
import ItemBulkyMetadata from './item/ItemBulkyMetadata';
import ItemBulkyMetadataList from './item/ItemBulkyMetadataList';
import ItemCollection from './item/ItemCollection';
import ItemContent from './item/ItemContent';
import ItemJob from './item/ItemJob';
import ItemMetadata from './item/ItemMetadata';
import ItemMetadataChangeSetList from './item/ItemMetadataChangeSetList';
import ItemPoster from './item/ItemPoster';
import ItemProjection from './item/ItemProjection';
import ItemRelationList from './item/ItemRelationList';
import ItemSequence from './item/ItemSequence';
import ItemSequenceList from './item/ItemSequenceList';
import ItemShape from './item/ItemShape';
import ItemSpritesheet from './item/ItemSpritesheet';
import ItemThumbnail from './item/ItemThumbnail';
import ItemUri from './item/ItemUri';
import ItemVersion from './item/ItemVersion';
import MetadataGraph from './MetadataGraph';
import NotificationEntity from './NotificationEntity';
import NotificationEntityList from './NotificationEntityList';
import StorageRule from './StorageRule';

const ITEM_METADATA_TAB = 'ITEM_METADATA_TAB';
const ITEM_COLLECTION_TAB = 'ITEM_COLLECTION_TAB';
const ITEM_SHAPE_TAB = 'ITEM_SHAPE_TAB';
const ITEM_URI_TAB = 'ITEM_URI_TAB';
const ITEM_CONTENT_TAB = 'ITEM_CONTENT_TAB';
const ITEM_THUMBNAIL_TAB = 'ITEM_THUMBNAIL_TAB';
const ITEM_POSTER_TAB = 'ITEM_POSTER_TAB';
const ITEM_JOB_TAB = 'ITEM_JOB_TAB';
const ITEM_PROJECTION_TAB = 'ITEM_PROJECTION_TAB';
const ITEM_RELATION_TAB = 'ITEM_RELATION_TAB';
const ACCESS_TAB = 'ACCESS_TAB';
const ACCESSMERGED_TAB = 'ACCESSMERGED_TAB';
const STORAGERULE_TAB = 'STORAGERULE_TAB';
const BULKYMETADATA_TAB = 'BULKYMETADATA_TAB';
const DELETIONLOCK_TAB = 'DELETIONLOCK_TAB';
const ITEM_VERSION_TAB = 'ITEM_VERSION_TAB';
const ITEM_METADATACHANGESETLIST_TAB = 'ITEM_METADATACHANGESETLIST_TAB';
const NOTIFICATION_TAB = 'NOTIFICATION_TAB';
const ITEM_SPRITESHEET_TAB = 'ITEM_SPRITESHEET_TAB';
const ACCESSGRAPH_TAB = 'ACCESSGRAPH_TAB';
const METADATAGRAPH_TAB = 'METADATAGRAPH_TAB';
const ITEM_SEQUENCE_TAB = 'ITEM_SEQUENCE_TAB';

const ITEM_REMOVE_DIALOG = 'ITEM_REMOVE_DIALOG';
const ITEM_TRANSCODE_DIALOG = 'ITEM_TRANSCODE_DIALOG';
const ITEM_RELATION_DIALOG = 'ITEM_RELATION_DIALOG';
const ITEM_THUMBNAIL_DIALOG = 'ITEM_THUMBNAIL_DIALOG';
const ITEM_POSTER_DIALOG = 'ITEM_POSTER_DIALOG';
const ITEM_EXPORT_DIALOG = 'ITEM_EXPORT_DIALOG';
const ITEM_IMPEXPORT_DIALOG = 'ITEM_IMPEXPORT_DIALOG';
const COLLECTION_ENTITY_ADD_DIALOG = 'COLLECTION_ENTITY_ADD_DIALOG';
const JOB_CREATE_DIALOG = 'JOB_CREATE_DIALOG';
const ITEM_SHAPE_CREATE_DIALOG = 'ITEM_SHAPE_CREATE_DIALOG';
const ITEM_ACCESSCONTROL_ADD_DIALOG = 'ITEM_ACCESSCONTROL_ADD_DIALOG';
const ITEM_REMOVEALLSHAPES_DIALOG = 'ITEM_REMOVEALLSHAPES_DIALOG';
const ITEM_IMPIMPORT_DIALOG = 'ITEM_IMPIMPORT_DIALOG';
const ITEM_ANALYZE_DIALOG = 'ITEM_ANALYZE_DIALOG';
const ITEM_SEQUENCE_CREATE_DIALOG = 'ITEM_SEQUENCE_CREATE_DIALOG';
const EXTERNALID_TAB = 'EXTERNALID_TAB';

const TAB_TITLE = [
  {
    tab: ITEM_METADATA_TAB,
    listText: 'Metadata',
    component: ItemMetadata,
    exact: true,
    path: '/item/:itemId/metadata/',
  },
  {
    tab: ITEM_CONTENT_TAB,
    listText: 'Content',
    component: ItemContent,
    path: '/item/:itemId/content/',
  },
  {
    tab: ITEM_METADATACHANGESETLIST_TAB,
    listText: 'Changes',
    component: ItemMetadataChangeSetList,
    path: '/item/:itemId/metadata/changes/',
  },
  {
    tab: ITEM_COLLECTION_TAB,
    listText: 'Collection',
    component: ItemCollection,
    path: '/item/:itemId/collection/',
  },
  {
    tab: ITEM_SHAPE_TAB,
    listText: 'Shape',
    component: ItemShape,
    path: '/item/:itemId/shape/',
  },
  {
    tab: ITEM_VERSION_TAB,
    listText: 'Version',
    component: ItemVersion,
    path: '/item/:itemId/version/',
  },
  {
    tab: ITEM_URI_TAB,
    listText: 'URI',
    component: ItemUri,
    path: '/item/:itemId/uri/',
  },
  {
    tab: ITEM_THUMBNAIL_TAB,
    listText: 'Thumbnail',
    component: ItemThumbnail,
    path: '/item/:itemId/thumbnail/',
  },
  {
    tab: ITEM_POSTER_TAB,
    listText: 'Poster',
    component: ItemPoster,
    path: '/item/:itemId/poster/',
  },
  {
    tab: ITEM_SPRITESHEET_TAB,
    listText: 'Spritesheet',
    component: ItemSpritesheet,
    path: '/item/:itemId/spritesheet/',
  },
  {
    tab: ITEM_JOB_TAB,
    listText: 'Job',
    component: ItemJob,
    path: '/item/:itemId/job/',
  },
  {
    tab: ITEM_PROJECTION_TAB,
    listText: 'Projection',
    component: ItemProjection,
    path: '/item/:itemId/projection/',
  },
  {
    tab: ITEM_RELATION_TAB,
    listText: 'Relation',
    component: ItemRelationList,
    path: '/item/:itemId/relation/',
  },
  {
    tab: ACCESS_TAB,
    listText: 'Direct Access',
    component: AccessControl,
    path: '/item/:itemId/direct-access/',
  },
  {
    tab: ACCESSMERGED_TAB,
    listText: 'Merged Access',
    component: AccessControlMerged,
    path: '/item/:itemId/merged-access/',
  },
  {
    tab: ACCESSGRAPH_TAB,
    listText: 'Access Graph',
    component: AccessGraph,
    path: '/item/:itemId/access/graph/',
  },
  {
    tab: METADATAGRAPH_TAB,
    listText: 'Metadata Graph',
    component: MetadataGraph,
    path: '/item/:itemId/metadata/graph/',
    entity: 'item',
  },
  {
    tab: STORAGERULE_TAB,
    listText: 'Storage Rules',
    component: StorageRule,
    path: '/item/:itemId/storage-rules/',
  },
  {
    tab: BULKYMETADATA_TAB,
    listText: 'Bulky Metadata',
    component: ItemBulkyMetadataList,
    path: '/item/:itemId/bulky-metadata/',
    exact: true,
  },
  {
    tab: DELETIONLOCK_TAB,
    listText: 'Deletion Locks',
    component: DeletionLockList,
    path: '/item/:itemId/deletion-locks/',
  },
  {
    tab: NOTIFICATION_TAB,
    listText: 'Notifications',
    component: NotificationEntityList,
    path: '/item/:itemId/notification/',
    entityType: 'item',
    exact: true,
  },
  {
    tab: ITEM_SEQUENCE_TAB,
    listText: 'Sequence',
    component: ItemSequenceList,
    path: '/item/:itemId/sequence/',
    exact: true,
  },
  {
    tab: EXTERNALID_TAB,
    listText: 'External ID',
    component: ExternalId,
    path: '/item/:itemId/external-id/',
    entity: 'item',
  },
];

const listComponentRoute = ({ itemId }) => (
  <List>
    {TAB_TITLE.map(({ path, listText, exact }) => (
      <ListItemLink
        key={path}
        primary={listText}
        to={generatePath(path, { itemId })}
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
      path="/item/:itemId/bulky-metadata/:bulkyMetadataKey"
      render={() => <ItemBulkyMetadata {...props} title="Bulky Metadata" />}
      {...props}
    />
    <Route
      exact
      path="/item/:itemId/sequence/:format"
      render={() => <ItemSequence {...props} title="Sequence" />}
      {...props}
    />
    <Route
      exact
      path="/item/:itemId/notification/:notificationId"
      render={() => <NotificationEntity {...props} />}
      {...props}
    />
    {TAB_TITLE.map(({ path, component: RenderComponent, listText, exact, ...renderProps }) => (
      <Route
        key={path}
        path={path}
        exact={exact}
        render={() => <RenderComponent {...props} {...renderProps} title={listText} />}
      />
    ))}
    <Route path="*" render={() => <ItemMetadata {...props} title="Metadata" />} />
  </Switch>
);

class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.setOnRefresh = this.setOnRefresh.bind(this);
    this.state = {
      onRefresh: undefined,
    };
  }

  componentDidMount() {
    const { itemId } = this.props;
    document.title = `VidiCore Admin | Item | ${itemId}`;
  }

  onRefresh() {
    const { onRefresh } = this.state;
    if (onRefresh) {
      onRefresh();
    }
  }

  setOnRefresh(onRefresh) {
    this.setState({ onRefresh });
  }

  render() {
    const { onChangeTab, tabValue, itemId, history } = this.props;
    const titleComponent = (props) => (
      <ItemTitle
        itemId={itemId}
        removeModal={ITEM_REMOVE_DIALOG}
        transcodeModal={ITEM_TRANSCODE_DIALOG}
        thumbnailModal={ITEM_THUMBNAIL_DIALOG}
        relationModal={ITEM_RELATION_DIALOG}
        posterModal={ITEM_POSTER_DIALOG}
        exportModal={ITEM_EXPORT_DIALOG}
        exportImpModal={ITEM_IMPEXPORT_DIALOG}
        addToCollectionModal={COLLECTION_ENTITY_ADD_DIALOG}
        startJobModal={JOB_CREATE_DIALOG}
        addAccessControl={ITEM_ACCESSCONTROL_ADD_DIALOG}
        removeAllShapesModal={ITEM_REMOVEALLSHAPES_DIALOG}
        importImpModal={ITEM_IMPIMPORT_DIALOG}
        createShapeModal={ITEM_SHAPE_CREATE_DIALOG}
        analyzeModal={ITEM_ANALYZE_DIALOG}
        createSequenceModal={ITEM_SEQUENCE_CREATE_DIALOG}
        {...props}
      />
    );
    return (
      <>
        <DrawerContainer
          mainComponent={mainComponentRoute}
          listComponent={listComponentRoute}
          defaultOpen
          onChangeTab={onChangeTab}
          tabValue={tabValue}
          titleComponent={titleComponent}
          itemId={itemId}
          entityId={itemId}
          entityType="item"
          setOnRefresh={this.setOnRefresh}
        />
        <ItemDelete
          dialogName={ITEM_REMOVE_DIALOG}
          onSuccess={() =>
            history.push(
              '/item/?content=metadata%2Cthumbnail&baseURI=%2FAPInoauth%2F&terse=true&noauth-url=true',
            )
          }
          itemId={itemId}
        />
        <ShapeDeleteAll
          dialogName={ITEM_REMOVEALLSHAPES_DIALOG}
          onSuccess={this.onRefresh}
          itemId={itemId}
        />
        <ItemTranscode
          dialogName={ITEM_TRANSCODE_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
        />
        <ItemThumbnailDialog
          dialogName={ITEM_THUMBNAIL_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
          variant="thumbnail"
        />
        <ItemThumbnailDialog
          dialogName={ITEM_POSTER_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
          variant="poster"
        />
        <ItemRelationDialog
          dialogName={ITEM_RELATION_DIALOG}
          onSuccess={this.onRefresh}
          itemId={itemId}
        />
        <ItemExport
          dialogName={ITEM_EXPORT_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
        />
        <ItemImpExport
          dialogName={ITEM_IMPEXPORT_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
        />
        <ItemImpImport
          dialogName={ITEM_IMPIMPORT_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
        />
        <ItemShapeCreate
          dialogName={ITEM_SHAPE_CREATE_DIALOG}
          onSuccess={(response) => history.push(`/item/${itemId}/shape/${response.data.id}/`)}
          itemId={itemId}
        />
        <ItemSequenceCreate
          dialogName={ITEM_SEQUENCE_CREATE_DIALOG}
          onSuccess={(_response, _dispatch, props) =>
            history.push(
              routes.itemSequence({
                itemId,
                format: props.values.format,
              }),
            )
          }
          itemId={itemId}
        />
        <CollectionEntityAdd
          dialogName={COLLECTION_ENTITY_ADD_DIALOG}
          entityId={itemId}
          entityType="item"
          onSuccess={this.onRefresh}
        />
        <AccessControlDialog
          dialogName={ITEM_ACCESSCONTROL_ADD_DIALOG}
          entityType="item"
          entityId={itemId}
          onSuccess={this.onRefresh}
        />
        <JobCreate
          dialogName={JOB_CREATE_DIALOG}
          initialValues={{
            queryParams: {
              jobmetadata: [
                {
                  key: 'itemId',
                  value: itemId,
                },
              ],
            },
          }}
        />
        <ItemAnalyze
          dialogName={ITEM_ANALYZE_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
        />
      </>
    );
  }
}

export default compose(withTabs(ITEM_METADATA_TAB), withRouterProps)(Item);
