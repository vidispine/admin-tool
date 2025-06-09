import { PureComponent } from 'react';
import { bulkymetadata as BulkyMetadataApi } from '@vidispine/vdt-api';

import UriListCard from '../../components/ui/UriListCard';
import withSnackbar from '../../hoc/withSnackbar';

class ItemBulkyMetadataList extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      uriListDocument: undefined,
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
    try {
      BulkyMetadataApi.listItemBulkyMetadata({ itemId })
        .then((response) => this.setState({ uriListDocument: response.data }))
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
      itemId,
    } = this.props;
    const { uriListDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={uriListDocument}
            codeModal="URIListDocument"
            onRefresh={this.onRefresh}
            title={title}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        {uriListDocument && (
          <UriListCard
            uriListDocument={uriListDocument}
            linkTo={(uri) => `/item/${itemId}/bulky-metadata/${uri}/`}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(ItemBulkyMetadataList);
