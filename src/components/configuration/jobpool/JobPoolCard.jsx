import SquareCard from '../../ui/SquareCard';

import JobPoolEditor from './JobPoolEditor';

export default function JobPoolCard(props) {
  return (
    <SquareCard>
      <JobPoolEditor {...props} />
    </SquareCard>
  );
}
