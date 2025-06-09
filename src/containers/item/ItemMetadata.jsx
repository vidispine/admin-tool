import { PureComponent } from 'react';
import { item as ItemApi } from '@vidispine/vdt-api';
import ItemMetadataListCard from '../../components/item/ItemMetadataListCard';
import ItemMetadataDisplayParams from '../../components/item/ItemMetadataDisplayParams';
import TimeRepresentation from '../../components/ui/TimeRepresentation';

import withSnackbar from '../../hoc/withSnackbar';

class ItemMetadata extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onSubmitTimeRepresentation = this.onSubmitTimeRepresentation.bind(this);
    this.onQuickEdit = this.onQuickEdit.bind(this);
    this.onQuickEditError = this.onQuickEditError.bind(this);
    this.state = {
      metadataListDocument: undefined,
      timeRepresentation: undefined,
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
      ItemApi.getItemMetadata({ itemId })
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

  onQuickEditError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Updating Item';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onQuickEdit(metadataDocument) {
    const { itemId } = this.props;
    try {
      return ItemApi.updateItemMetadata({
        itemId,
        metadataDocument,
      })
        .then(() => ItemApi.getItemMetadata({ itemId }))
        .then((response) => this.setState({ metadataListDocument: response.data }))
        .catch((error) => {
          this.onQuickEditError(error);
          throw error;
        });
    } catch (error) {
      this.onQuickEditError(error);
      throw error;
    }
  }

  onSubmitTimeRepresentation(timeRepresentation) {
    this.setState({ timeRepresentation });
  }

  render() {
    const {
      itemId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      title,
    } = this.props;
    const { metadataListDocument, timeRepresentation } = this.state;

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
        {TabComponent && <TabComponent />}
        <ItemMetadataDisplayParams
          itemId={itemId}
          onSuccess={(response) => this.setState({ metadataListDocument: response.data })}
        />
        <TimeRepresentation onSubmit={this.onSubmitTimeRepresentation} />
        {metadataListDocument && (
          <ItemMetadataListCard
            itemId={itemId}
            metadataListDocument={metadataListDocument}
            timeRepresentation={timeRepresentation}
            onSuccess={this.onRefresh}
            onQuickEdit={this.onQuickEdit}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(ItemMetadata);
