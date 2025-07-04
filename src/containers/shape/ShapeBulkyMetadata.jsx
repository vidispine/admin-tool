import { PureComponent } from 'react';

import { generatePath } from 'react-router-dom';
import { compose } from 'redux';

import { bulkymetadata as BulkyMetadataApi } from '@vidispine/vdt-api';

import BulkyMetadataDisplay from '../../components/bulkymetadata/BulkyMetadataDisplay';
import BulkyMetadataDownloadDialog from '../../components/bulkymetadata/BulkyMetadataDownloadDialog';
import { withRouterProps } from '../../hoc/withRouterProps';
import withSnackbar from '../../hoc/withSnackbar';

const BULKYMETADATA_SHAPE_DOWNLOAD_DIALOG = 'BULKYMETADATA_SHAPE_DOWNLOAD_DIALOG';

class ShapeBulkyMetadata extends PureComponent {
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

  UNSAFE_componentWillReceiveProps({ shapeId, itemId, bulkyMetadataKey }) {
    const { shapeId: prevShapeId, bulkyMetadataKey: prevKey } = this.props;
    if (prevShapeId !== shapeId || prevKey !== bulkyMetadataKey) {
      this.onFetch(itemId, shapeId, bulkyMetadataKey);
      document.title = `VidiCore Admin | Shape | ${shapeId}`;
    }
  }

  onRefresh() {
    const { itemId, shapeId, bulkyMetadataKey } = this.props;
    this.onFetch(itemId, shapeId, bulkyMetadataKey);
  }

  onFetch(itemId, shapeId, bulkyMetadataKey) {
    try {
      BulkyMetadataApi.getShapeBulkyMetadata({ itemId, shapeId, key: bulkyMetadataKey })
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
                to: generatePath('/item/:itemId/shape/:shapeId/bulky-metadata/', {
                  itemId,
                  shapeId,
                }),
              },
              bulkyMetadataKey,
            ]}
            downloadModal={BULKYMETADATA_SHAPE_DOWNLOAD_DIALOG}
          />
        )}
        {TabComponent && <TabComponent />}
        {bulkyMetadataDocument && (
          <BulkyMetadataDisplay bulkyMetadataDocument={bulkyMetadataDocument} />
        )}
        <BulkyMetadataDownloadDialog
          dialogName={BULKYMETADATA_SHAPE_DOWNLOAD_DIALOG}
          itemId={itemId}
          shapeId={shapeId}
          bulkyMetadataKey={bulkyMetadataKey}
        />
      </>
    );
  }
}

export default compose(withRouterProps, withSnackbar)(ShapeBulkyMetadata);
