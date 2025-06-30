import { PureComponent } from 'react';

import List from '@material-ui/core/List';
import { Route, Switch, generatePath } from 'react-router-dom';
import { compose } from 'redux';

import StorageTitle from '../components/storage/StorageTitle';
import DrawerContainer from '../components/ui/DrawerContainer';
import ListItemLink from '../components/ui/ListItemLink';
import withTabs from '../hoc/withTabs';
import withUI from '../hoc/withUI';

import AutoImportRule from './AutoImportRule';
import ExternalId from './ExternalId';
import FileList from './FileList';
import StorageStorage from './storage/StorageStorage';

const EXTERNALID_TAB = 'EXTERNALID_TAB';
const STORAGE_TAB = 'STORAGE_TAB';
const STORAGE_FILE_TAB = 'STORAGE_FILE_TAB';
const STORAGE_AUTOIMPORT_TAB = 'STORAGE_AUTOIMPORT_TAB';

const TAB_TITLE = [
  {
    tab: STORAGE_TAB,
    listText: 'Storage',
    component: StorageStorage,
    path: '/storage/:storageId/',
    exact: true,
  },
  {
    tab: STORAGE_FILE_TAB,
    listText: 'Files',
    component: FileList,
    path: '/storage/:storageId/file/',
  },
  {
    tab: EXTERNALID_TAB,
    listText: 'External ID',
    component: ExternalId,
    path: '/storage/:storageId/external-id/',
    entity: 'storage',
  },
  {
    tab: STORAGE_AUTOIMPORT_TAB,
    listText: 'Auto Import',
    component: AutoImportRule,
    path: '/storage/:storageId/auto-import/',
    entity: 'storage',
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
    {TAB_TITLE.map(({ path, component: RenderComponent, listText, exact }) => (
      <Route
        key={path}
        path={path}
        exact={exact}
        render={() => <RenderComponent {...props} title={listText} />}
      />
    ))}
  </Switch>
);

class Storage extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.setOnRefresh = this.setOnRefresh.bind(this);

    this.state = {
      onRefresh: undefined,
    };
  }

  componentDidMount() {
    const { storageId } = this.props;
    document.title = `VidiCore Admin | Storage | ${storageId}`;
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
    const { storageId, onChangeTab, tabValue } = this.props;
    const titleComponent = (props) => (
      <StorageTitle onRefresh={this.onRefresh} storageId={storageId} {...props} />
    );
    return (
      <DrawerContainer
        mainComponent={mainComponentRoute}
        listComponent={listComponentRoute}
        defaultOpen
        onChangeTab={onChangeTab}
        tabValue={tabValue}
        titleComponent={titleComponent}
        storageId={storageId}
        entityId={storageId}
        entityType="storage"
        setOnRefresh={this.setOnRefresh}
      />
    );
  }
}

export default compose(withTabs(STORAGE_TAB), withUI)(Storage);
