import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

import SquareCard from '../ui/SquareCard';
import MetadataDisplay from './MetadataDisplay';
import MetadataChangeSetMenu from './MetadataChangeSetMenu';

function MetadataChangeSetListCard({
  metadataChangeSetDocument,
  MetadataChangeSetMenuProps,
  ...props
}) {
  const { changeSet: changeSetList } = metadataChangeSetDocument;
  if (changeSetList === undefined || !Array.isArray(changeSetList)) { return null; }
  return changeSetList.map((changeSet) => (
    <SquareCard id={changeSet.id}>
      <CardHeader
        disableTypography
        title={
          <Typography variant="subtitle1">{`Change Set - ${changeSet.id}`}</Typography>
        }
        action={
          MetadataChangeSetMenuProps ? (
            <MetadataChangeSetMenu
              changesetId={changeSet.id}
              {...MetadataChangeSetMenuProps}
            />
          ) : undefined
        }
      />
      <CardContent>
        <MetadataDisplay metadataDocument={changeSet.metadata} {...props} />
      </CardContent>
    </SquareCard>
  ));
}

export default MetadataChangeSetListCard;
