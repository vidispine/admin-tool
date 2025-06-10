import { PureComponent } from 'react';

import { taskdefinition as api } from '@vidispine/vdt-api';

import GraphViz from '../../components/ui/GraphViz';
import withSnackbar from '../../hoc/withSnackbar';

class TaskDefinitionGraph extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      graphImage: undefined,
      graphDot: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ taskDefinitionType }) {
    const { taskDefinitionType: prevTaskDefinitionType } = this.props;
    if (prevTaskDefinitionType !== taskDefinitionType) {
      this.onFetch(taskDefinitionType);
      document.title = `VidiCore Admin | Task Definition | ${taskDefinitionType} | Graph`;
    }
  }

  onRefresh() {
    const { taskDefinitionType } = this.props;
    this.onFetch(taskDefinitionType);
  }

  onFetch(taskDefinitionType) {
    const { useGraphViz = true } = this.props;
    try {
      if (useGraphViz === true) {
        api
          .getTaskDefinitionType({
            taskDefinitionType,
            path: `/API/task-definition/jobtype/${taskDefinitionType}/graph/dot`,
            headers: { accept: 'text/plain' },
          })
          .then((response) => {
            this.setState({ graphDot: response.data });
          })
          .catch((error) => this.onRefreshError(error));
      } else {
        api
          .getTaskDefinitionType({
            taskDefinitionType,
            path: `/API/task-definition/jobtype/${taskDefinitionType}/graph`,
            headers: { accept: 'image/png' },
            responseType: 'blob',
          })
          .then((response) => {
            this.setState({ graphImage: response.data });
          })
          .catch((error) => this.onRefreshError(error));
      }
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Task Definition';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { titleComponent: TitleComponent, useGraphViz = true } = this.props;
    const { graphImage, graphDot } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            onRefresh={this.onRefresh}
            breadcumbList={['Graph']}
            code={graphDot}
            codeModal="DOT"
            codeVariant="text"
          />
        )}
        {useGraphViz === false && graphImage ? (
          <img alt="graph" src={URL.createObjectURL(graphImage)} style={{ width: '100%' }} />
        ) : null}
        {useGraphViz === true && graphDot ? (
          <GraphViz dot={graphDot} width="100%" height="80vh" />
        ) : null}
      </>
    );
  }
}

export default withSnackbar(TaskDefinitionGraph);
