import React from 'react';
import { compose } from 'redux';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import withTabs from '../hoc/withTabs';
import withUI from '../hoc/withUI';

import CollectionMetadata from './collection/CollectionMetadata';
import CollectionContent from './collection/CollectionContent';
import CollectionCollection from './collection/CollectionCollection';
import AccessControl from './AccessControl';
import AccessControlMerged from './AccessControlMerged';
import StorageRule from './StorageRule';
import DeletionLockList from './DeletionLockList';

import TitleHeader from '../components/ui/TitleHeader';
import CollectionRemove from '../components/collection/CollectionRemove';
import CollectionExport from '../components/collection/CollectionExport';
import AccessControlDialog from '../components/access/AccessControlDialog';
import DrawerContainer from '../components/ui/DrawerContainer';
import DrawerListItem from '../components/ui/DrawerListItem';

import CollectionRename from '../components/collection/CollectionRename';
import CollectionEntityAdd from '../components/collection/CollectionEntityAdd';
import Menu, { MenuItem } from '../components/ui/Menu';

const COLLECTION_METADATA_TAB = 'COLLECTION_METADATA_TAB';
const COLLECTION_COLLECTION_TAB = 'COLLECTION_COLLECTION_TAB';
const COLLECTION_CONTENT_TAB = 'COLLECTION_CONTENT_TAB';
const ACCESS_TAB = 'ACCESS_TAB';
const ACCESSMERGED_TAB = 'ACCESSMERGED_TAB';
const STORAGERULE_TAB = 'STORAGERULE_TAB';
const DELETIONLOCK_TAB = 'DELETIONLOCK_TAB';
const COLLECTION_REMOVE_DIALOG = 'COLLECTION_REMOVE_DIALOG';
const COLLECTION_ACCESSCONTROL_ADD_DIALOG = 'COLLECTION_ACCESSCONTROL_ADD_DIALOG';
const COLLECTION_EXPORT_DIALOG = 'COLLECTION_EXPORT_DIALOG';
const COLLECTION_RENAME_DIALOG = 'COLLECTION_RENAME_DIALOG';
const COLLECTION_ENTITY_ADD_DIALOG = 'COLLECTION_ENTITY_ADD_DIALOG';

const TAB_TITLE = [
  { tab: COLLECTION_METADATA_TAB, listText: 'Metadata', component: CollectionMetadata },
  { tab: COLLECTION_CONTENT_TAB, listText: 'Content', component: CollectionContent },
  { tab: COLLECTION_COLLECTION_TAB, listText: 'Collection', component: CollectionCollection },
  { tab: ACCESS_TAB, listText: 'Direct Access', component: AccessControl },
  { tab: ACCESSMERGED_TAB, listText: 'Merged Access', component: AccessControlMerged },
  { tab: STORAGERULE_TAB, listText: 'Storage Rules', component: StorageRule },
  { tab: DELETIONLOCK_TAB, listText: 'Deletion Locks', component: DeletionLockList },
];

const listComponent = ({ onChangeTab, tabValue }) => (
  <List>
    {TAB_TITLE.map(({ tab, listText }) => (
      <DrawerListItem
        key={listText}
        listText={listText}
        listItemProps={{
          onClick: () => onChangeTab(null, tab),
          selected: tabValue === tab || undefined,
        }}
      />
    ))}
  </List>
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
    const tabInfo = TAB_TITLE.find((thisTab) => thisTab.tab === tabValue) || TAB_TITLE[0];
    const { listText, component: mainComponent } = tabInfo;
    const titleComponent = (props) => (
      <TitleHeader
        grandParentTitle="Collection"
        grandParentTo="/collection/"
        parentTitle={collectionId}
        title={listText}
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
          </Menu>
        )}
        {...props}
      />
    );
    return (
      <>
        <DrawerContainer
          mainComponent={mainComponent}
          listComponent={listComponent}
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
        />
        <CollectionEntityAdd
          dialogName={COLLECTION_ENTITY_ADD_DIALOG}
          onSuccess={this.onRefresh}
          collectionId={collectionId}
        />
        <CollectionRename
          dialogName={COLLECTION_RENAME_DIALOG}
          collectionId={collectionId}
          onSuccess={() => this.onRefresh()}
          collectionDocument={{ name: collectionName }}
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
