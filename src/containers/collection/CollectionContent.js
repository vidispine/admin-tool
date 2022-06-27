import React from 'react';
import { compose } from 'redux';

import { collection as api } from '@vidispine/vdt-api';
import CollectionContentParams from '../../components/collection/CollectionContentParams';
import CollectionContentTable from '../../components/collection/CollectionContentTable';
import CollectionMetadataEditor from '../../components/collection/CollectionMetadataEditor';

import withSnackbar from '../../hoc/withSnackbar';
import withUI from '../../hoc/withUI';
import withCard from '../../hoc/withCard';

const CollectionContentCard = withCard(CollectionContentTable);
const CollectionMetadataCard = withCard(CollectionMetadataEditor);

class CollectionContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      collectionDocument: undefined,
    };
  }

  componentDidMount() {
    const { setOnRefresh } = this.props;
    setOnRefresh(this.onRefresh);
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
    const { setName } = this.props;
    try {
      api.getCollection({ collectionId })
        .then((response) => {
          this.setState({ collectionDocument: response.data });
          if (setName) setName(response?.data?.name);
        })
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
    const { collectionDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={collectionDocument}
            codeModal="CollectionDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        <CollectionContentParams
          collectionId={collectionId}
          onSuccess={(response) => this.setState({ collectionDocument: response.data })}
        />
        {collectionDocument && (
          <>
            <CollectionContentCard
              collectionId={collectionId}
              collectionDocument={collectionDocument}
              onSuccess={this.onRefresh}
            />
            {collectionDocument.metadata && (
              <CollectionMetadataCard
                collectionId={collectionId}
                metadataDocument={collectionDocument.metadata}
                onSuccess={() => this.onRefresh()}
              />
            )}
          </>
        )}

      </>
    );
  }
}

export default compose(withUI, withSnackbar)(CollectionContent);
