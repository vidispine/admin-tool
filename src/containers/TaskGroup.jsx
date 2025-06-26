import { PureComponent } from 'react';

import { connect } from 'react-redux';

import { taskgroup as TaskGroupApi } from '@vidispine/vdt-api';

import * as actions from '../actions';
import TaskGroupCard from '../components/taskgroup/TaskGroupCard';
import TaskGroupRemove from '../components/taskgroup/TaskGroupRemove';
import TaskGroupTitle from '../components/taskgroup/TaskGroupTitle';
import CodeModal from '../components/ui/CodeModal';

const TASKGROUP_CODE_MODAL = 'TASKGROUP_CODE_MODAL';
const TASKGROUP_REMOVE_MODAL = 'TASKGROUP_REMOVE_MODAL';

class TaskGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.state = {
      taskGroupDocument: undefined,
    };
  }

  componentDidMount() {
    const { groupName } = this.props;
    document.title = `VidiCore Admin | Task Group | ${groupName}`;
    this.onRefresh();
  }

  async onRefresh() {
    const { openSnackBar, groupName } = this.props;
    try {
      const { data: taskGroupDocument } = await TaskGroupApi.getTaskGroup({ groupName });
      this.setState({ taskGroupDocument });
    } catch (error) {
      const messageContent = 'Error Loading Task Group';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  onRemove({ groupName }) {
    const { openSnackBar, history, closeModal } = this.props;
    try {
      TaskGroupApi.removeTaskGroup({ groupName }).then(() => {
        const messageContent = `Task Group ${groupName} Removed`;
        openSnackBar({ messageContent });
        history.push('/task-group/');
        closeModal();
      });
    } catch (error) {
      const messageContent = 'Error Removing Import Settings';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { modalName, closeModal, openModal, groupName } = this.props;
    const { taskGroupDocument } = this.state;
    return (
      <>
        <TaskGroupTitle
          groupName={groupName}
          openCode={() => openModal({ modalName: TASKGROUP_CODE_MODAL })}
          openRemove={() => openModal({ modalName: TASKGROUP_REMOVE_MODAL })}
          onRefresh={this.onRefresh}
        />
        {taskGroupDocument && (
          <TaskGroupCard
            groupName={groupName}
            taskGroupDocument={taskGroupDocument}
            onRefresh={this.onRefresh}
          />
        )}
        <CodeModal
          isOpen={modalName === TASKGROUP_CODE_MODAL}
          toggleDialogue={closeModal}
          code={taskGroupDocument}
          title="TaskGroupDocument"
        />
        <TaskGroupRemove
          isOpen={modalName === TASKGROUP_REMOVE_MODAL}
          closeModal={closeModal}
          onRemove={this.onRemove}
          groupName={groupName}
        />
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { groupName } = ownProps.match.params;
  const {
    ui: { modalName },
  } = state;
  return {
    groupName,
    modalName,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskGroup);
