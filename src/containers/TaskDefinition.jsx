import { PureComponent } from 'react';
import { compose } from 'redux';
import List from '@material-ui/core/List';
import { Route, Switch, generatePath } from 'react-router-dom';

import { withRouterProps } from '../hoc/withRouterProps';

import TaskDefinitionOverview from './taskdefinition/TaskDefinitionOverview';
import TaskDefinitionGraph from './taskdefinition/TaskDefinitionGraph';

import TaskDefinitionTitle from '../components/taskdefinition/TaskDefinitionTitle';
import JobTypeRemove from '../components/jobtype/JobTypeRemove';

import DrawerContainer from '../components/ui/DrawerContainer';
import ListItemLink from '../components/ui/ListItemLink';

const TASKDEFINITION_REMOVE_DIALOG = 'TASKDEFINITION_REMOVE_DIALOG';

const TAB_TITLE = [
  {
    listText: 'Overview',
    component: TaskDefinitionOverview,
    path: '/task-definition/jobtype/:taskDefinitionType/',
    exact: true,
  },
  {
    listText: 'Graph',
    component: TaskDefinitionGraph,
    path: '/task-definition/jobtype/:taskDefinitionType/graph/',
  },

];

const listComponentRoute = ({ taskDefinitionType }) => (
  <List>
    {TAB_TITLE.map(({ path, listText, exact }) => (
      <ListItemLink
        key={path}
        primary={listText}
        to={generatePath(path, { taskDefinitionType })}
        dense
        style={{ paddingLeft: 8 }}
        disableGutters
        exact={exact}
      />
    ))}
  </List>
);

const mainComponentRoute = (props) => (
  <Switch>
    {TAB_TITLE.map(({
      path, component: RenderComponent, listText, exact,
    }) => (
      <Route
        key={path}
        path={path}
        exact={exact}
        render={() => <RenderComponent {...props} title={listText} />}
      />
    ))}
  </Switch>
);

class TaskDefinition extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.setOnRefresh = this.setOnRefresh.bind(this);
    this.state = {
      onRefresh: undefined,
    };
  }

  componentDidMount() {
    const { taskDefinitionType } = this.props;
    document.title = `VidiCore Admin | Task Definition | ${taskDefinitionType}`;
  }

  onRefresh() {
    const { onRefresh } = this.state;
    if (onRefresh) { onRefresh(); }
  }

  setOnRefresh(onRefresh) {
    this.setState({ onRefresh });
  }

  render() {
    const {
      taskDefinitionType,
      history,
    } = this.props;
    const titleComponent = (props) => (
      <TaskDefinitionTitle
        onRefresh={this.onRefresh}
        taskDefinitionType={taskDefinitionType}
        removeModal={TASKDEFINITION_REMOVE_DIALOG}
        {...props}
      />
    );
    return (
      <>
        <DrawerContainer
          taskDefinitionType={taskDefinitionType}
          mainComponent={mainComponentRoute}
          listComponent={listComponentRoute}
          defaultOpen
          titleComponent={titleComponent}
          setOnRefresh={this.setOnRefresh}
        />
        <JobTypeRemove
          dialogName={TASKDEFINITION_REMOVE_DIALOG}
          jobType={taskDefinitionType}
          onSuccess={() => history.push('/jobtype/')}
        />
      </>
    );
  }
}

export default compose(withRouterProps)(TaskDefinition);
