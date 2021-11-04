import React from 'react';
import { item as api } from '@vidispine/vdt-api';
import ItemThumbnailGrid from '../../components/item/ItemThumbnailGrid';

import withSnackbar from '../../hoc/withSnackbar';

class ItemThumbnail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      itemDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ itemId }) {
    const { itemId: prevItemId } = this.props;
    if (prevItemId !== itemId) {
      this.onFetch(itemId);
      document.title = `VidiCore Admin | Item | ${itemId}`;
    }
  }

  onRefresh() {
    const { itemId } = this.props;
    this.onFetch(itemId);
  }

  onFetch(itemId) {
    const baseUrl = localStorage.getItem('vsBaseUrl') || '';
    const queryParams = {
      content: 'thumbnail',
      'noauth-url': true,
      baseURI: `${baseUrl}/APInoauth/`,
    };
    try {
      api.getItem({ itemId, queryParams })
        .then((response) => this.setState({ itemDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Item';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const {
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    const { itemDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={itemDocument}
            codeModal="ItemDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        {itemDocument && (
          <>
            {itemDocument.thumbnails && (
              <ItemThumbnailGrid
                uriListDocument={itemDocument.thumbnails}
              />
            )}
          </>
        )}
      </>
    );
  }
}

export default withSnackbar(ItemThumbnail);
