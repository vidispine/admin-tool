import React from 'react';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';
import JobProblemRow from './JobProblemRow';

export default function JobListTable({
  jobProblemListDocument,
}) {
  const { problem: problemList = [] } = jobProblemListDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Job</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>ID</TableCell>
          <TableCell>Data</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {problemList.map((jobProblemType) => (
          <JobProblemRow
            key={jobProblemType.id}
            jobProblemType={jobProblemType}
          />
        ))}
      </TableBody>
    </Table>
  );
}
