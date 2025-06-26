import CardContent from '@material-ui/core/CardContent';

import MetadataDisplay from '../metadata/MetadataDisplay';
import SquareCard from '../ui/SquareCard';

export default function ItemMetadataCard({ ...props }) {
  return (
    <SquareCard>
      <CardContent>
        <MetadataDisplay {...props} />
      </CardContent>
    </SquareCard>
  );
}
