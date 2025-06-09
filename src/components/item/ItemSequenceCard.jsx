import Card from '@material-ui/core/Card';

import ItemSequenceEditor from './ItemSequenceEditor';

function ItemSequenceCard(props) {
  return (
    <Card>
      <ItemSequenceEditor {...props} />
    </Card>
  );
}

export default ItemSequenceCard;
