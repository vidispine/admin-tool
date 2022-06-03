import React from 'react';
import moment from 'moment';

import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRowLink';
import JobStatus from './JobStatus';

export default function JobListRow({
  jobDocument,
}) {
  let durationHuman;
  const startMoment = moment(jobDocument.started);
  if (jobDocument.finished) {
    const finishedMoment = moment(jobDocument.finished);
    const durationMoment = moment.duration(finishedMoment.diff(startMoment));
    durationHuman = durationMoment.humanize();
  } else if (jobDocument.status === 'STARTED') {
    const nowMoment = moment();
    const durationMoment = moment.duration(nowMoment.diff(startMoment));
    durationHuman = `${parseInt(durationMoment.asMinutes(), 10)} minutes`;
  }
  return (
    <TableRow to={`/job/${jobDocument.jobId}/`} hover>
      <TableCell>{jobDocument.jobId}</TableCell>
      <TableCell>{jobDocument.user}</TableCell>
      <TableCell>
        {jobDocument.started ? moment(jobDocument.started).format('YYYY-MM-DD HH:mm').toString() : ''}
      </TableCell>
      <TableCell>
        {jobDocument.finished ? moment(jobDocument.finished).format('YYYY-MM-DD HH:mm').toString() : ''}
      </TableCell>
      <TableCell>{durationHuman}</TableCell>
      <TableCell><JobStatus jobDocument={jobDocument} /></TableCell>
      <TableCell>{jobDocument.type}</TableCell>
      <TableCell>{jobDocument.priority}</TableCell>
    </TableRow>
  );
}
