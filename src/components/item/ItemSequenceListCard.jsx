import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import ItemSequenceListTable from './ItemSequenceListTable';

function ItemSequenceListCard({ title, sequenceListDocument, ...props }) {
  if (sequenceListDocument === undefined) {
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
        <ItemSequenceListTable
          sequenceListDocument={sequenceListDocument}
          {...props}
        />
      </CardContent>
    </Card>
  );
}

export default ItemSequenceListCard;
