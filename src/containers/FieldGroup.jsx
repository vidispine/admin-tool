import { PureComponent } from 'react';

import List from '@material-ui/core/List';
import { Route, Switch, generatePath } from 'react-router-dom';
import { compose } from 'redux';

import FieldGroupRemove from '../components/fieldgroup/FieldGroupRemove';
import FieldGroupTitle from '../components/fieldgroup/FieldGroupTitle';
import DrawerContainer from '../components/ui/DrawerContainer';
import ListItemLink from '../components/ui/ListItemLink';
import withSnackbar from '../hoc/withSnackbar';

import ExternalId from './ExternalId';
import FieldGroupMergedAccess from './fieldgroup/FieldGroupMergedAccess';
import FieldGroupMetadata from './fieldgroup/FieldGroupMetadata';
import FieldGroupOverview from './fieldgroup/FieldGroupOverview';

const FIELDGROUP_REMOVE_MODAL = 'FIELDGROUP_REMOVE_MODAL';
const FIELDGROUP_OVERVIEW_TAB = 'METADATAFIELD_OVERVIEW_TAB';
const FIELDGROUP_METADATA_TAB = 'METADATAFIELD_METADATA_TAB';
const FIELDGROUP_MERGEDACCESS_TAB = 'METADATAFIELD_MERGEDACCESS_TAB';
const EXTERNALID_TAB = 'EXTERNALID_TAB';

const TAB_TITLE = [
  {
    tab: FIELDGROUP_OVERVIEW_TAB,
    listText: 'Overview',
    component: FieldGroupOverview,
    path: '/field-group/:groupName/',
    exact: true,
  },
  {
    tab: FIELDGROUP_METADATA_TAB,
    listText: 'Metadata',
    component: FieldGroupMetadata,
    path: '/field-group/:groupName/metadata/',
  },
  {
    tab: FIELDGROUP_MERGEDACCESS_TAB,
    listText: 'Merged Access',
    component: FieldGroupMergedAccess,
    path: '/field-group/:groupName/merged-access/',
  },
  {
    tab: EXTERNALID_TAB,
    listText: 'External ID',
    component: ExternalId,
    path: '/field-group/:groupName/external-id/',
    entity: 'metadata-field/field-group',
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

class FieldGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.setOnRefresh = this.setOnRefresh.bind(this);
    this.state = {
      onRefresh: undefined,
    };
  }

  componentDidMount() {
    const { groupName } = this.props;
    document.title = `VidiCore Admin | Field Group | ${groupName}`;
  }

  UNSAFE_componentWillReceiveProps({ groupName }) {
    const { groupName: prevGroupName } = this.props;
    if (prevGroupName !== groupName) {
      this.onFetch(groupName);
      document.title = `VidiCore Admin | Field Group | ${groupName}`;
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
    const { groupName } = this.props;

    const titleComponent = (props) => (
      <FieldGroupTitle
        onRefresh={this.onRefresh}
        groupName={groupName}
        removeModal={FIELDGROUP_REMOVE_MODAL}
        {...props}
      />
    );
    return (
      <>
        <DrawerContainer
          groupName={groupName}
          mainComponent={mainComponentRoute}
          listComponent={listComponentRoute}
          defaultOpen
          titleComponent={titleComponent}
          setOnRefresh={this.setOnRefresh}
          entityId={groupName}
          entityType="metadata-field/field-group"
        />
        <FieldGroupRemove dialogName={FIELDGROUP_REMOVE_MODAL} groupName={groupName} />
      </>
    );
  }
}

export default compose(withSnackbar)(FieldGroup);
