import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRowLink';

export default function JobProblemRow({ jobProblemType }) {
  const [jobId] = jobProblemType.job;
  const to = jobId ? `/job/${jobProblemType.job}/` : undefined;
  return (
    <TableRow to={to} hover>
      <TableCell>{jobProblemType.job}</TableCell>
      <TableCell>{jobProblemType.type}</TableCell>
      <TableCell>{jobProblemType.id}</TableCell>
      <TableCell>{jobProblemType.data ? JSON.stringify(jobProblemType.data) : null}</TableCell>
    </TableRow>
  );
}
