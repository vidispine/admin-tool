import { Fragment } from 'react';

import Divider from '@material-ui/core/Divider';

import TextGrid from '../ui/TextGrid';

export function TaskGroupType({ group }) {
  return (
    <>
      {group.priority && <TextGrid title="Priority" value={group.priority} />}
      {group.maxConcurrency && <TextGrid title="Max Concurrency" value={group.maxConcurrency} />}
      {group.job && (
        <>
          {group.job.map((job) => (
            <Fragment key={job.type}>
              <Divider />
              <TextGrid title="Job Type" variant="list" value={job.type} />
              <TextGrid title="Job Priority" variant="list" value={job.priority} />
              <TextGrid title="Job User" variant="list" value={job.user} />
              <TextGrid title="Job Group" variant="list" value={job.group} />
            </Fragment>
          ))}
          <Divider />
        </>
      )}
      {group.transcoder && (
        <>
          {group.transcoder.map((transcoder) => (
            <Fragment key={transcoder.id}>
              <Divider />
              <TextGrid title="Transcoder" value={transcoder.id} />
            </Fragment>
          ))}
          <Divider />
        </>
      )}
    </>
  );
}

export default function TaskGroupDisplay({ taskGroupDocument }) {
  return <TaskGroupType group={taskGroupDocument} />;
}
