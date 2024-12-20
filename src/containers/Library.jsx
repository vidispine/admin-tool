import React from 'react';
import { compose } from 'redux';
import List from '@material-ui/core/List';
import { Route, Switch, generatePath } from 'react-router-dom';

import withTabs from '../hoc/withTabs';
import { withRouterProps } from '../hoc/withRouterProps';

import LibrarySettings from './library/LibrarySettings';
import LibraryContent from './library/LibraryContent';
import AccessControl from './AccessControl';
import AccessControlMerged from './AccessControlMerged';
import StorageRule from './StorageRule';

import LibraryTitle from '../components/library/LibraryTitle';
import LibraryRemove from '../components/library/LibraryRemove';
import LibraryUpdate from '../components/library/LibraryUpdate';
import LibraryItemMetadata from '../components/library/LibraryItemMetadata';
import LibraryExport from '../components/library/LibraryExport';
import AccessControlDialog from '../components/access/AccessControlDialog';
import DrawerContainer from '../components/ui/DrawerContainer';
import ListItemLink from '../components/ui/ListItemLink';
import DeletionLockList from './DeletionLockList';

const LIBRARY_SETTINGS_TAB = 'LIBRARY_SETTINGS_TAB';
const LIBRARY_CONTENT_TAB = 'LIBRARY_CONTENT_TAB';
const ACCESS_TAB = 'ACCESS_TAB';
const ACCESSMERGED_TAB = 'ACCESSMERGED_TAB';
const STORAGERULE_TAB = 'STORAGERULE_TAB';
const DELETIONLOCK_TAB = 'DELETIONLOCK_TAB';

const LIBRARY_REMOVE_DIALOG = 'LIBRARY_REMOVE_DIALOG';
const LIBRARY_UPDATE_DIALOG = 'LIBRARY_UPDATE_DIALOG';
const LIBRARY_ITEM_METADATA_DIALOG = 'LIBRARY_ITEM_METADATA_DIALOG';
const LIBRARY_ACCESSCONTROL_ADD_DIALOG = 'LIBRARY_ACCESSCONTROL_ADD_DIALOG';
const LIBRARY_EXPORT_DIALOG = 'LIBRARY_EXPORT_DIALOG';

const TAB_TITLE = [
  {
    tab: LIBRARY_SETTINGS_TAB, listText: 'Settings', component: LibrarySettings, path: '/library/:libraryId/settings/',
  },
  {
    tab: LIBRARY_CONTENT_TAB, listText: 'Content', component: LibraryContent, path: '/library/:libraryId/', exact: true,
  },
  {
    tab: ACCESS_TAB, listText: 'Direct Access', component: AccessControl, path: '/library/:libraryId/direct-access/',
  },
  {
    tab: ACCESSMERGED_TAB, listText: 'Merged Access', component: AccessControlMerged, path: '/library/:libraryId/merged-access/',
  },
  {
    tab: STORAGERULE_TAB, listText: 'Storage Rules', component: StorageRule, path: '/library/:libraryId/storage-rules/',
  },
  {
    tab: DELETIONLOCK_TAB, listText: 'Deletion Locks', component: DeletionLockList, path: '/library/:libraryId/deletion-locks/',
  },
];

const listComponentRoute = (props) => (
  <List>
    {TAB_TITLE.map(({ path, listText, exact }) => (
      <ListItemLink
        key={path}
        primary={listText}
        to={generatePath(path, props)}
        exact={exact}
        dense
        style={{ paddingLeft: 8 }}
        disableGutters
      />
    ))}
  </List>
);

const mainComponentRoute = (props) => (
  <Switch>
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
  </Switch>
);

class Library extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.setOnRefresh = this.setOnRefresh.bind(this);
    this.state = {
      onRefresh: undefined,
    };
  }

  componentDidMount() {
    const { libraryId } = this.props;
    document.title = `VidiCore Admin | Library | ${libraryId}`;
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
    const {
      onChangeTab, tabValue, libraryId, history,
    } = this.props;
    const titleComponent = (props) => (
      <LibraryTitle
        libraryId={libraryId}
        removeModal={LIBRARY_REMOVE_DIALOG}
        updateModal={LIBRARY_UPDATE_DIALOG}
        itemMetadataModal={LIBRARY_ITEM_METADATA_DIALOG}
        addAccessControl={LIBRARY_ACCESSCONTROL_ADD_DIALOG}
        exportModal={LIBRARY_EXPORT_DIALOG}
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
          libraryId={libraryId}
          entityId={libraryId}
          entityType="library"
          setOnRefresh={this.setOnRefresh}
        />
        <LibraryUpdate
          dialogName={LIBRARY_UPDATE_DIALOG}
          libraryId={libraryId}
        />
        <LibraryRemove
          dialogName={LIBRARY_REMOVE_DIALOG}
          onSuccess={() => history.push('/library/')}
          libraryId={libraryId}
        />
        <LibraryItemMetadata
          dialogName={LIBRARY_ITEM_METADATA_DIALOG}
          libraryId={libraryId}
        />
        <AccessControlDialog
          dialogName={LIBRARY_ACCESSCONTROL_ADD_DIALOG}
          entityType="library"
          entityId={libraryId}
          onSuccess={this.onRefresh}
        />
        <LibraryExport
          dialogName={LIBRARY_EXPORT_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          libraryId={libraryId}
        />
      </>
    );
  }
}

export default compose(withTabs(LIBRARY_SETTINGS_TAB), withRouterProps)(Library);
