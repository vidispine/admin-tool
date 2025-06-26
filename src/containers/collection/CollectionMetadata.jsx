import { PureComponent } from 'react';

import { collection as CollectionApi } from '@vidispine/vdt-api';

import CollectionMetadataDisplayParams from '../../components/collection/CollectionMetadataDisplayParams';
import CollectionMetadataEditor from '../../components/collection/CollectionMetadataEditor';
import TimeRepresentation from '../../components/ui/TimeRepresentation';
import withCard from '../../hoc/withCard';
import withSnackbar from '../../hoc/withSnackbar';

const CollectionMetadataCard = withCard(CollectionMetadataEditor);

class CollectionMetadata extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onSubmitTimeRepresentation = this.onSubmitTimeRepresentation.bind(this);
    this.onQuickEdit = this.onQuickEdit.bind(this);
    this.onQuickEditError = this.onQuickEditError.bind(this);
    this.state = {
      metadataDocument: undefined,
      timeRepresentation: undefined,
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
    try {
      CollectionApi.getCollectionMetadata({ collectionId })
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

  onQuickEditError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Updating Collection';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onQuickEdit(metadataDocument) {
    const { collectionId } = this.props;
    try {
      return CollectionApi.updateCollectionMetadata({
        collectionId,
        metadataDocument,
      })
        .then(() => CollectionApi.getCollectionMetadata({ collectionId }))
        .then((response) => this.setState({ metadataDocument: response.data }))
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
      collectionId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      title,
    } = this.props;
    const { metadataDocument, timeRepresentation } = this.state;
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
        <CollectionMetadataDisplayParams
          collectionId={collectionId}
          onSuccess={(response) => this.setState({ metadataDocument: response.data })}
        />
        <TimeRepresentation onSubmit={this.onSubmitTimeRepresentation} />
        {metadataDocument && (
          <CollectionMetadataCard
            collectionId={collectionId}
            metadataDocument={metadataDocument}
            timeRepresentation={timeRepresentation}
            onSuccess={this.onRefresh}
            onQuickEdit={this.onQuickEdit}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(CollectionMetadata);
