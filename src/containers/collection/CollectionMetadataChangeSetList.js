import React from 'react';
import { metadata as MetadataApi } from '@vidispine/vdt-api';
import CollectionMetadataChangeSetListCard from '../../components/collection/CollectionMetadataChangeSetListCard';
import CollectionMetadataChangeSetListParams from '../../components/collection/CollectionMetadataChangeSetListParams';

import withSnackbar from '../../hoc/withSnackbar';

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
    } = this.props;
    const { metadataChangeSetDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={metadataChangeSetDocument}
            codeModal="MetadataChangeSetDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        <CollectionMetadataChangeSetListParams
          collectionId={collectionId}
          onSuccess={(response) => this.setState({ metadataChangeSetDocument: response.data })}
        />
        {metadataChangeSetDocument && (
          <CollectionMetadataChangeSetListCard
            collectionId={collectionId}
            metadataChangeSetDocument={metadataChangeSetDocument}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(CollectionMetadataChangeSetList);
