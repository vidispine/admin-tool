import { PureComponent } from 'react';

import List from '@material-ui/core/List';
import { Route, Switch, generatePath } from 'react-router-dom';
import { compose } from 'redux';

import ShapeAddComponent from '../components/shape/ShapeAddComponent';
import ShapeAddMimeType from '../components/shape/ShapeAddMimeType';
import ShapeAddTag from '../components/shape/ShapeAddTag';
import ShapeAnalyze from '../components/shape/ShapeAnalyze';
import ShapeCreateComponentPlaceholder from '../components/shape/ShapeCreateComponentPlaceholder';
import ShapeDeduction from '../components/shape/ShapeDeduction';
import ShapeDelete from '../components/shape/ShapeDelete';
import ShapeExport from '../components/shape/ShapeExport';
import ShapeImpExport from '../components/shape/ShapeImpExport';
import ShapePlaceholderUpdate from '../components/shape/ShapePlaceholderUpdate';
import ShapeRemoveMimeType from '../components/shape/ShapeRemoveMimeType';
import ShapeRemoveTag from '../components/shape/ShapeRemoveTag';
import ShapeTitle from '../components/shape/ShapeTitle';
import ShapeTranscode from '../components/shape/ShapeTranscode';
import DrawerContainer from '../components/ui/DrawerContainer';
import ListItemLink from '../components/ui/ListItemLink';
import { withRouterProps } from '../hoc/withRouterProps';

import ShapeBulkyMetadata from './shape/ShapeBulkyMetadata';
import ShapeBulkyMetadataList from './shape/ShapeBulkyMetadataList';
import ShapeCpl from './shape/ShapeCpl';
import ShapeFileList from './shape/ShapeFileList';
import ShapeGraph from './shape/ShapeGraph';
import ShapeOverview from './shape/ShapeOverview';

const SHAPE_REMOVE_DIALOG = 'SHAPE_REMOVE_DIALOG';
const SHAPE_TRANSCODE_DIALOG = 'SHAPE_TRANSCODE_DIALOG';
const SHAPE_ANALYZE_DIALOG = 'SHAPE_ANALYZE_DIALOG';
const SHAPE_ADD_TAG_DIALOG = 'SHAPE_ADD_TAG_DIALOG';
const SHAPE_REMOVE_TAG_DIALOG = 'SHAPE_REMOVE_TAG_DIALOG';
const SHAPE_ADD_MIMETYPE_DIALOG = 'SHAPE_ADD_MIMETYPE_DIALOG';
const SHAPE_REMOVE_MIMETYPE_DIALOG = 'SHAPE_REMOVE_MIMETYPE_DIALOG';
const SHAPE_ADD_COMPONENT_DIALOG = 'SHAPE_ADD_COMPONENT_DIALOG';
const SHAPE_EXPORT_DIALOG = 'SHAPE_EXPORT_DIALOG';
const SHAPE_IMPEXPORT_DIALOG = 'SHAPE_IMPEXPORT_DIALOG';
const SHAPE_DEDUCTION_DIALOG = 'SHAPE_DEDUCTION_DIALOG';
const SHAPE_PLACEHOLDERUPDATE_DIALOG = 'SHAPE_PLACEHOLDERUPDATE_DIALOG';
const SHAPE_CREATEPLACEHOLDERCOMPONENT_DIALOG = 'SHAPE_CREATEPLACEHOLDERCOMPONENT_DIALOG';

const TAB_TITLE = [
  {
    listText: 'Overview',
    component: ShapeOverview,
    path: '/item/:itemId/shape/:shapeId/',
    exact: true,
  },
  {
    listText: 'Bulky Metadata',
    component: ShapeBulkyMetadataList,
    path: '/item/:itemId/shape/:shapeId/bulky-metadata/',
  },
  {
    listText: 'Files',
    component: ShapeFileList,
    path: '/item/:itemId/shape/:shapeId/file/',
  },
  {
    listText: 'Graph',
    component: ShapeGraph,
    path: '/item/:itemId/shape/:shapeId/graph/',
  },
  {
    listText: 'CPL',
    component: ShapeCpl,
    path: '/item/:itemId/shape/:shapeId/cpl/',
  },
];

