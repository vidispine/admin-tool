import TableSortLabel from '@material-ui/core/TableSortLabel';

import Table from '../ui/Table';
import TableActions from '../ui/TableActions';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableFooter from '../ui/TableFooter';
import TableHead from '../ui/TableHead';
import TablePagination from '../ui/TablePagination';
import TableRow from '../ui/TableRow';

import JobRow from './JobRow';

export default function JobListTable({
  jobListDocument,
  count = 0,
  page = 0,
  rowsPerPage = 10,
  onChangePage,
  onChangeRowsPerPage,
  onChangeOrder,
  orderBy,
  orderDirection,
}) {
  const { job: jobList = [] } = jobListDocument;
  const rowsPerPageOptions = [10, 100, 250];
  if (!rowsPerPageOptions.includes(rowsPerPage)) {
    rowsPerPageOptions.push(rowsPerPage);
  }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={orderBy === 'jobId'}
              direction={orderDirection}
              onClick={onChangeOrder('jobId')}
            >
              ID
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === 'user'}
              direction={orderDirection}
              onClick={onChangeOrder('user')}
            >
              User
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === 'startTime'}
              direction={orderDirection}
              onClick={onChangeOrder('startTime')}
            >
              Start
            </TableSortLabel>
          </TableCell>
          <TableCell>End</TableCell>
          <TableCell>Duration</TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === 'status'}
              direction={orderDirection}
              onClick={onChangeOrder('status')}
            >
              Status
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === 'type'}
              direction={orderDirection}
              onClick={onChangeOrder('type')}
            >
              Type
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === 'priority'}
              direction={orderDirection}
              onClick={onChangeOrder('priority')}
            >
              Priority
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {jobList.map((jobDocument) => (
          <JobRow key={jobDocument.jobId} jobDocument={jobDocument} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            ActionsComponent={TableActions}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
}
