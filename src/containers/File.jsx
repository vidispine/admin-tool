import { PureComponent } from 'react';

import List from '@material-ui/core/List';
import { Route, Switch, generatePath } from 'react-router-dom';
import { compose } from 'redux';

import FileTitle from '../components/file/FileTitle';
import DrawerContainer from '../components/ui/DrawerContainer';
import ListItemLink from '../components/ui/ListItemLink';
import { withRouterProps } from '../hoc/withRouterProps';
import withTabs from '../hoc/withTabs';
import withUI from '../hoc/withUI';

import DeletionLockList from './DeletionLockList';
import FileOverview from './file/FileOverview';
import FileShape from './file/FileShape';

const FILE_OVERVIEW_TAB = 'FILE_OVERVIEW_TAB';
const FILE_SHAPE_TAB = 'FILE_SHAPE_TAB';
const DELETIONLOCK_TAB = 'DELETIONLOCK_TAB';

const TAB_TITLE = [
  {
    tab: FILE_OVERVIEW_TAB,
    listText: 'Overview',
    component: FileOverview,
    path: '/file/:fileId/',
    exact: true,
  },
  {
    tab: FILE_SHAPE_TAB,
    listText: 'Shape',
    component: FileShape,
    path: '/file/:fileId/shape/',
  },
  {
    tab: DELETIONLOCK_TAB,
    listText: 'Deletion Locks',
    component: DeletionLockList,
    path: '/file/:fileId/deletion-locks/',
  },
];

const listComponentRoute = (props) => (
  <List>
    {TAB_TITLE.map(({ path, listText, exact }) => (
      <ListItemLink
        key={path}
        primary={listText}
        to={generatePath(props.storageId ? `/storage/:storageId${path}` : path, props)}
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
        path={props.storageId ? `/storage/:storageId${path}` : path}
        exact={exact}
        render={() => <RenderComponent {...props} title={listText} />}
      />
    ))}
  </Switch>
);

class File extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.setOnRefresh = this.setOnRefresh.bind(this);
    this.state = {
      onRefresh: undefined,
    };
  }

  componentDidMount() {
    const { fileId } = this.props;
    document.title = `VidiCore Admin | File | ${fileId}`;
    this.onRefresh();
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
    const { storageId, fileId, onChangeTab, tabValue } = this.props;
    const titleComponent = (props) => (
      <FileTitle fileId={fileId} storageId={storageId} {...props} />
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
        fileId={fileId}
        entityId={fileId}
        entityType="file"
        setOnRefresh={this.setOnRefresh}
      />
    );
  }
}

export default compose(withTabs(FILE_OVERVIEW_TAB), withRouterProps, withUI)(File);
