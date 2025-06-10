import moment from 'moment';

import getJobDataVariant from '../../utils/getJobDataVariant';
import TextGrid from '../ui/TextGrid';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

// eslint-disable-next-line no-unused-vars
function JobTaskProgressTypeUnit({ value = {} }) {
  return (
    <>
      <TextGrid title="percent" value={value.percent} hideNoValue />
      <TextGrid title="bytes" value={value.bytes} hideNoValue />
    </>
  );
}

function JobTaskProgressType({ value = {} }) {
  return (
    <>
      <TextGrid title="Value" value={value.value} hideNoValue />
      <TextGrid title="Total" value={value.total} hideNoValue />
      <TextGrid title="Unit" value={value.unit} hideNoValue />
    </>
  );
}

function JobTaskSubstepType({ value = {} }) {
  return (
    <TextGrid
      title={moment(value.timestamp).format('llll')}
      value={value.description}
      titleStartCase={false}
    />
  );
}

function JobTaskType({ value = {} }) {
  return (
    <>
      <TextGrid title="step" value={value.step} hideNoValue hover />
      <TextGrid title="attempts" value={value.attempts} hideNoValue hover />
      <TextGrid title="status" value={value.status} hideNoValue hover />
      <TextGrid title="timestamp" value={value.timestamp} variant="timestamp" hideNoValue hover />
      <TextGrid title="description" value={value.description} hideNoValue hover />
      <TypeSection component={JobTaskProgressType} value={value.progress} hideNoValue />
      <TypeArray value={value.subStep} component={JobTaskSubstepType} hideNoValue hover dense />
      <TextGrid title="errorMessage" value={value.errorMessage} hideNoValue hover />
      <TextGrid title="totalSubTasks" value={value.totalSubTasks} hideNoValue hover />
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
}

function KeyValueType({ value }) {
  return (
    <TextGrid
      title={value.key}
      value={value.value}
      titleStartCase={false}
      variant={getJobDataVariant(value.key)}
      hideCode
      hover
    />
  );
}

function DataSection({ value = {} }) {
  return (
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
}

function StepType({ value }) {
  return (
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
}

function StepSection({ value = {} }) {
  return <TypeSection value={value.log} dense component={StepType} />;
}

function CurrentStepType({ value }) {
  return (
    <>
      <TextGrid title="description" value={value.description} hideNoValue hover />
      <TextGrid title="number" value={value.number} hideNoValue hover />
      <TextGrid title="status" value={value.status} hideNoValue hover />
    </>
  );
}

function CurrentSection({ value = {} }) {
  return (
    <TypeSection
      title="currentStep"
      value={value.currentStep}
      component={CurrentStepType}
      hideNoValue
      dense
    />
  );
}

function ProblemType({ value }) {
  return (
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
}

function ProblemSection({ value = {} }) {
  return (
    <TypeArray
      title="Problem"
      titleKey="id"
      value={value.problem}
      component={ProblemType}
      hideNoValue
      dense
    />
  );
}

function WaitingType({ value }) {
  return (
    <>
      <TextGrid title="resourceId" value={value.resourceId} hideNoValue hover />
      <TextGrid title="resourceType" value={value.resourceType} hideNoValue hover />
      <TextGrid title="requirement" value={value.requirement} hideNoValue hover />
    </>
  );
}

function BasicSection({ value = {} }) {
  return (
    <>
      <TextGrid title="jobId" value={value.jobId} hover />
      <TextGrid title="user" value={value.user} variant="username" hideNoValue hover />
      <TextGrid title="started" value={value.started} variant="timestamp" hideNoValue hover />
      <TextGrid title="finished" value={value.finished} variant="timestamp" hideNoValue hover />
      <TextGrid title="status" value={value.status} hideNoValue hover />
      <TextGrid title="type" value={value.type} variant="jobtype" hideNoValue hover />
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
}

function JobType({ value = {} }) {
  return (
    <>
      <TypeSection component={BasicSection} value={value} />
      <TypeSection component={CurrentSection} value={value} />
      <TypeSection component={DataSection} value={value} />
      <TypeSection component={StepSection} value={value} />
      <TypeArray title="subJob" value={value.subJob} component={JobType} hideNoValue hover />
    </>
  );
}

export function JobBasicDisplay({ jobDocument }) {
  return <TypeSection component={BasicSection} value={jobDocument} />;
}

export function JobDataDisplay({ jobDocument }) {
  return <TypeSection component={DataSection} value={jobDocument} />;
}

export function JobStepDisplay({ jobDocument }) {
  return <TypeSection component={StepSection} value={jobDocument} />;
}

export function JobCurrentDisplay({ jobDocument }) {
  return <TypeSection component={CurrentSection} value={jobDocument} />;
}

export function JobProblemDisplay({ jobProblemListDocument }) {
  return <TypeSection component={ProblemSection} value={jobProblemListDocument} />;
}

export default function JobDisplay({ jobDocument }) {
  return <TypeSection component={JobType} value={jobDocument} />;
}
