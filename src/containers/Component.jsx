import { PureComponent } from 'react';
import { compose } from 'redux';
import List from '@material-ui/core/List';
import { Route, Switch, generatePath } from 'react-router-dom';

import { withRouterProps } from '../hoc/withRouterProps';

import ComponentOverview from './component/ComponentOverview';
import ComponentBulkyMetadata from './component/ComponentBulkyMetadata';
import ComponentBulkyMetadataList from './component/ComponentBulkyMetadataList';

import ComponentTitle from '../components/component/ComponentTitle';
import DrawerContainer from '../components/ui/DrawerContainer';
import ListItemLink from '../components/ui/ListItemLink';

const TAB_TITLE = [
  {
    listText: 'Overview',
    component: ComponentOverview,
    path: '/item/:itemId/shape/:shapeId/component/:componentId/',
    exact: true,
  },
  {
    listText: 'Bulky Metadata',
    component: ComponentBulkyMetadataList,
    path: '/item/:itemId/shape/:shapeId/component/:componentId/bulky-metadata/',
  },
];

const listComponentRoute = ({ itemId, shapeId, componentId }) => (
  <List>
    {TAB_TITLE.map(({ path, listText, exact }) => (
      <ListItemLink
        key={path}
        primary={listText}
        to={generatePath(path, { itemId, shapeId, componentId })}
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
      path="/item/:itemId/shape/:shapeId/component/:componentId/bulky-metadata/:bulkyMetadataKey"
      render={() => <ComponentBulkyMetadata {...props} title="Bulky Metadata" />}
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
  </Switch>
);

class Component extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.setOnRefresh = this.setOnRefresh.bind(this);
    this.state = {
      onRefresh: undefined,
    };
  }

  componentDidMount() {
    const { componentId } = this.props;
    document.title = `VidiCore Admin | Component | ${componentId}`;
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
      itemId,
      shapeId,
      componentId,
    } = this.props;
    const titleComponent = (props) => (
      <ComponentTitle
        onRefresh={this.onRefresh}
        shapeId={shapeId}
        itemId={itemId}
        componentId={componentId}
        {...props}
      />
    );
    return (
      <>
        <DrawerContainer
          shapeId={shapeId}
          itemId={itemId}
          componentId={componentId}
          mainComponent={mainComponentRoute}
          listComponent={listComponentRoute}
          defaultOpen
          titleComponent={titleComponent}
          setOnRefresh={this.setOnRefresh}
        />
      </>
    );
  }
}

export default compose(withRouterProps)(Component);
