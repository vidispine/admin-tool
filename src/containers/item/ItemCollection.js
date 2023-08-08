import React from 'react';
import { item as api } from '@vidispine/vdt-api';
import ItemCollectionCard from '../../components/item/ItemCollectionCard';

import withSnackbar from '../../hoc/withSnackbar';

class ItemCollection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      metadataListDocument: undefined,
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
    const queryParams = { field: '__collection,__ancestor_collection,__parent_collection' };
    try {
      api.getItemMetadata({
        itemId,
        queryParams: Object.entries(queryParams),
      })
        .then((response) => this.setState({ metadataListDocument: response.data }))
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
    const { metadataListDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={metadataListDocument}
            codeModal="MetadataListDocument"
            onRefresh={this.onRefresh}
            title={title}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        {metadataListDocument && (
          <ItemCollectionCard
            metadataListDocument={metadataListDocument}
            onSuccess={this.onRefresh}
            entityType="item"
            entityId={itemId}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(ItemCollection);
