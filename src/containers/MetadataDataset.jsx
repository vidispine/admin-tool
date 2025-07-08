import { PureComponent } from 'react';

import { metadatadataset as api } from '@vidispine/vdt-api';

import MetadataDatasetCard from '../components/metadatadataset/MetadataDatasetCard';
import MetadataDatasetRemove from '../components/metadatadataset/MetadataDatasetRemove';
import MetadataDatasetTitle from '../components/metadatadataset/MetadataDatasetTitle';
import withSnackbar from '../hoc/withSnackbar';

const METADATADATASET_REMOVE_MODAL = 'METADATADATASET_REMOVE_MODAL';

class MetadataDataset extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      body: undefined,
    };
  }

  componentDidMount() {
    const { datasetId } = this.props;
    document.title = `VidiCore Admin | Metadata Dataset | ${datasetId}`;
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ datasetId }) {
    const { datasetId: prevDatasetId } = this.props;
    if (prevDatasetId !== datasetId) {
      this.onFetch(datasetId);
      document.title = `VidiCore Admin | Metadata Dataset | ${datasetId}`;
    }
  }

  onRefresh() {
    const { datasetId } = this.props;
    this.onFetch(datasetId);
  }

  onFetch(datasetId) {
    const { openSnackBar } = this.props;
    try {
      api
        .getMetadataDataset({ datasetId, headers: { accept: 'application/ld+json' } })
        .then((response) => this.setState({ body: response.request.responseText }));
    } catch (error) {
      const messageContent = 'Error Getting Metadata Dataset';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { datasetId } = this.props;
    const { body } = this.state;
    return (
      <>
        <MetadataDatasetTitle
          removeModal={METADATADATASET_REMOVE_MODAL}
          onRefresh={this.onRefresh}
          datasetId={datasetId}
          code={body ? JSON.parse(body) : undefined}
          codeModal="body"
        />
        {body && (
          <MetadataDatasetCard body={body} datasetId={datasetId} onRefresh={this.onRefresh} />
        )}
        <MetadataDatasetRemove dialogName={METADATADATASET_REMOVE_MODAL} datasetId={datasetId} />
      </>
    );
  }
}

export default withSnackbar(MetadataDataset);
