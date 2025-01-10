import React from 'react';
import List from '@material-ui/core/List';
import { Route, Switch, generatePath } from 'react-router-dom';

import withTabs from '../hoc/withTabs';
import ImportUri from './import/ImportUri';
import ImportPlaceholder from './import/ImportPlaceholder';
import ImportComponent from './import/ImportComponent';
import ImportRaw from './import/ImportRaw';
import ImportFile from './import/ImportFile';
import ImportShapePlaceholder from './import/ImportShapePlaceholder';
import ImportShape from './import/ImportShape';
import ImportCollection from './import/ImportCollection';
import ImportShapeEssence from './import/ImportShapeEssence';
import ImportSidecar from './import/ImportSidecar';
import ImportSidecarRaw from './import/ImportSidecarRaw';
import DrawerContainer from '../components/ui/DrawerContainer';
import ListItemLink from '../components/ui/ListItemLink';

const IMPORTURI_TAB = 'IMPORTURI_TAB';
const IMPORTPLACEHOLDER_TAB = 'IMPORTPLACEHOLDER_TAB';
const IMPORTCOMPONENT_TAB = 'IMPORTCOMPONENT_TAB';
const IMPORTRAW_TAB = 'IMPORTRAW_TAB';
const IMPORTFILE_TAB = 'IMPORTFILE_TAB';
const IMPORTSHAPEPLACEHOLDER_TAB = 'IMPORTSHAPEPLACEHOLDER_TAB';
const IMPORTSHAPE_TAB = 'IMPORTSHAPE_TAB';
const IMPORTCOLLECTION_TAB = 'IMPORTCOLLECTION_TAB';
const IMPORTSHAPEESSENCE_TAB = 'IMPORTSHAPEESSENCE_TAB';
const IMPORTSIDECAR_TAB = 'IMPORTSIDECAR_TAB';
const IMPORTSIDECARRAW_TAB = 'IMPORTSIDECARRAW_TAB';

const TAB_TITLE = [
  {
    tab: IMPORTURI_TAB,
    listText: 'URI',
    component: ImportUri,
    path: '/import/item/uri/',
    exact: true,
  },
  {
    tab: IMPORTPLACEHOLDER_TAB,
    listText: 'Placeholder Item',
    component: ImportPlaceholder,
    path: '/import/item/placeholder/',
    exact: true,
  },
  {
    tab: IMPORTCOMPONENT_TAB,
    listText: 'Component',
    component: ImportComponent,
    path: '/import/item/component/',
    exact: true,
  },
  {
    tab: IMPORTRAW_TAB,
    listText: 'Upload',
    component: ImportRaw,
    path: '/import/item/upload/',
    exact: true,
  },
  {
    tab: IMPORTFILE_TAB,
    listText: 'File',
    component: ImportFile,
    path: '/import/file/',
    exact: true,
  },
  {
    tab: IMPORTSHAPEPLACEHOLDER_TAB,
    listText: 'Placeholder Shape',
    component: ImportShapePlaceholder,
    path: '/import/item/shape/placeholder/',
    exact: true,
  },
  {
    tab: IMPORTSHAPE_TAB,
    listText: 'Shape',
    component: ImportShape,
    path: '/import/item/shape/',
    exact: true,
  },
  {
    tab: IMPORTCOLLECTION_TAB,
    listText: 'Collection',
    component: ImportCollection,
    path: '/import/collection/',
    exact: true,
  },
  {
    tab: IMPORTSHAPEESSENCE_TAB,
    listText: 'Essence',
    component: ImportShapeEssence,
    path: '/import/item/shape/essence/',
    exact: true,
  },
  {
    tab: IMPORTSIDECAR_TAB,
    listText: 'Sidecar',
    component: ImportSidecar,
    path: '/import/sidecar/',
    exact: true,
  },
  {
    tab: IMPORTSIDECARRAW_TAB,
    listText: 'Sidecar Upload',
    component: ImportSidecarRaw,
    path: '/import/sidecar/upload/',
    exact: true,
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
    {TAB_TITLE.map(
      ({
        path,
        component: RenderComponent,
        listText,
        exact,
        ...renderProps
      }) => (
        <Route
          key={path}
          path={path}
          exact={exact}
          render={() => (
            <RenderComponent {...props} {...renderProps} title={listText} />
          )}
        />
      ),
    )}
    <Route
      path="*"
      render={() => <ImportPlaceholder {...props} title="Item Placeholder" />}
    />
  </Switch>
);

class Import extends React.PureComponent {
  render() {
    const { onChangeTab, tabValue } = this.props;
    return (
      <DrawerContainer
        mainComponent={mainComponentRoute}
        listComponent={listComponentRoute}
        defaultOpen
        onChangeTab={onChangeTab}
        tabValue={tabValue}
        entityType="item"
        setOnRefresh={this.setOnRefresh}
      />
    );
  }
}

export default withTabs(IMPORTFILE_TAB)(Import);
