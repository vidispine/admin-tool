import { PureComponent } from 'react';

import { taskdefinition as api } from '@vidispine/vdt-api';
import TaskDefinitionListCard from '../../components/taskdefinition/TaskDefinitionListCard';
import TaskDefinitionDialog from '../../components/taskdefinition/TaskDefinitionDialog';

import withSnackbar from '../../hoc/withSnackbar';

const TASKDEFINITION_DIALOG = 'TASKDEFINITION_DIALOG';

class TaskDefinition extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      taskDefinitionListDocument: undefined,
    };
  }

  componentDidMount() {
    const { taskDefinitionType } = this.props;
    this.onRefresh();
    document.title = `VidiCore Admin | Task Definition | ${taskDefinitionType}`;
  }

  onRefresh() {
    const { openSnackBar, taskDefinitionType } = this.props;
    try {
      api.getTaskDefinitionType({ taskDefinitionType })
        .then((response) => this.setState({ taskDefinitionListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Getting Job Type';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { taskDefinitionType, titleComponent: TitleComponent } = this.props;
    const { taskDefinitionListDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            onRefresh={this.onRefresh}
            taskDefinitionType={taskDefinitionType}
            code={taskDefinitionListDocument}
            codeModal="TaskDefinitionListDocument"
            createModal={TASKDEFINITION_DIALOG}
          />
        )}
        { taskDefinitionListDocument
          && (
          <TaskDefinitionListCard
            onRefresh={this.onRefresh}
            taskDefinitionListDocument={taskDefinitionListDocument}
          />
          )}
        <TaskDefinitionDialog
          dialogName={TASKDEFINITION_DIALOG}
          jobType={taskDefinitionType}
          onSuccess={this.onRefresh}
        />
      </>
    );
  }
}

export default withSnackbar(TaskDefinition);
