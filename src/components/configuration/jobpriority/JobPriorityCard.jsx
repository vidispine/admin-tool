import SquareCard from '../../ui/SquareCard';

import JobPriorityEditor from './JobPriorityEditor';

export default function JobPriorityCard(props) {
  return (
    <SquareCard>
      <JobPriorityEditor {...props} />
    </SquareCard>
  );
}
