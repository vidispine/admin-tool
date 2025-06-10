import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';

import ItemProjection from './ItemProjection';

function ItemProjectionCard(props) {
  return (
    <SquareCard>
      <CardContent>
        <ItemProjection {...props} />
      </CardContent>
    </SquareCard>
  );
}

export default ItemProjectionCard;