const listComponentRoute = ({ itemId, shapeId }) => (
  <List>
    {TAB_TITLE.map(({ path, listText, exact }) => (
      <ListItemLink
        key={path}
        primary={listText}
        to={generatePath(path, { itemId, shapeId })}
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
      path="/item/:itemId/shape/:shapeId/bulky-metadata/:bulkyMetadataKey"
      render={() => <ShapeBulkyMetadata {...props} title="Bulky Metadata" />}
      {...props}
    />
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

class Shape extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.setOnRefresh = this.setOnRefresh.bind(this);
    this.state = {
      onRefresh: undefined,
    };
  }

  componentDidMount() {
    const { shapeId } = this.props;
    document.title = `VidiCore Admin | Shape | ${shapeId}`;
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
    const { itemId, shapeId, history } = this.props;
    const titleComponent = (props) => (
      <ShapeTitle
        onRefresh={this.onRefresh}
        shapeId={shapeId}
        itemId={itemId}
        removeModal={SHAPE_REMOVE_DIALOG}
        transcodeModal={SHAPE_TRANSCODE_DIALOG}
        deductionModal={SHAPE_DEDUCTION_DIALOG}
        analyzeTagModal={SHAPE_ANALYZE_DIALOG}
        addTagModal={SHAPE_ADD_TAG_DIALOG}
        removeTagModal={SHAPE_REMOVE_TAG_DIALOG}
        addMimeTypeModal={SHAPE_ADD_MIMETYPE_DIALOG}
        removeMimeTypeModal={SHAPE_REMOVE_MIMETYPE_DIALOG}
        addComponentModal={SHAPE_ADD_COMPONENT_DIALOG}
        exportModal={SHAPE_EXPORT_DIALOG}
        exportImpModal={SHAPE_IMPEXPORT_DIALOG}
        placeholderUpdateModal={SHAPE_PLACEHOLDERUPDATE_DIALOG}
        createPlaceholderComponentModal={SHAPE_CREATEPLACEHOLDERCOMPONENT_DIALOG}
        {...props}
      />
    );
    return (
      <>
        <DrawerContainer
          shapeId={shapeId}
          itemId={itemId}
          mainComponent={mainComponentRoute}
          listComponent={listComponentRoute}
          defaultOpen
          titleComponent={titleComponent}
          setOnRefresh={this.setOnRefresh}
        />
        <ShapeDelete
          dialogName={SHAPE_REMOVE_DIALOG}
          onSuccess={() => history.push(`/item/${itemId}`)}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapeTranscode
          dialogName={SHAPE_TRANSCODE_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapeDeduction
          dialogName={SHAPE_DEDUCTION_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapeAnalyze
          dialogName={SHAPE_ANALYZE_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapeAddComponent
          dialogName={SHAPE_ADD_COMPONENT_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapeAddTag
          dialogName={SHAPE_ADD_TAG_DIALOG}
          onSuccess={this.onRefresh}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapeRemoveTag
          dialogName={SHAPE_REMOVE_TAG_DIALOG}
          onSuccess={this.onRefresh}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapeAddMimeType
          dialogName={SHAPE_ADD_MIMETYPE_DIALOG}
          onSuccess={this.onRefresh}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapeRemoveMimeType
          dialogName={SHAPE_REMOVE_MIMETYPE_DIALOG}
          onSuccess={this.onRefresh}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapePlaceholderUpdate
          dialogName={SHAPE_PLACEHOLDERUPDATE_DIALOG}
          onSuccess={this.onRefresh}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapeCreateComponentPlaceholder
          dialogName={SHAPE_CREATEPLACEHOLDERCOMPONENT_DIALOG}
          onSuccess={this.onRefresh}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapeExport
          dialogName={SHAPE_EXPORT_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapeImpExport
          dialogName={SHAPE_IMPEXPORT_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
          shapeId={shapeId}
        />
      </>
    );
  }
}

export default compose(withRouterProps)(Shape);
