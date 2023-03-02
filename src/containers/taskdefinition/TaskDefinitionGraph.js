import React from 'react';
import { taskdefinition as api } from '@vidispine/vdt-api';

import withSnackbar from '../../hoc/withSnackbar';

class TaskDefinitionGraph extends React.PureComponent {
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
    try {
      api.getTaskDefinitionType({
        taskDefinitionType,
        path: `/API/task-definition/jobtype/${taskDefinitionType}/graph`,
        headers: { accept: 'image/png' },
        responseType: 'blob',
      })
        .then((response) => {
          this.setState({ graphImage: response.data });
        })
        .catch((error) => this.onRefreshError(error));
      api.getTaskDefinitionType({
        taskDefinitionType,
        path: `/API/task-definition/jobtype/${taskDefinitionType}/graph/dot`,
        headers: { accept: 'text/plain' },
      })
        .then((response) => {
          this.setState({ graphDot: response.data });
        })
        .catch((error) => this.onRefreshError(error));
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
    const {
      titleComponent: TitleComponent,
    } = this.props;
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
        {graphImage && <img alt="graph" src={URL.createObjectURL(graphImage)} style={{ width: '100%' }} />}

      </>
    );
  }
}

export default withSnackbar(TaskDefinitionGraph);
