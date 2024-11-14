import React from 'react';
import { metadata as MetadataApi } from '@vidispine/vdt-api';
import CollectionMetadataChangeSetListCard from '../../components/collection/CollectionMetadataChangeSetListCard';
import CollectionMetadataChangeSetListParams from '../../components/collection/CollectionMetadataChangeSetListParams';
import MetadataChangeSetDelete from '../../components/metadata/MetadataChangeSetDelete';
import MetadataChangeSetTrim from '../../components/metadata/MetadataChangeSetTrim';

import withSnackbar from '../../hoc/withSnackbar';

const COLLECTION_METADATACHANGESET_DELETE_DIALOG = 'COLLECTION_METADATACHANGESET_DELETE_DIALOG';
const COLLECTION_METADATACHANGESET_TRIM_DIALOG = 'COLLECTION_METADATACHANGESET_TRIM_DIALOG';

class CollectionMetadataChangeSetList extends React.PureComponent {
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
      MetadataApi.listEntityMetadataChange({ entity: 'collection', entityId: collectionId })
        .then((response) => this.setState({ metadataChangeSetDocument: response.data }))
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
      collectionId,
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
        {TabComponent && <TabComponent />}
        <CollectionMetadataChangeSetListParams
          collectionId={collectionId}
          onSuccess={(response) => this.setState({ metadataChangeSetDocument: response.data })}
        />
        {metadataChangeSetDocument && (
          <CollectionMetadataChangeSetListCard
            collectionId={collectionId}
            metadataChangeSetDocument={metadataChangeSetDocument}
            MetadataChangeSetMenuProps={{
              removeModal: COLLECTION_METADATACHANGESET_DELETE_DIALOG,
              trimModal: COLLECTION_METADATACHANGESET_TRIM_DIALOG,
            }}
          />
        )}
        <MetadataChangeSetDelete
          dialogName={COLLECTION_METADATACHANGESET_DELETE_DIALOG}
          entity="collection"
          entityId={collectionId}
          onSuccess={this.onRefresh}
        />
        <MetadataChangeSetTrim
          dialogName={COLLECTION_METADATACHANGESET_TRIM_DIALOG}
          entity="collection"
          entityId={collectionId}
          onSuccess={this.onRefresh}
        />
      </>
    );
  }
}

export default withSnackbar(CollectionMetadataChangeSetList);
