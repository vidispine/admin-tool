import CardContent from '@material-ui/core/CardContent';

import sortCaseInsensitive from '../../utils/sortCaseInsensitive';
import SquareCard from '../ui/SquareCard';
import UriListTable from '../ui/UriListTable';

export default function JobTypeListCard({ uriListDocument }) {
  const linkTo = (uri) => `/task-definition/jobtype/${uri}/`;
  return (
    <SquareCard>
      <CardContent>
        <UriListTable
          uriListDocument={uriListDocument}
          linkTo={linkTo}
          sort={sortCaseInsensitive}
        />
      </CardContent>
    </SquareCard>
  );
}
