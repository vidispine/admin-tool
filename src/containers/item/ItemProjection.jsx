import { PureComponent } from 'react';

import { item as api } from '@vidispine/vdt-api';

import ItemProjectionCard from '../../components/item/ItemProjectionCard';
import withSnackbar from '../../hoc/withSnackbar';

class ItemProjection extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      outgoingProjectionDocument: undefined,
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
    const headers = { accept: 'application/xml' };
    const queryParams = { projection: 'default' };
    try {
      api
        .getItemMetadata({
          itemId,
          headers,
          queryParams,
        })
        .then((response) => this.setState({ outgoingProjectionDocument: response.data }))
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
    const { outgoingProjectionDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={outgoingProjectionDocument}
            codeModal="OutgoingProjectionDocument"
            onRefresh={this.onRefresh}
            title={title}
          />
        )}
        {TabComponent && <TabComponent />}
        {outgoingProjectionDocument && (
          <ItemProjectionCard
            itemId={itemId}
            outgoingProjectionDocument={outgoingProjectionDocument}
            onSuccess={(response) => this.setState({ outgoingProjectionDocument: response.data })}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(ItemProjection);
