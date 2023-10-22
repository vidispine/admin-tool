import React from 'react';
import { utils as api, item as ItemApi } from '@vidispine/vdt-api';
import ItemPosterGrid from '../../components/item/ItemPosterGrid';
import ItemThumbnailDeleteDialog, {
  DIALOG_NAME as ITEMTHUMBNAILDELETE_DIALOG,
} from '../../components/item/ItemThumbnailDeleteDialog';

import withSnackbar from '../../hoc/withSnackbar';

class ItemPoster extends React.PureComponent {
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
    const baseUrl = api.defaultClient.defaults.baseURL || '';
    const queryParams = {
      content: 'poster',
      'noauth-url': true,
      baseURI: `${baseUrl}/APInoauth/`,
    };
    try {
      ItemApi.getItem({ itemId, queryParams })
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
      title,
    } = this.props;
    const { itemDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={itemDocument}
            codeModal="ItemDocument"
            onRefresh={this.onRefresh}
            title={title}
          />
        )}
        {TabComponent && <TabComponent />}
        {itemDocument && (
          <>
            {itemDocument.posters && (
              <ItemPosterGrid uriListDocument={itemDocument.posters} />
            )}
          </>
        )}
        <ItemThumbnailDeleteDialog
          dialogName={ITEMTHUMBNAILDELETE_DIALOG}
          onSuccess={this.onRefresh}
        />
      </>
    );
  }
}

export default withSnackbar(ItemPoster);
