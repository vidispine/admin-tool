import { PureComponent } from 'react';

import { generatePath } from 'react-router-dom';
import { compose } from 'redux';

import { bulkymetadata as BulkyMetadataApi } from '@vidispine/vdt-api';

import BulkyMetadataDisplay from '../../components/bulkymetadata/BulkyMetadataDisplay';
import BulkyMetadataDownloadDialog from '../../components/bulkymetadata/BulkyMetadataDownloadDialog';
import { withRouterProps } from '../../hoc/withRouterProps';
import withSnackbar from '../../hoc/withSnackbar';

const BULKYMETADATA_COMPONENT_DOWNLOAD_DIALOG = 'BULKYMETADATA_COMPONENT_DOWNLOAD_DIALOG';

class ComponentBulkyMetadata extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      bulkyMetadataDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ shapeId, itemId, componentId, bulkyMetadataKey }) {
    const { componentId: prevComponentId, bulkyMetadataKey: prevKey } = this.props;
    if (prevComponentId !== componentId || prevKey !== bulkyMetadataKey) {
      this.onFetch(itemId, shapeId, componentId, bulkyMetadataKey);
      document.title = `VidiCore Admin | Component | ${componentId}`;
    }
  }

  onRefresh() {
    const { itemId, shapeId, componentId, bulkyMetadataKey } = this.props;
    this.onFetch(itemId, shapeId, componentId, bulkyMetadataKey);
  }

  onFetch(itemId, shapeId, componentId, bulkyMetadataKey) {
    try {
      BulkyMetadataApi.getComponentBulkyMetadata({
        itemId,
        shapeId,
        componentId,
        key: bulkyMetadataKey,
      })
        .then((response) => this.setState({ bulkyMetadataDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Bulky Metadata';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const {
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      bulkyMetadataKey,
      itemId,
      shapeId,
      componentId,
    } = this.props;
    const { bulkyMetadataDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={bulkyMetadataDocument}
            codeModal="BulkyMetadataDocument"
            onRefresh={this.onRefresh}
            breadcrumbList={[
              {
                title: 'Bulky Metadata',
                to: generatePath(
                  '/item/:itemId/shape/:shapeId/component/:componentId/bulky-metadata/',
                  { itemId, shapeId, componentId },
                ),
              },
              bulkyMetadataKey,
            ]}
            downloadModal={BULKYMETADATA_COMPONENT_DOWNLOAD_DIALOG}
          />
        )}
        {TabComponent && <TabComponent />}
        {bulkyMetadataDocument && (
          <BulkyMetadataDisplay bulkyMetadataDocument={bulkyMetadataDocument} />
        )}
        <BulkyMetadataDownloadDialog
          dialogName={BULKYMETADATA_COMPONENT_DOWNLOAD_DIALOG}
          itemId={itemId}
          shapeId={shapeId}
          componentId={componentId}
          bulkyMetadataKey={bulkyMetadataKey}
        />
      </>
    );
  }
}

export default compose(withRouterProps, withSnackbar)(ComponentBulkyMetadata);
