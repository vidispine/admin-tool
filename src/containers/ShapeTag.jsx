import { PureComponent } from 'react';

import List from '@material-ui/core/List';
import { Route, Switch, generatePath } from 'react-router-dom';
import { compose } from 'redux';

import ShapeTagTitle from '../components/shapetag/ShapeTagTitle';
import DrawerContainer from '../components/ui/DrawerContainer';
import ListItemLink from '../components/ui/ListItemLink';
import withTabs from '../hoc/withTabs';
import withUI from '../hoc/withUI';

import ShapeTagScript from './shapetag/ShapeTagScript';
import ShapeTagScriptTest from './shapetag/ShapeTagScriptTest';
import ShapeTagShapeTag from './shapetag/ShapeTagShapeTag';
import ShapeTagStorageRule from './shapetag/ShapeTagStorageRule';

const SHAPETAG_TAB = 'SHAPETAG_TAB';
const SHAPETAG_SCRIPT_TAB = 'SHAPETAG_SCRIPT_TAB';
const SHAPETAG_SCRIPT_TEST_TAB = 'SHAPETAG_SCRIPT_TEST_TAB';
const SHAPETAG_STORAGERULE_TAB = 'SHAPETAG_STORAGERULE_TAB';

const TAB_TITLE = [
  {
    tab: SHAPETAG_TAB,
    listText: 'Shape Tag',
    component: ShapeTagShapeTag,
    path: '/shape-tag/:tagName/',
    exact: true,
  },
  {
    tab: SHAPETAG_SCRIPT_TAB,
    listText: 'Script',
    component: ShapeTagScript,
    path: '/shape-tag/:tagName/script/',
  },
  {
    tab: SHAPETAG_SCRIPT_TEST_TAB,
    listText: 'Script Test',
    component: ShapeTagScriptTest,
    path: '/shape-tag/:tagName/script-test/',
  },
  {
    tab: SHAPETAG_STORAGERULE_TAB,
    listText: 'Storage Rule',
    component: ShapeTagStorageRule,
    path: '/shape-tag/:tagName/storage-rule/',
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

class ShapeTag extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.setOnRefresh = this.setOnRefresh.bind(this);
  }

  componentDidMount() {
    const { tagName } = this.props;
    document.title = `VidiCore Admin | Shape Tag | ${tagName}`;
  }

  UNSAFE_componentWillReceiveProps({ tagName }) {
    const { tagName: prevTagName } = this.props;
    if (prevTagName !== tagName) {
      this.onFetch(tagName);
      document.title = `VidiCore Admin | Shape Tag | ${tagName}`;
    }
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
    const { tagName, onChangeTab, tabValue } = this.props;
    const titleComponent = (props) => (
      <ShapeTagTitle onRefresh={this.onRefresh} tagName={tagName} {...props} />
    );

    return (
      <DrawerContainer
        mainComponent={mainComponentRoute}
        listComponent={listComponentRoute}
        defaultOpen
        onChangeTab={onChangeTab}
        tabValue={tabValue}
        titleComponent={titleComponent}
        tagName={tagName}
        setOnRefresh={this.setOnRefresh}
      />
    );
  }
}

export default compose(withTabs(SHAPETAG_TAB), withUI)(ShapeTag);
