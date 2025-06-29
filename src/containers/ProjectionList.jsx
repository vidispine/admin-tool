import { PureComponent } from 'react';

import { projection as api } from '@vidispine/vdt-api';

import ProjectionCreateIncoming from '../components/projection/ProjectionCreateIncoming';
import ProjectionCreateOutgoing from '../components/projection/ProjectionCreateOutgoing';
import ProjectionListTitle from '../components/projection/ProjectionListTitle';
import UriListCard from '../components/ui/UriListCard';
import withSnackbar from '../hoc/withSnackbar';

const PROJECTION_OUTGOING_CREATE_MODAL = 'PROJECTION_OUTGOING_CREATE_MODAL';
const PROJECTION_INCOMING_CREATE_MODAL = 'PROJECTION_INCOMING_CREATE_MODAL';

class ProjectionList extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      uriListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | Projection';
    this.onRefresh();
  }

  onRefresh() {
    try {
      api
        .listProjection()
        .then((response) => this.setState({ uriListDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Projections';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { uriListDocument } = this.state;
    const { history } = this.props;
    return (
      <>
        <ProjectionListTitle
          title="Projection"
          helpTo="/ref/metadata/projection.html"
          onRefresh={this.onRefresh}
          code={uriListDocument}
          codeModal="URIListDocument"
          createModal={PROJECTION_INCOMING_CREATE_MODAL}
          incomingDialog={PROJECTION_INCOMING_CREATE_MODAL}
          outgoingDialog={PROJECTION_OUTGOING_CREATE_MODAL}
        />

        <UriListCard
          uriListDocument={uriListDocument}
          linkTo={(uri) => `/projection/${uri}/`}
          titleCase
        />
        <ProjectionCreateIncoming
          onSuccess={(response) => history.push(`/projection/${response.projectionId}`)}
          dialogName={PROJECTION_INCOMING_CREATE_MODAL}
        />
        <ProjectionCreateOutgoing
          onSuccess={(response) => history.push(`/projection/${response.projectionId}`)}
          dialogName={PROJECTION_OUTGOING_CREATE_MODAL}
        />
      </>
    );
  }
}

export default withSnackbar(ProjectionList);
