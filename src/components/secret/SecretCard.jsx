import Card from '@material-ui/core/Card';

import SecretTable from './SecretTable';

function SecretCard(props) {
  return (
    <Card>
      <SecretTable {...props} />
    </Card>
  );
}

export default SecretCard;
