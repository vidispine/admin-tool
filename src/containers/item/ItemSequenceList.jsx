import { PureComponent } from 'react';

import { sequence as SequenceApi } from '@vidispine/vdt-api';

import ItemSequenceListCard from '../../components/item/ItemSequenceListCard';
import withSnackbar from '../../hoc/withSnackbar';

const ITEM_SEQUENCE_CREATE_DIALOG = 'ITEM_SEQUENCE_CREATE_DIALOG';

class ItemSequenceList extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      sequenceListDocument: undefined,
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
      SequenceApi.listItemSequence({ itemId })
        .then((response) => this.setState({ sequenceListDocument: response.data }))
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
    const { sequenceListDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={sequenceListDocument}
            codeModal="SequenceListDocument"
            helpTo="/ref/item/sequence.html"
            onRefresh={this.onRefresh}
            title={title}
            addAccessControl={null}
            entityId={null}
            removeModal={null}
            createModal={ITEM_SEQUENCE_CREATE_DIALOG}
            createModalTitle="New Sequence"
          />
        )}
        {TabComponent && <TabComponent />}
        {sequenceListDocument && (
          <ItemSequenceListCard sequenceListDocument={sequenceListDocument} itemId={itemId} />
        )}
      </>
    );
  }
}

export default withSnackbar(ItemSequenceList);
