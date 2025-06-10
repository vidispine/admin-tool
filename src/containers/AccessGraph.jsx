import { PureComponent } from 'react';

import { access as AccessApi } from '@vidispine/vdt-api';

import AccessGraphDisplay from '../components/access/AccessGraphDisplay';
import AccessGraphParams from '../components/access/AccessGraphParams';
import withFormActions from '../hoc/withFormActions';

const ACCESS_GRAPH_FORM = 'ACCESS_GRAPH_FORM';

class AccessGraph extends PureComponent {
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
    const { entityId, entityType } = this.props;
    try {
      AccessApi.getEntityAccessGraphDot({
        entityType,
        entityId,
      })
        .then((response) => this.setState({ graphDot: response.data }))
        .catch(this.onRefreshError);
      AccessApi.getEntityAccessGraph({
        entityType,
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
    const messageContent = 'Error Loading Access Graph';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(ACCESS_GRAPH_FORM);
  }

  onSuccess({ request, data }) {
    const { entityId, entityType } = this.props;
    const urlString = request?.responseURL;
    const url = new URL(urlString);
    const queryParams = Object.fromEntries(url.searchParams);
    this.setState({ graphDot: data });
    AccessApi.getEntityAccessGraph({
      entityType,
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
      entityType,
      entityId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      title,
      useGraphViz = false,
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
        <AccessGraphParams
          entityType={entityType}
          entityId={entityId}
          form={ACCESS_GRAPH_FORM}
          initialValues={{}}
          onSuccess={this.onSuccess}
        />
        <AccessGraphDisplay useGraphViz={useGraphViz} graphDot={graphDot} graphImage={graphImage} />
      </>
    );
  }
}

export default withFormActions(AccessGraph);
