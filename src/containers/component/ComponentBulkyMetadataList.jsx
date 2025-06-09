import { PureComponent } from 'react';
import { bulkymetadata as BulkyMetadataApi } from '@vidispine/vdt-api';

import UriListCard from '../../components/ui/UriListCard';
import withSnackbar from '../../hoc/withSnackbar';

class ComponentBulkyMetadataList extends PureComponent {
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

  UNSAFE_componentWillReceiveProps({ componentId, shapeId, itemId }) {
    const { componentId: prevComponentId } = this.props;
    if (prevComponentId !== componentId) {
      this.onFetch(itemId, shapeId, componentId);
      document.title = `VidiCore Admin | Component | ${componentId}`;
    }
  }

  onRefresh() {
    const { itemId, shapeId, componentId } = this.props;
    this.onFetch(itemId, shapeId, componentId);
  }

  onFetch(itemId, shapeId, componentId) {
    try {
      BulkyMetadataApi.listComponentBulkyMetadata({ itemId, shapeId, componentId })
        .then((response) => this.setState({ uriListDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Component';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const {
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      itemId,
      shapeId,
      componentId,
    } = this.props;
    const { uriListDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={uriListDocument}
            codeModal="URIListDocument"
            onRefresh={this.onRefresh}
            breadcrumbList={['Bulky Metadata']}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        {uriListDocument && (
          <UriListCard
            uriListDocument={uriListDocument}
            linkTo={(uri) => `/item/${itemId}/shape/${shapeId}/component/${componentId}/bulky-metadata/${uri}/`}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(ComponentBulkyMetadataList);
