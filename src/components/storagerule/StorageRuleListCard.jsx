import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';

import StorageRuleListTable from './StorageRuleListTable';

function StorageRuleListCard(props) {
  return (
    <SquareCard>
      <CardContent>
        <StorageRuleListTable {...props} />
      </CardContent>
    </SquareCard>
  );
}

export default StorageRuleListCard;
