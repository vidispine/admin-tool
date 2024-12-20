import React from 'react';
import List from '@material-ui/core/List';
import { compose } from 'redux';
import { Route, Switch, generatePath } from 'react-router-dom';

import { withRouterProps } from '../hoc/withRouterProps';
import FileTitle from '../components/file/FileTitle';
import FileOverview from './file/FileOverview';
import FileShape from './file/FileShape';
import DrawerContainer from '../components/ui/DrawerContainer';
import withTabs from '../hoc/withTabs';
import withUI from '../hoc/withUI';
import ListItemLink from '../components/ui/ListItemLink';
import DeletionLockList from './DeletionLockList';

const FILE_OVERVIEW_TAB = 'FILE_OVERVIEW_TAB';
const FILE_SHAPE_TAB = 'FILE_SHAPE_TAB';
const DELETIONLOCK_TAB = 'DELETIONLOCK_TAB';

const TAB_TITLE = [
  {
    tab: FILE_OVERVIEW_TAB, listText: 'Overview', component: FileOverview, path: '/file/:fileId/', exact: true,
  },
  {
    tab: FILE_SHAPE_TAB, listText: 'Shape', component: FileShape, path: '/file/:fileId/shape/',
  },
  {
    tab: DELETIONLOCK_TAB, listText: 'Deletion Locks', component: DeletionLockList, path: '/file/:fileId/deletion-locks/',
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

class File extends React.PureComponent {
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
    if (onRefresh) { onRefresh(); }
  }

  setOnRefresh(onRefresh) {
    this.setState({ onRefresh });
  }

  render() {
    const {
      fileId,
      onChangeTab,
      tabValue,
    } = this.props;
    const titleComponent = (props) => (
      <FileTitle
        fileId={fileId}
        {...props}
      />
    );
    return (
      <DrawerContainer
        mainComponent={mainComponentRoute}
        listComponent={listComponentRoute}
        defaultOpen
        onChangeTab={onChangeTab}
        tabValue={tabValue}
        titleComponent={titleComponent}
        fileId={fileId}
        entityId={fileId}
        entityType="file"
        setOnRefresh={this.setOnRefresh}
      />
    );
  }
}

export default compose(withTabs(FILE_OVERVIEW_TAB), withRouterProps, withUI)(File);
