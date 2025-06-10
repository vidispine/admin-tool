import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import SimpleMetadataEditor from '../ui/SimpleMetadataEditor';
import SquareCard from '../ui/SquareCard';

import { ShapeSection } from './ShapeDisplay';

export default function ShapeCard({ shapeDocument = {}, itemId, shapeId, onRefresh }) {
  if (shapeDocument === undefined) {
    return null;
  }
  const { metadata } = shapeDocument;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">{`Shape - ${shapeId}`}</Typography>}
      />
      <CardContent>
        <ShapeSection value={shapeDocument} />
        <SimpleMetadataEditor
          simpleMetadataDocument={metadata}
          title="Shape Metadata"
          titleProps={{ variant: 'subtitle2' }}
          onSuccess={onRefresh}
          entityType="item"
          entityId={`${itemId}/shape/${shapeId}`}
        />
      </CardContent>
    </SquareCard>
  );
}
