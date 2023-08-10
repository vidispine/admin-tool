import React from 'react';
import { metadata as MetadataApi } from '@vidispine/vdt-api';
import ItemMetadataChangeSetListCard from '../../components/item/ItemMetadataChangeSetListCard';
import ItemMetadataChangeSetListParams from '../../components/item/ItemMetadataChangeSetListParams';

import withSnackbar from '../../hoc/withSnackbar';

class ItemMetadataChangeSetList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      metadataChangeSetDocument: undefined,
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
      MetadataApi.listEntityMetadataChange({ entity: 'item', entityId: itemId })
        .then((response) => this.setState({ metadataChangeSetDocument: response.data }))
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
      itemId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      title,
    } = this.props;
    const { metadataChangeSetDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={metadataChangeSetDocument}
            codeModal="MetadataChangeSetDocument"
            onRefresh={this.onRefresh}
            title={title}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        <ItemMetadataChangeSetListParams
          itemId={itemId}
          onSuccess={(response) => this.setState({ metadataChangeSetDocument: response.data })}
        />
        {metadataChangeSetDocument && (
          <ItemMetadataChangeSetListCard
            itemId={itemId}
            metadataChangeSetDocument={metadataChangeSetDocument}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(ItemMetadataChangeSetList);
