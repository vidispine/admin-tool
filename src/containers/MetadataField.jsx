import { PureComponent } from 'react';

import List from '@material-ui/core/List';
import { Route, Switch, generatePath } from 'react-router-dom';
import { compose } from 'redux';

import MetadataFieldAccessControlDialog from '../components/metadatafield/MetadataFieldAccessControlDialog';
import MetadataFieldRemove from '../components/metadatafield/MetadataFieldRemove';
import MetadataFieldTitle from '../components/metadatafield/MetadataFieldTitle';
import DrawerContainer from '../components/ui/DrawerContainer';
import ListItemLink from '../components/ui/ListItemLink';
import withSnackbar from '../hoc/withSnackbar';

import ExternalId from './ExternalId';
import MetadataFieldAccess from './metadatafield/MetadataFieldAccess';
import MetadataFieldAllowedValues from './metadatafield/MetadataFieldAllowedValues';
import MetadataFieldMergedAccess from './metadatafield/MetadataFieldMergedAccess';
import MetadataFieldMetadata from './metadatafield/MetadataFieldMetadata';
import MetadataFieldOverview from './metadatafield/MetadataFieldOverview';
import MetadataFieldValues from './metadatafield/MetadataFieldValues';

const METADATAFIELD_OVERVIEW_TAB = 'METADATAFIELD_OVERVIEW_TAB';
const METADATAFIELD_ALLOWEDVALUES_TAB = 'METADATAFIELD_VALUES_TAB';
const METADATAFIELD_VALUES_TAB = 'METADATAFIELD_ALLOWEDVALUES_TAB';
const METADATAFIELD_METADATA_TAB = 'METADATAFIELD_METADATA_TAB';
const METADATAFIELD_MERGEDACCESS_TAB = 'METADATAFIELD_MERGEDACCESS_TAB';
const METADATAFIELD_ACCESS_TAB = 'METADATAFIELD_ACCESS_TAB';
const METADATAFIELD_ACCESS_MODAL = 'METADATAFIELD_ACCESS_MODAL';
const EXTERNALID_TAB = 'EXTERNALID_TAB';

const TAB_TITLE = [
  {
    tab: METADATAFIELD_OVERVIEW_TAB,
    listText: 'Overview',
    component: MetadataFieldOverview,
    path: '/metadata-field/:fieldName/',
    exact: true,
  },
  {
    tab: METADATAFIELD_ALLOWEDVALUES_TAB,
    listText: 'Allowed Values',
    component: MetadataFieldAllowedValues,
    path: '/metadata-field/:fieldName/allowed-values/',
  },
  {
    tab: METADATAFIELD_VALUES_TAB,
    listText: 'Values',
    component: MetadataFieldValues,
    path: '/metadata-field/:fieldName/values/',
  },
  {
    tab: METADATAFIELD_METADATA_TAB,
    listText: 'Metadata',
    component: MetadataFieldMetadata,
    path: '/metadata-field/:fieldName/metadata/',
  },
  {
    tab: METADATAFIELD_ACCESS_TAB,
    listText: 'Access',
    component: MetadataFieldAccess,
    path: '/metadata-field/:fieldName/access/',
  },
  {
    tab: METADATAFIELD_MERGEDACCESS_TAB,
    listText: 'Merged Access',
    component: MetadataFieldMergedAccess,
    path: '/metadata-field/:fieldName/merged-access/',
  },
  {
    tab: EXTERNALID_TAB,
    listText: 'External ID',
    component: ExternalId,
    path: '/metadata-field/:fieldName/external-id/',
    entity: 'metadata-field',
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

const METADATAFIELD_REMOVE_MODAL = 'METADATAFIELD_REMOVE_MODAL';

class MetadataField extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.setOnRefresh = this.setOnRefresh.bind(this);
    this.state = {
      onRefresh: undefined,
    };
  }

  componentDidMount() {
    const { fieldName } = this.props;
    document.title = `VidiCore Admin | Metadata Field | ${fieldName}`;
  }

  UNSAFE_componentWillReceiveProps({ fieldName }) {
    const { fieldName: prevFieldName } = this.props;
    if (prevFieldName !== fieldName) {
      document.title = `VidiCore Admin | Metadata Field | ${fieldName}`;
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
    const { fieldName } = this.props;
    const titleComponent = (props) => (
      <MetadataFieldTitle
        onRefresh={this.onRefresh}
        fieldName={fieldName}
        removeModal={METADATAFIELD_REMOVE_MODAL}
        menuList={[
          {
            label: 'Add Access Control',
            modalName: METADATAFIELD_ACCESS_MODAL,
          },
          {
            label: 'Delete Metadata Field',
            modalName: METADATAFIELD_REMOVE_MODAL,
            color: 'secondary',
          },
        ]}
        {...props}
      />
    );
    return (
      <>
        <DrawerContainer
          fieldName={fieldName}
          mainComponent={mainComponentRoute}
          listComponent={listComponentRoute}
          defaultOpen
          titleComponent={titleComponent}
          setOnRefresh={this.setOnRefresh}
          entityId={fieldName}
          entityType="metadata-field"
        />
        <MetadataFieldRemove dialogName={METADATAFIELD_REMOVE_MODAL} fieldName={fieldName} />
        <MetadataFieldAccessControlDialog
          fieldName={fieldName}
          dialogName={METADATAFIELD_ACCESS_MODAL}
          onSuccess={this.onRefresh}
        />
      </>
    );
  }
}

export default compose(withSnackbar)(MetadataField);
