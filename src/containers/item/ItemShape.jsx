import { PureComponent } from 'react';

import { shape as api } from '@vidispine/vdt-api';

import ShapeListParams from '../../components/shape/ShapeListParams';
import UriListCard from '../../components/ui/UriListCard';
import withSnackbar from '../../hoc/withSnackbar';

class ItemShape extends PureComponent {
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
    const { setOnRefresh } = this.props;
    if (setOnRefresh) setOnRefresh(this.onRefresh);
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
    const queryParams = { placeholder: 'all' };
    try {
      api
        .listShape({
          itemId,
          queryParams,
        })
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
      itemId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      title,
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
        {TabComponent && <TabComponent />}
        <ShapeListParams
          itemId={itemId}
          onSuccess={(response) => this.setState({ uriListDocument: response.data })}
        />
        {uriListDocument && (
          <UriListCard
            uriListDocument={uriListDocument}
            linkTo={(uri) => `/item/${itemId}/shape/${uri}/`}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(ItemShape);
