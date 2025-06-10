import { PureComponent } from 'react';

import { collection as api } from '@vidispine/vdt-api';

import MetadataCollectionTable from '../../components/collection/MetadataCollectionTable';
import withCard from '../../hoc/withCard';
import withSnackbar from '../../hoc/withSnackbar';

const MetadataCollectionCard = withCard(MetadataCollectionTable);

class CollectionCollection extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      metadataDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ collectionId }) {
    const { collectionId: prevCollectionId } = this.props;
    if (prevCollectionId !== collectionId) {
      this.onFetch(collectionId);
      document.title = `VidiCore Admin | Collection | ${collectionId}`;
    }
  }

  onRefresh() {
    const { collectionId } = this.props;
    this.onFetch(collectionId);
  }

  onFetch(collectionId) {
    const queryParams = { field: '__collection,__ancestor_collection,__parent_collection' };
    try {
      api
        .getCollectionMetadata({
          collectionId,
          queryParams: Object.entries(queryParams),
        })
        .then((response) => this.setState({ metadataDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Collection';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const {
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      collectionId,
      title,
    } = this.props;
    const { metadataDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={metadataDocument}
            codeModal="MetadataDocument"
            onRefresh={this.onRefresh}
            title={title}
          />
        )}
        {TabComponent && <TabComponent />}
        {metadataDocument && (
          <MetadataCollectionCard
            metadataDocument={metadataDocument}
            onSuccess={this.onRefresh}
            entityType="collection"
            entityId={collectionId}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(CollectionCollection);
