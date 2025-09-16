import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import MetadataFieldAccessControlTable from './MetadataFieldAccessControlTable';

function MetadataFieldAccessControlListCard({
  metadataFieldAccessControlListDocument = {},
  onOpenRemove,
}) {
  const { access: metadataFieldAccessControlList = [] } = metadataFieldAccessControlListDocument;
  return (
    <Card>
      <CardContent>
        <MetadataFieldAccessControlTable
          metadataFieldAccessControlList={metadataFieldAccessControlList}
          onOpenRemove={onOpenRemove}
        />
      </CardContent>
    </Card>
  );
}

export default MetadataFieldAccessControlListCard;
