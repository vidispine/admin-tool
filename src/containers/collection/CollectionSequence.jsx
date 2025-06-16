import { PureComponent } from 'react';

import { compose } from 'redux';

import CollectionSequenceParams, {
  COLLECTION_SEQUENCE_PARAMS_FORM,
} from '../../components/collection/CollectionSequenceParams';
import SequenceDisplay from '../../components/sequence/SequenceDisplay';
import withCard from '../../hoc/withCard';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

const SequenceDisplayCard = withCard(SequenceDisplay);

class CollectionSequence extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      sequenceDocument: undefined,
    };
  }

  componentDidMount() {
    const { collectionId } = this.props;
    document.title = `VidiCore Admin | Collection | ${collectionId} | Sequence`;
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ collectionId }) {
    const { collectionId: prevCollectionId } = this.props;
    if (prevCollectionId !== collectionId) {
      this.onRefresh();
      document.title = `VidiCore Admin | Collection | ${collectionId} | Sequence`;
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Collection Sequence';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(COLLECTION_SEQUENCE_PARAMS_FORM);
  }

  render() {
    const {
      collectionId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      title,
    } = this.props;
    const { sequenceDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={sequenceDocument}
            codeModal="SequenceDocument"
            onRefresh={this.onRefresh}
            title={title}
          />
        )}
        {TabComponent && <TabComponent />}
        <CollectionSequenceParams
          collectionId={collectionId}
          onSuccess={(response) => this.setState({ sequenceDocument: response.data })}
        />
        {sequenceDocument && (
          <SequenceDisplayCard
            collectionId={collectionId}
            sequenceDocument={sequenceDocument}
            onSuccess={this.onRefresh}
          />
        )}
      </>
    );
  }
}

export default compose(withFormActions, withUI)(CollectionSequence);
