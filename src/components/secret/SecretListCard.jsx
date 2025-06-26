import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import SecretListTable from './SecretListTable';

function SecretListCard({ title, secretListDocument, ...props }) {
  if (secretListDocument === undefined) {
    return null;
  }
  return (
    <Card>
      {title && (
        <CardHeader
          disableTypography
          title={<Typography variant="subtitle1">{title}</Typography>}
        />
      )}
      <CardContent>
        <SecretListTable secretListDocument={secretListDocument} {...props} />
      </CardContent>
    </Card>
  );
}

export default SecretListCard;
