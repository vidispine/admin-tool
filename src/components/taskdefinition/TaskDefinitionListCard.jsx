import CardList from '../ui/CardList';

import TaskDefinitionCard from './TaskDefinitionCard';

export default function TaskDefinitionListCard({ classes, taskDefinitionListDocument, ...props }) {
  const { task: taskList = [] } = taskDefinitionListDocument;
  return (
    <CardList>
      {taskList.map((taskDefinitionDocument) => (
        <TaskDefinitionCard
          key={taskDefinitionDocument.id}
          taskDefinitionDocument={taskDefinitionDocument}
          {...props}
        />
      ))}
    </CardList>
  );
}
