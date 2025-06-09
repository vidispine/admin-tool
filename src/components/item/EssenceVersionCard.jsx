import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import SquareCard from '../ui/SquareCard';
import EssenceVersionShapeTable from './EssenceVersionShapeTable';

export default function EssenceVersionCard({ title, essenceVersionDocument, ...props }) {
  if (essenceVersionDocument === undefined) { return null; }
  return (
    <SquareCard>
      {title && (
        <CardHeader
          disableTypography
          title={(
            <Typography variant="subtitle1">{title}</Typography>
          )}
        />
      )}
      <CardContent>
        <EssenceVersionShapeTable
          essenceVersionDocument={essenceVersionDocument}
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
