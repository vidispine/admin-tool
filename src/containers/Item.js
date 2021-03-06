import React from 'react';
import { compose } from 'redux';
import List from '@material-ui/core/List';

import { Route, Switch, generatePath } from 'react-router-dom';
import withTabs from '../hoc/withTabs';
import { withRouterProps } from '../hoc/withRouterProps';

import ItemMetadata from './item/ItemMetadata';
import ItemCollection from './item/ItemCollection';
import ItemShape from './item/ItemShape';
import ItemContent from './item/ItemContent';
import ItemUri from './item/ItemUri';
import ItemPoster from './item/ItemPoster';
import ItemThumbnail from './item/ItemThumbnail';
import ItemJob from './item/ItemJob';
import ItemProjection from './item/ItemProjection';
import ItemRelationList from './item/ItemRelationList';
import ItemBulkyMetadataList from './item/ItemBulkyMetadataList';
import ItemBulkyMetadata from './item/ItemBulkyMetadata';
import ItemVersion from './item/ItemVersion';

import AccessControl from './AccessControl';
import AccessControlMerged from './AccessControlMerged';
import StorageRule from './StorageRule';
import DeletionLockList from './DeletionLockList';

import ItemTitle from '../components/item/ItemTitle';
import ItemDelete from '../components/item/ItemDelete';
import ItemTranscode from '../components/item/ItemTranscode';
import ItemThumbnailDialog from '../components/item/ItemThumbnail';
import ItemRelationDialog from '../components/item/ItemRelation';
import ItemExport from '../components/item/ItemExport';
import ItemImpExport from '../components/item/ItemImpExport';
import CollectionEntityAdd from '../components/collection/CollectionEntityAdd';
import JobCreate from '../components/job/JobCreate';
import AccessControlDialog from '../components/access/AccessControlDialog';
import DrawerContainer from '../components/ui/DrawerContainer';
import ListItemLink from '../components/ui/ListItemLink';

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

const ITEM_REMOVE_DIALOG = 'ITEM_REMOVE_DIALOG';
const ITEM_TRANSCODE_DIALOG = 'ITEM_TRANSCODE_DIALOG';
const ITEM_RELATION_DIALOG = 'ITEM_RELATION_DIALOG';
const ITEM_THUMBNAIL_DIALOG = 'ITEM_THUMBNAIL_DIALOG';
const ITEM_POSTER_DIALOG = 'ITEM_POSTER_DIALOG';
const ITEM_EXPORT_DIALOG = 'ITEM_EXPORT_DIALOG';
const ITEM_IMPEXPORT_DIALOG = 'ITEM_IMPEXPORT_DIALOG';
const COLLECTION_ENTITY_ADD_DIALOG = 'COLLECTION_ENTITY_ADD_DIALOG';
const JOB_CREATE_DIALOG = 'JOB_CREATE_DIALOG';
const ITEM_ACCESSCONTROL_ADD_DIALOG = 'ITEM_ACCESSCONTROL_ADD_DIALOG';

const TAB_TITLE = [
  {
    tab: ITEM_METADATA_TAB, listText: 'Metadata', component: ItemMetadata, path: '/item/:itemId/metadata/',
  },
  {
    tab: ITEM_CONTENT_TAB, listText: 'Content', component: ItemContent, path: '/item/:itemId/content/',
  },
  {
    tab: ITEM_COLLECTION_TAB, listText: 'Collection', component: ItemCollection, path: '/item/:itemId/collection/',
  },
  {
    tab: ITEM_SHAPE_TAB, listText: 'Shape', component: ItemShape, path: '/item/:itemId/shape/',
  },
  {
    tab: ITEM_VERSION_TAB, listText: 'Version', component: ItemVersion, path: '/item/:itemId/version/',
  },
  {
    tab: ITEM_URI_TAB, listText: 'URI', component: ItemUri, path: '/item/:itemId/uri/',
  },
  {
    tab: ITEM_THUMBNAIL_TAB, listText: 'Thumbnail', component: ItemThumbnail, path: '/item/:itemId/thumbnail/',
  },
  {
    tab: ITEM_POSTER_TAB, listText: 'Poster', component: ItemPoster, path: '/item/:itemId/poster/',
  },
  {
    tab: ITEM_JOB_TAB, listText: 'Job', component: ItemJob, path: '/item/:itemId/job/',
  },
  {
    tab: ITEM_PROJECTION_TAB, listText: 'Projection', component: ItemProjection, path: '/item/:itemId/projection/',
  },
  {
    tab: ITEM_RELATION_TAB, listText: 'Relation', component: ItemRelationList, path: '/item/:itemId/relation/',
  },
  {
    tab: ACCESS_TAB, listText: 'Direct Access', component: AccessControl, path: '/item/:itemId/direct-access/',
  },
  {
    tab: ACCESSMERGED_TAB, listText: 'Merged Access', component: AccessControlMerged, path: '/item/:itemId/merged-access/',
  },
  {
    tab: STORAGERULE_TAB, listText: 'Storage Rules', component: StorageRule, path: '/item/:itemId/storage-rules/',
  },
  {
    tab: BULKYMETADATA_TAB, listText: 'Bulky Metadata', component: ItemBulkyMetadataList, path: '/item/:itemId/bulky-metadata/', exact: true,
  },
  {
    tab: DELETIONLOCK_TAB, listText: 'Deletion Locks', component: DeletionLockList, path: '/item/:itemId/deletion-locks/',
  },
];

const listComponentRoute = ({ itemId }) => (
  <List>
    {TAB_TITLE.map(({ path, listText, exact }) => (
      <ListItemLink
        key={path}
        secondary={listText}
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
    {TAB_TITLE.map(({
      path, component: RenderComponent, listText, exact,
    }) => (
      <Route
        key={path}
        path={path}
        exact={exact}
        render={() => <RenderComponent {...props} title={listText} />}
      />
    ))}
    <Route
      path="*"
      render={() => <ItemMetadata {...props} title="Metadata" />}
    />
  </Switch>
);

class Item extends React.PureComponent {
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
    if (onRefresh) { onRefresh(); }
  }

  setOnRefresh(onRefresh) {
    this.setState({ onRefresh });
  }

  render() {
    const {
      onChangeTab,
      tabValue,
      itemId,
      history,
    } = this.props;
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
          onSuccess={() => history.push('/item/?content=metadata%2Cthumbnail&baseURI=%2FAPInoauth%2F&terse=true&noauth-url=true')}
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
        <CollectionEntityAdd
          dialogName={COLLECTION_ENTITY_ADD_DIALOG}
          entityId={itemId}
          entityType="item"
        />
        <AccessControlDialog
          dialogName={ITEM_ACCESSCONTROL_ADD_DIALOG}
          entityType="item"
          entityId={itemId}
        />
        <JobCreate
          dialogName={JOB_CREATE_DIALOG}
          initialValues={{
            queryParams: {
              jobmetadata: [{
                key: 'itemId',
                value: itemId,
              }],
            },
          }}
        />
      </>
    );
  }
}

export default compose(withTabs(ITEM_METADATA_TAB), withRouterProps)(Item);
