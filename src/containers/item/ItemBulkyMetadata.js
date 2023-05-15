import React from 'react';
import { compose } from 'redux';
import { bulkymetadata as BulkyMetadataApi } from '@vidispine/vdt-api';

import withSnackbar from '../../hoc/withSnackbar';
import { withRouterProps } from '../../hoc/withRouterProps';
import BulkyMetadataDisplay from '../../components/bulkymetadata/BulkyMetadataDisplay';
import BulkyMetadataDownloadDialog from '../../components/bulkymetadata/BulkyMetadataDownloadDialog';
import routes from '../../const/routes';

const BULKYMETADATA_DOWNLOAD_DIALOG = 'BULKYMETADATA_DOWNLOAD_DIALOG';

class ItemBulkyMetadata extends React.PureComponent {
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

  UNSAFE_componentWillReceiveProps({ itemId, bulkyMetadataKey }) {
    const { itemId: prevItemId, bulkyMetadataKey: prevKey } = this.props;
    if (prevItemId !== itemId || prevKey !== bulkyMetadataKey) {
      this.onFetch(itemId, bulkyMetadataKey);
      document.title = `VidiCore Admin | Item | ${itemId} | Bulky Metadata`;
    }
  }

  onRefresh() {
    const { itemId, bulkyMetadataKey } = this.props;
    this.onFetch(itemId, bulkyMetadataKey);
  }

  onFetch(itemId, bulkyMetadataKey) {
    try {
      BulkyMetadataApi.getItemBulkyMetadata({ itemId, key: bulkyMetadataKey })
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
    } = this.props;
    const { bulkyMetadataDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={bulkyMetadataDocument}
            codeModal="BulkyMetadataDocument"
            onRefresh={this.onRefresh}
            breadcrumbList={[{ title: 'Bulky Metadata', to: routes.itemBulkyMetadataList({ itemId }) }, { title: bulkyMetadataKey }]}
            downloadModal={BULKYMETADATA_DOWNLOAD_DIALOG}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        { bulkyMetadataDocument && (
          <BulkyMetadataDisplay bulkyMetadataDocument={bulkyMetadataDocument} />
        )}
        <BulkyMetadataDownloadDialog
          dialogName={BULKYMETADATA_DOWNLOAD_DIALOG}
          itemId={itemId}
          bulkyMetadataKey={bulkyMetadataKey}
        />
      </>
    );
  }
}

export default compose(withRouterProps, withSnackbar)(ItemBulkyMetadata);
