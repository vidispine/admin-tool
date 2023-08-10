import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import SquareCard from '../ui/SquareCard';
import EssenceVersionListTable from './EssenceVersionListTable';

export default function EssenceVersionListCard({ title, essenceVersionListDocument, ...props }) {
  if (essenceVersionListDocument === undefined) { return null; }
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
        <EssenceVersionListTable
          essenceVersionListDocument={essenceVersionListDocument}
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
