import { PureComponent } from 'react';

import { compose } from 'redux';

import { metadata as MetadataApi } from '@vidispine/vdt-api';

import MetadataGraphDisplay from '../components/metadata/MetadataGraphDisplay';
import MetadataGraphParams from '../components/metadata/MetadataGraphParams';
import withFormActions from '../hoc/withFormActions';
import withUI from '../hoc/withUI';

const METADATA_GRAPH_FORM = 'METADATA_GRAPH_FORM';

class MetadataGraph extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.state = {
      graphImage: undefined,
      graphDot: undefined,
    };
  }

  componentDidMount() {
    const { entityId, entity } = this.props;
    try {
      MetadataApi.getEntityMetadataGraphDot({
        entity,
        entityId,
      })
        .then((response) => this.setState({ graphDot: response.data }))
        .catch(this.onRefreshError);
      MetadataApi.getEntityMetadataGraph({
        entity,
        entityId,
        responseType: 'blob',
      })
        .then((response) => {
          this.setState({ graphImage: response.data });
        })
        .catch(this.onRefreshError);
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Metadata Graph';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(METADATA_GRAPH_FORM);
  }

  onSuccess({ request, data }) {
    const { entityId, entity } = this.props;
    const urlString = request?.responseURL;
    const url = new URL(urlString);
    const queryParams = Object.fromEntries(url.searchParams);
    this.setState({ graphDot: data });
    MetadataApi.getEntityMetadataGraph({
      entity,
      entityId,
      queryParams,
      responseType: 'blob',
    })
      .then((response) => {
        this.setState({ graphImage: response.data });
      })
      .catch(this.onRefreshError);
  }

  render() {
    const { graphDot, graphImage } = this.state;
    const {
      entity,
      entityId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      title,
      useGraphViz = true,
    } = this.props;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            onRefresh={this.onRefresh}
            code={graphDot}
            codeModal="DOT"
            codeVariant="text"
            title={title}
          />
        )}
        {TabComponent && <TabComponent />}
        <MetadataGraphParams
          entity={entity}
          entityId={entityId}
          form={METADATA_GRAPH_FORM}
          initialValues={{}}
          onSuccess={this.onSuccess}
        />
        <MetadataGraphDisplay
          useGraphViz={useGraphViz}
          graphDot={graphDot}
          graphImage={graphImage}
        />
      </>
    );
  }
}

export default compose(withFormActions, withUI)(MetadataGraph);
