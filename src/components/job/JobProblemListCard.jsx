import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';

import JobProblemTable from './JobProblemTable';

export default function JobProblemListCard({ ...props }) {
  return (
    <SquareCard>
      <CardContent>
        <JobProblemTable {...props} />
      </CardContent>
    </SquareCard>
  );
}
