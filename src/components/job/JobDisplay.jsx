import moment from 'moment';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';
import getJobDataVariant from '../../utils/getJobDataVariant';

// eslint-disable-next-line no-unused-vars
const JobTaskProgressTypeUnit = ({ value = {} }) => (
  <>
    <TextGrid title="percent" value={value.percent} hideNoValue />
    <TextGrid title="bytes" value={value.bytes} hideNoValue />
  </>
);

const JobTaskProgressType = ({ value = {} }) => (
  <>
    <TextGrid title="Value" value={value.value} hideNoValue />
    <TextGrid title="Total" value={value.total} hideNoValue />
    <TextGrid title="Unit" value={value.unit} hideNoValue />
  </>
);

const JobTaskSubstepType = ({ value = {} }) => (
  <TextGrid
    title={moment(value.timestamp).format('llll')}
    value={value.description}
    titleStartCase={false}
  />
);

const JobTaskType = ({ value = {} }) => (
  <>
    <TextGrid title="step" value={value.step} hideNoValue hover />
    <TextGrid title="attempts" value={value.attempts} hideNoValue hover />
    <TextGrid title="status" value={value.status} hideNoValue hover />
    <TextGrid
      title="timestamp"
      value={value.timestamp}
      variant="timestamp"
      hideNoValue
      hover
    />
    <TextGrid title="description" value={value.description} hideNoValue hover />
    <TypeSection
      component={JobTaskProgressType}
      value={value.progress}
      hideNoValue
    />
    <TypeArray
      value={value.subStep}
      component={JobTaskSubstepType}
      hideNoValue
      hover
      dense
    />
    <TextGrid
      title="errorMessage"
      value={value.errorMessage}
      hideNoValue
      hover
    />
    <TextGrid
      title="totalSubTasks"
      value={value.totalSubTasks}
      hideNoValue
      hover
    />
    <TypeArray
      title="subTask"
      titleKey="step"
      value={
        Array.isArray(value.subTask)
          ? value.subTask.sort((a, b) => b.step - a.step)
          : value.subTask
      }
      component={JobTaskType}
      hideNoValue
      hover
    />
  </>
);

const KeyValueType = ({ value }) => (
  <TextGrid
    title={value.key}
    value={value.value}
    titleStartCase={false}
    variant={getJobDataVariant(value.key)}
    hideCode
    hover
  />
);

const DataSection = ({ value = {} }) => (
  <TypeArray
    arrayTitle="Data"
    value={value.data}
    arrayKey="key"
    component={KeyValueType}
    hideNoValue
    hover
    dense
  />
);

const StepType = ({ value }) => (
  <TypeArray
    title="Step"
    titleKey="step"
    value={Array.isArray(value.task) ? value.task.sort((a, b) => b.step - a.step) : value.task}
    component={JobTaskType}
    hideNoValue
    hover
    dense
  />

);

const StepSection = ({ value = {} }) => (
  <TypeSection value={value.log} dense component={StepType} />
);

const CurrentStepType = ({ value }) => (
  <>
    <TextGrid title="description" value={value.description} hideNoValue hover />
    <TextGrid title="number" value={value.number} hideNoValue hover />
    <TextGrid title="status" value={value.status} hideNoValue hover />
  </>
);

const CurrentSection = ({ value = {} }) => (
  <TypeSection
    title="currentStep"
    value={value.currentStep}
    component={CurrentStepType}
    hideNoValue
    dense
  />
);

const ProblemType = ({ value }) => (
  <>
    <TextGrid title="type" value={value.type} hideNoValue />
    <TextGrid
      title="data"
      value={value.data ? JSON.stringify(value.data) : undefined}
      variant="json"
      hideNoValue
    />
  </>

);

const ProblemSection = ({ value = {} }) => (
  <TypeArray
    title="Problem"
    titleKey="id"
    value={value.problem}
    component={ProblemType}
    hideNoValue
    dense
  />
);

const WaitingType = ({ value }) => (
  <>
    <TextGrid
      title="resourceId"
      value={value.resourceId}
      hideNoValue
      hover
    />
    <TextGrid
      title="resourceType"
      value={value.resourceType}
      hideNoValue
      hover
    />
    <TextGrid
      title="requirement"
      value={value.requirement}
      hideNoValue
      hover
    />
  </>
);

const BasicSection = ({ value = {} }) => (
  <>
    <TextGrid title="jobId" value={value.jobId} hover />
    <TextGrid
      title="user"
      value={value.user}
      variant="username"
      hideNoValue
      hover
    />
    <TextGrid
      title="started"
      value={value.started}
      variant="timestamp"
      hideNoValue
      hover
    />
    <TextGrid
      title="finished"
      value={value.finished}
      variant="timestamp"
      hideNoValue
      hover
    />
    <TextGrid title="status" value={value.status} hideNoValue hover />
    <TextGrid
      title="type"
      value={value.type}
      variant="jobtype"
      hideNoValue
      hover
    />
    <TextGrid title="priority" value={value.priority} hideNoValue hover />
    <TextGrid title="totalSteps" value={value.totalSteps} hideNoValue hover />
    <TypeSection
      title="waiting"
      value={value.waiting}
      component={WaitingType}
      hideNoValue
      dense
    />
  </>
);

const JobType = ({ value = {} }) => (
  <>
    <TypeSection
      component={BasicSection}
      value={value}
    />
    <TypeSection
      component={CurrentSection}
      value={value}
    />
    <TypeSection
      component={DataSection}
      value={value}
    />
    <TypeSection
      component={StepSection}
      value={value}
    />
    <TypeArray
      title="subJob"
      value={value.subJob}
      component={JobType}
      hideNoValue
      hover
    />
  </>
);

export const JobBasicDisplay = ({ jobDocument }) => (
  <>
    <TypeSection
      component={BasicSection}
      value={jobDocument}
    />
  </>
);

export const JobDataDisplay = ({ jobDocument }) => (
  <>
    <TypeSection
      component={DataSection}
      value={jobDocument}
    />
  </>
);

export const JobStepDisplay = ({ jobDocument }) => (
  <>
    <TypeSection
      component={StepSection}
      value={jobDocument}
    />
  </>
);

export const JobCurrentDisplay = ({ jobDocument }) => (
  <>
    <TypeSection
      component={CurrentSection}
      value={jobDocument}
    />
  </>
);

export const JobProblemDisplay = ({ jobProblemListDocument }) => (
  <>
    <TypeSection
      component={ProblemSection}
      value={jobProblemListDocument}
    />
  </>
);

export default function JobDisplay({
  jobDocument,
}) {
  return (
    <>
      <TypeSection
        component={JobType}
        value={jobDocument}
      />
    </>
  );
}
