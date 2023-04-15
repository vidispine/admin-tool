import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import UriListTable from '../ui/UriListTable';

export default function NotificationListCard({
  uriListDocument,
  entityType,
  entityId,
}) {
  if (uriListDocument === undefined) { return null; }
  const linkToResource = (uri) => `/notification/${entityType}/${uri.split('/').pop()}/`;
  const linkToEntity = (uri) => `/${entityType}/${entityId}/notification/${uri.split('/').pop()}/`;
  const linkToPlaceholder = (uri) => `/notification/${uri.split('/').pop()}/`;
  let linkTo = linkToPlaceholder;
  if (entityId && entityType) linkTo = linkToEntity;
  else if (entityType) linkTo = linkToResource;
  const textTo = (uri) => uri.split('/').pop();
  return (
    <SquareCard>
      <CardContent>
        <UriListTable
          uriListDocument={uriListDocument}
          linkTo={linkTo}
          textTo={textTo}
        />
      </CardContent>
    </SquareCard>
  );
}
